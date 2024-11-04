"use strict";
const { parseMultipartData, sanitizeEntity } = require("strapi-utils");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const verification = require("../../../middlewares/authJwt");

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async findOne(ctx) {
    const { id } = ctx.params;
    const { token } = ctx.request.header;

    let validToken = await verification.renew(token);

    if (validToken.ok) {
      let query = { active: true };
      query._id = { $eq: id };

      // Se realiza la consulta sobre un niño y se poblan los campos necesarios.
      let entity = await strapi
        .query("daycare")
        .model.find(query)
        .populate({
          path: "acuarelausers",
          select: "rols",
          populate: [{ path: "rols", select: "rol" }],
        })
        .populate({
          path: "bilingual_users",
        })
        .populate({
          path: "suscriptions",
          select:
            "suscription_expiration product service createdAt id_paypal cancel",
          populate: [
            { path: "product", select: "name" },
            { path: "service", select: "name price logo id_wp" },
          ],
        });

      if (!entity)
        return ctx.send({
          ok: false,
          status: 404,
          code: 5,
          msg: "Daycare not found.",
        });
      else {
        // Filtrar suscripciones por el servicio deseado
        const { suscriptions } = entity[0];
        // Objeto para mantener registro de la suscripción más reciente para cada servicio
        const latestSubscriptions = {};

        // Filtrar suscripciones para obtener solo la más reciente por servicio
        suscriptions.forEach((subscription) => {
          const serviceId = subscription.service.id;
          if (
            !latestSubscriptions[serviceId] ||
            new Date(subscription.createdAt) >
              new Date(latestSubscriptions[serviceId].createdAt)
          ) {
            latestSubscriptions[serviceId] = subscription;
          }
        });

        // Convertir el objeto de suscripciones más recientes de nuevo a un array
        const filteredSubscriptions = Object.values(latestSubscriptions);
        validToken.msg = "Query completed successfully!";
        entity[0].suscriptions = filteredSubscriptions;
        validToken.response = entity;
        return ctx.send(validToken);
      }
    } else return ctx.send(validToken);
  },
  // Custom endpoint to get daycares with subscriptions and bilingual users
  async findWithSubscriptionsAndBilingualUsers(ctx) {
    try {
      // Query to get all daycares that have at least one subscription and bilingual users
      const daycares = await strapi.query("daycare").find({
        suscriptions: { $not: { $size: 0 } },
      });

      // Return the filtered results
      ctx.send(daycares);
    } catch (err) {
      ctx.throw(500, err);
    }
  },
};

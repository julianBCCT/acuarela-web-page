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
          path: "suscriptions",
          select: "suscription_expiration product service createdAt",
          populate: [
            { path: "product", select: "name" },
            { path: "service", select: "name price logo" },
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
        const { suscriptions } = entity;

        // Crear un objeto para almacenar las suscripciones más recientes por servicio
        const latestSubscriptionsByService = {};

        suscriptions.forEach((subscription) => {
          const { service } = subscription;

          // Si aún no se ha almacenado una suscripción para este servicio o si esta suscripción es más reciente que la almacenada, actualizarla
          if (
            !latestSubscriptionsByService[service.id] ||
            new Date(subscription.createdAt) >
              new Date(latestSubscriptionsByService[service.id].createdAt)
          ) {
            latestSubscriptionsByService[service.id] = subscription;
          }
        });

        // Convertir el objeto de suscripciones más recientes a un arreglo
        const latestSubscriptions = Object.values(latestSubscriptionsByService);
        validToken.msg = "Query completed successfully!";
        entity.suscriptions = latestSubscriptions;
        validToken.response = entity;
        return ctx.send(validToken);
      }
    } else return ctx.send(validToken);
  },
};

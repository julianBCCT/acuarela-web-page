"use strict";
const paypal = require("paypal-rest-sdk");
const verification = require("../../../middlewares/authJwt");
const { sanitizeEntity } = require('strapi-utils');
/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async find(ctx) {
    const { token } = ctx.request.header;
    let validToken = await verification.renew(token);

    if (validToken.ok) {
      console.log(validToken);
      let query = {...ctx.query};
      query.daycare = { $eq: validToken.user.organization.id };
      const { response } = ctx.request.body;
      let entity = await strapi
        .query("movement")
        .model.find(query)
        .populate("payer", ["name", "lastname", "mail", "phone"]);

      if (!entity)
        return ctx.send({
          ok: true,
          status: 200,
          code: 0,
          msg: "movements not found.",
        });
      else {
        response.msg = "Query completed successfully!";
        response.response = entity;
        return ctx.send(response);
      }
    }
  },
  async findByUser(params, populate) {
    return strapi.query('movement').find(params, populate);
  }

};

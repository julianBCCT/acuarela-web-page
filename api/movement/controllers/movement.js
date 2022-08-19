"use strict";
const paypal = require("paypal-rest-sdk");
const verification = require("../../../middlewares/authJwt");
const { sanitizeEntity } = require("strapi-utils");
/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async findByUser(params, populate) {
    return strapi.query("movement").find(params, populate);
  },
};

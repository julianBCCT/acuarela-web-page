"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async createMultipleAsistencias(ctx) {
    const body = ctx.request.body;
    // const entity = await strapi.services.acuarelauser.findOne({ id });
    return body;
  },
};

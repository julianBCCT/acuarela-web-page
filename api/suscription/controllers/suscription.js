'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
    async find(ctx) {
      try {
        let query = {};
        let entity = await strapi
          .query("suscriptions")
          .model.find(query)
          .populate("service")
          .populate("product")
          .populate("bilingual_user")
          .populate("createdAt")
          .populate("daycare");

        if (!entity || entity.length === 0) {
          return ctx.send({
            ok: false,
            status: 404,
            code: 5,
            msg: "Subscriptions not found.",
          });
        } else {
          return ctx.send({
            ok: true,
            status: 200,
            code: 0,
            msg: "Query completed successfully!",
            response: entity,
          });
        }
      } catch (error) {
        console.error("Error in find method:", error);
        return ctx.send({
          ok: false,
          status: 500,
          code: 10,
          msg: "Internal server error.",
        });
      }
    },
  };

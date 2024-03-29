"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async findExpired(ctx) {
    try {
      const currentDate = new Date().toISOString().split("T")[0]; // Obtener la fecha actual en formato ISO
      // Consultar suscripciones vencidas
      const expiredSubscriptions = await strapi.query("suscription").find({
        suscription_expiration: { $lt: currentDate },
      });

      return ctx.send({
        ok: true,
        status: 200,
        code: 0,
        msg: "Expired subscriptions retrieved successfully!",
        response: expiredSubscriptions,
      });
    } catch (error) {
      console.error("Error in findExpired method:", error);
      return ctx.send({
        ok: false,
        status: 500,
        code: 10,
        msg: "Internal server error.",
      });
    }
  },
};

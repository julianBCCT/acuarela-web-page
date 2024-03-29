"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async findExpired(ctx) {
    try {
      var today = new Date();
      var dd = String(today.getDate()).padStart(2, "0");
      var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
      var yyyy = today.getFullYear();

      // Obtiene la fecha actual.
      today = dd + "-" + mm + "-" + yyyy;
      // Consultar suscripciones vencidas
      const expiredSubscriptions = await strapi.query("suscription").find({
        suscription_expiration: { $lt: today },
      });
      console.log(expiredSubscriptions);

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

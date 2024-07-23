"use strict";
const cors = require("cors");
const verification = require("../../../middlewares/authJwt");

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  // Crea un nuevo registro de checkin.
  async create(ctx) {
    const { token } = ctx.request.header;
    const checkin = ctx.request.body;
    if (checkin.token) {
      // Valida el token.
      let validToken = await verification.renew(token);
      let bodyToken = await verification.get_data(checkin.token);

      if (validToken.ok && bodyToken.ok) {
        // Valida que los datos hayan sido ingresados.
        if (!checkin.children)
          return ctx.send({
            ok: false,
            status: 400,
            code: 5,
            msg: "The childs id is required.",
          });
        if (!checkin.asistente)
          return ctx.send({
            ok: false,
            status: 400,
            code: 5,
            msg: "The assistant is required.",
          });
        if (!bodyToken.user.id /*checkin.acudiente*/)
          return ctx.send({
            ok: false,
            status: 400,
            code: 5,
            msg: "The guardian is required.",
          });
        if (!checkin.datetime)
          return ctx.send({
            ok: false,
            status: 400,
            code: 5,
            msg: "The check-in datetime is required.",
          });
        else {
          // Si todos los datos son correctos se crea el registro de ingreso.
          checkin.acudiente = [checkin.acudiente];
          await strapi.services.checkin.create(checkin);

          //En el registro del niño se marca el atributo indaycare como true.
          const indaycare = true;
          await strapi.services.children.update(
            { _id: checkin.children },
            { indaycare }
          );

          return ctx.send({
            ok: true,
            status: 200,
            code: 0,
            msg: "Check-in successful.",
            user: validToken.user,
            acudiente: checkin.acudiente,
          });
        }
      } else
        return ctx.send({
          ok: false,
          status: 400,
          code: 1,
          msg: "token errors",
          validToken,
          bodyToken,
        });
    } else {
      // Si todos los datos son correctos se crea el registro de ingreso.
      await strapi.services.checkin.create(checkin);

      //En el registro del niño se marca el atributo indaycare como true.
      const indaycare = true;
      await strapi.services.children.update(
        { _id: checkin.children },
        { indaycare }
      );

      return ctx.send({
        ok: true,
        status: 200,
        code: 0,
        msg: "Check-in successful.",
        user: validToken.user,
      });
    }
  },

  // Retorna todos los checkin realizados el día actual.
  async find_today(ctx) {
    const { token } = ctx.request.header;

    let validToken = await verification.renew(token);

    if (validToken.ok) {
      var today = new Date();
      var dd = String(today.getDate()).padStart(2, "0");
      var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
      var yyyy = today.getFullYear();

      // Obtiene la fecha actual.
      today = yyyy + "-" + mm + "-" + dd;

      let query = {};
      query.datetime = { $gte: today };

      // Realiza la consulta y pobla los datos.
      let entity = await strapi
        .query("checkin")
        .model.find(query)
        .populate("children", ["name", "id", "photo"])
        .populate("childminder", ["name", "id"])
        .populate("guardian", ["name", "id"]);

      validToken.msg = "Query completed successfully!";
      validToken.response = entity;
      return ctx.send(validToken);
    } else return ctx.send(validToken);
  },
};

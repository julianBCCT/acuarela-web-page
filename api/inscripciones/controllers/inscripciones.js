"use strict";
const { sanitizeEntity } = require("strapi-utils");
/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */
const bcrypt = require("bcryptjs");
const verification = require("../../../middlewares/authJwt");

module.exports = {
  async completeInsc(ctx) {
    const { token } = ctx.request.header;
    const child = ctx.request.body;
    let validToken = await verification.renew(token);
    if (validToken.ok) {
      child.status = true;
      child.attitudes = [];
      const kid = await strapi.services.children.create(child);
      const hashedPassword = await bcrypt.hash("123456", 10);
      if (child.parents_rel) {
        if (child.parents_rel.length > 0) {
          const kidEdited = await strapi.services.children.update(
            { _id: kid.id },
            {
              acuarelausers: child.parents_rel,
            }
          );
          return ctx.send(
            {
              ok: true,
              status: 200,
              code: 1,
              kid: kidEdited,
            },
            200
          );
        }
      } else {
        let parents = [];
        for (const parent of child.parents) {
          parent.password = hashedPassword;
          parent.status = true;
          parent.rols = ["5ff790045d6f2e272cfd7394"];
          parent.children = [kid.id];
          parent.mail = parent.email;
          parent.daycare = child.daycare;
          if (parent.name != "") {
            let entity = await strapi.services.acuarelauser.create(parent);
            parents.push(entity);
          }
        }

        const kidEdited = await strapi.services.children.update(
          { _id: kid.id },
          {
            acuarelausers: parents.map((parent) => parent.id),
          }
        );
        return ctx.send(
          {
            ok: true,
            status: 200,
            code: 1,
            kid: kidEdited,
            parents,
          },
          200
        );
      }
    } else return ctx.send(validToken);
  },
  async completeInscEdit(ctx) {
    const { token } = ctx.request.header;
    const { id } = ctx.params;
    let validToken = await verification.renew(token);
    if (validToken.ok) {
      let entity = await strapi.services.inscripciones.update(
        { id },
        ctx.request.body
      );
      return sanitizeEntity(entity, { model: strapi.models.inscripciones });
    }
  },
  async findByPaymentTime(ctx) {
    const { status, 'payment.time': paymentTime } = ctx.query;

    // Step 1: Fetch all entities with optional `status` filter
    const filters = {};
    if (status) filters.status = status;

    let entities = await strapi.services.inscripciones.find(filters);

    // Step 2: Filter entities manually based on `payment.time`
    if (paymentTime) {
      entities = entities.filter(
        entity => entity.payment && entity.payment.time === paymentTime
      );
    }
    const semanal = entities.filter(entity => entity.payment && entity.payment.time === "Semanal");
    const mensual = entities.filter(entity => entity.payment && entity.payment.time === "Mensual");
    const diario = entities.filter(entity => entity.payment && entity.payment.time === "Diario");

    // Step 3: Sanitize and return the result
    return {
      entities: entities.map(entity => sanitizeEntity(entity, { model: strapi.models.inscripciones })),
      semanal:semanal.map(entity => sanitizeEntity(entity, { model: strapi.models.inscripciones })),
mensual:mensual.map(entity => sanitizeEntity(entity, { model: strapi.models.inscripciones })),
diario:diario.map(entity => sanitizeEntity(entity, { model: strapi.models.inscripciones })),
    };
  },
  
};

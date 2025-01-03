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

    // Step 1: Build filters
    const filters = {};
    if (status) filters.status = status;

    // Step 2: Fetch all entities with relations populated
    let entities = await strapi.services.inscripciones.find(filters);

    // Populate `child` and their `movements` manually
    entities = await Promise.all(
      entities.map(async (entity) => {
        if (entity.child) {
          // Populate child movements
          const childWithMovements = await strapi.services.children.findOne({
            id: entity.child.id,
          });
          entity.child = childWithMovements;
        }
        return entity;
      })
    );

    // Step 3: Filter entities manually based on `payment.time`
    if (paymentTime) {
      entities = entities.filter(
        (entity) => entity.payment && entity.payment.time === paymentTime
      );
    }

    // Categorize by payment time
    const semanal = entities.filter(
      (entity) => entity.child && entity.child.movements &&  entity.payment && entity.payment.time === "Semanal"
    );
    const mensual = entities.filter(
      (entity) => entity.child &&  entity.child.movements && entity.payment && entity.payment.time === "Mensual"
    );
    const diario = entities.filter(
      (entity) => entity.child && entity.child.movements &&  entity.payment && entity.payment.time === "Diario"
    );

    // Step 4: Sanitize and return the result
    return {
      semanal: semanal.map((entity) =>
        entity.child.movements
      ),
      mensual: mensual.map((entity) =>
        entity.child.movements
      ),
      diario: diario.map((entity) =>
        entity.child.movements
      ),
    };
  },
  
};

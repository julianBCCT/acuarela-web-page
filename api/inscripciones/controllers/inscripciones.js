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

    // Step 2: Fetch all inscriptions
    let inscriptions = await strapi.services.inscripciones.find(filters);

    // Step 3: Extract and populate `child.movements` for each inscription
    let movements = [];
    for (const inscription of inscriptions) {
      if (inscription.child) {
        const childWithMovements = await strapi.services.children.findOne({
          id: inscription.child.id,
        });
        if (childWithMovements && childWithMovements.movements) {
          movements = movements.concat(childWithMovements.movements);
        }
      }
    }

    // Optional: Filter by `payment.time` if needed
    if (paymentTime) {
      inscriptions = inscriptions.filter(
        (entity) => entity.payment && entity.payment.time === paymentTime
      );
    }

    // Step 4: Return only the `movements` array
    return {
      movements: movements.map((movement) =>
        sanitizeEntity(movement, { model: strapi.models.movements }) // Replace with your `movements` model
      ),
    };
  },
  
};

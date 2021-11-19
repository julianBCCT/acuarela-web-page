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
      let parents = [];
      for (const parent of child.parents) {
        parent.password = hashedPassword;
        parent.status = true;
        parent.rols = ["5ff790045d6f2e272cfd7394"];
        if (parent.name != "") {
          let entity = await strapi.services.acuarelauser.create(parent);
          console.log("PARENT");
          console.log(entity);
          parents.push(entity);
        }
      }
      let guardians = [];
      for (const guardian of child.guardians) {
        guardian.password = hashedPassword;
        guardian.status = true;
        guardian.rols = ["5ff7900c5d6f2e272cfd7395"];
        if (guardian.name != "") {
          let entity = await strapi.services.acuarelauser.create(guardian);
          console.log("GUARDIAN");
          console.log(entity);
          guardians.push(entity);
        }
      }
      const kidEdited = await strapi.services.children.update(
        { _id: kid.id },
        {
          acuarelausers: [
            parents.map((parent) => parent.id),
            guardians.map((guardian) => guardian.id),
          ],
          guardians: child.guardians,
        }
      );
      return ctx.send({
        ok: true,
        status: 200,
        code: 1,
        kid: kidEdited,
      });
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
};

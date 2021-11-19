"use strict";
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
      child.daycare = validToken.user.organization;
      child.attitudes = [];
      const kid = await strapi.services.children.create(child);
      console.log(kid);
      // const hashedPassword = await bcrypt.hash("123456", 10);
      // let parents = [];
      // for (const parent of child.parents) {
      //   parent.password = hashedPassword;
      //   parent.status = true;
      //   parent.rols = ["5ff790045d6f2e272cfd7394"];
      //   let entity = await strapi.services.acuarelauser.create(parent);
      //   parents.push(entity);
      // }
      // const kidEdited = await strapi.services.children.update(
      //   { _id: kid.id },
      //   { acuarelausers: [parents[0].id, parents[1].id] }
      // );
      return ctx.send({
        ok: true,
        status: 200,
        code: 1,
        kid: kidEdited,
      });
    } else return ctx.send(validToken);
  },
};

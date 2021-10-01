'use strict';
/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */
const bcrypt = require('bcryptjs');
const verification = require('../../../middlewares/authJwt');

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
      const hashedPassword = await bcrypt.hash('123456', 10);
      let parents = [];
      for (const parent of child.parents) {
        parent.password = hashedPassword;
        parent.status = true;
        let entity = await strapi.services.acuarelauser.create(parent);
        parents.push(entity);
      }
      return ctx.send({
        ok: true,
        status: 200,
        code: 1,
        kid,
        parents
      });
      //   let kidfound = await strapi.services.children.findOne({ _id: kid.id });
      //   if(kidfound){
      //     const kidEdited = await strapi.services.children.update({ _id: id }, {parents: [parents[0].id, parents[1].id]});
          
      //   }else{
      //     return ctx.send({
      //       ok: false,
      //       status: 404,
      //       code: 5,
      //       msg: 'Child not found.',
      //     });
      //   }

    } else return ctx.send(validToken);
  },
};

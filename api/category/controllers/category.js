'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async find(ctx) {
    const response = ctx.response;
    ctx.send(response);
    /*
    let validToken = await verification.renew(token);

    if (validToken.ok) {

      let entity = await strapi.query('group').model.find()
        .populate('activities')
        .populate('acuarelauser', ['name', 'lastname', 'photo']);

      if (!entity) return ctx.send({ ok: true, status: 200, code: 0, msg: 'Groups not found.' });
      else {
        validToken.msg = 'Query completed successfully!';
        validToken.response = entity;
        return ctx.send(validToken);
      }
    } else return ctx.send(validToken);
    */
  },
};

'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async find(ctx) {
    const { response } = ctx.request.body;
    //return ctx.send(response);
    console.log(response);
    let entity = await strapi.query('category').model.find();

    if (!entity) return ctx.send({ ok: true, status: 200, code: 0, msg: 'Groups not found.' });
    else {
      response.msg = 'Query completed successfully!';
      response.response = entity;
      return ctx.send(response);
    }
  },
};

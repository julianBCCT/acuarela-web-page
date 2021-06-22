'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  // Añade una reacción a un post, si el usuario ya reacciono previamente, se actualiza la reacción.
  async create(ctx) {
    const { response, post, type, acuarelauser } = ctx.request.body;
    //return ctx.send(response);
    let query = {};
    query.post = { $eq: post };
    query.acuarelauser = { $eq: acuarelauser };
    let entity = await strapi.query('reaction').model.findOne(query);
    console.log(entity);
    if (!entity) {
      await strapi.services.children.create({post, type, acuarelauser});
      return ctx.send({
        ok: true,
        status: 200,
        code: 0,
        msg: 'Reaction Added.',
      });
    }
    else {
      await strapi.services.children.update({ id: entity.id }, { type });
      return ctx.send({
        ok: true,
        status: 200,
        code: 0,
        msg: 'Reaction Updated.',
      });
    }
  },
};

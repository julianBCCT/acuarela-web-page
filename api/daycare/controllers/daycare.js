'use strict';
const { parseMultipartData, sanitizeEntity } = require('strapi-utils');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const verification = require('../../../middlewares/authJwt');

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async find(ctx) {
    const { token } = ctx.request.header;
    let validToken = await verification.renew(token);

    if (validToken.ok) {
      let query = { active: true };
      query._id = { $eq: validToken.user.id };

      let entity = await strapi.query('acuarelauser').model.find(query, ['name', 'lastname', 'photo'])
        .populate({
          path: 'daycare',
          populate: 'daycare'
        });

      if (!entity)
        return ctx.send({
          ok: false,
          status: 404,
          code: 5,
          msg: 'Daycare not found.',
        });
      else {
        validToken.msg = 'Query completed successfully!';
        validToken.response = entity;
        return ctx.send(validToken);
      }
    } else return ctx.send(validToken);
  },
  
  async findOne(ctx) {
    const { id } = ctx.params;
    const { token } = ctx.request.header;

    let validToken = await verification.renew(token);

    if (validToken.ok) {
      let query = { status: true };
      query._id = { $eq: id };

      // Se realiza la consulta sobre un niño y se poblan los campos necesarios.
      let entity = await strapi.query('daycare').model.find(query);
      //.populate('activities');
      
      if (!entity)
        return ctx.send({
          ok: false,
          status: 404,
          code: 5,
          msg: 'Child not found.',
        });
      else {
        validToken.msg = 'Query completed successfully!';
        validToken.response = entity;
        return ctx.send(validToken);
      }
    } else return ctx.send(validToken);
  },
};

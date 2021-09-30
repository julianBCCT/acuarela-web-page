'use strict';
const cors = require('cors');
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
      let entity = await strapi
        .query('inscripciones')
        .model.find();

      if (!entity)
        return ctx.send({
          ok: false,
          status: 404,
          code: 5,
          msg: 'Inscription not found.',
        });
      else {
        validToken.msg = 'Query completed successfully!';
        validToken.response = entity;
        return ctx.send(validToken);
      }
    } else return ctx.send(validToken);
  },
};

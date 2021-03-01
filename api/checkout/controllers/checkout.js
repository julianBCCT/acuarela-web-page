'use strict';
const cors = require('cors');
const verification = require('../../../middlewares/authJwt');

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async create(ctx) {
    const { token } = ctx.request.header;
    const checkout = ctx.request.body;
    
    let validToken = await verification.renew(token);
    
    if (validToken.ok) {
      if (!checkout.children)
        return ctx.send({
          ok: false,
          status: 400,
          code: 5,
          msg: 'The childs id is required.',
        });
      if (!checkout.childminder)
        return ctx.send({
          ok: false,
          status: 400,
          code: 5,
          msg: 'The assistant is required.',
        });
      if (!checkout.guardian)
        return ctx.send({
          ok: false,
          status: 400,
          code: 5,
          msg: 'The guardian is required.',
        });
      if (!checkout.datetime)
        return ctx.send({
          ok: false,
          status: 400,
          code: 5,
          msg: 'The check-in datetime is required.',
        });
      else {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        today = yyyy + '-' + mm + '-' + dd;

        let query = {};
        query.datetime = { $gte: today };
        query.children = { $eq: checkout.children };

        let entity = await strapi
          .query('checkin')
          .model.find(query);

        if (!entity || entity == '')
          return ctx.send({
            ok: false,
            status: 400,
            code: 5,
            msg: 'Something wrong with the check-in.',
          });
        else {
          await strapi.services.checkout.create(checkout);
          return ctx.send({
            ok: true,
            status: 200,
            code: 0,
            msg: 'Check-out successful.',
            user: validToken.user,
          });
        }
      }
    } else return ctx.send(validToken);
  },
  async find_today(ctx) {
    const { token } = ctx.request.header;

    let validToken = await verification.renew(token);

    if (validToken.ok) {
      var today = new Date();
      var dd = String(today.getDate()).padStart(2, '0');
      var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
      var yyyy = today.getFullYear();

      today = yyyy + '-' + mm + '-' + dd;

      let query = {};
      query.datetime = { $gte: today };

      let entity = await strapi
        .query('checkout')
        .model.find(query)
        .populate('children', ['name', 'id', 'photo'])
        .populate('childminder', ['name', 'id'])
        .populate('guardian', ['name', 'id']);
    
      validToken.msg = 'Query completed successfully!';
      validToken.response = entity;
      return ctx.send(validToken);

    } else return ctx.send(validToken);
  }
};

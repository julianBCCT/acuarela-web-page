'use strict';
const { parseMultipartData, sanitizeEntity } = require('strapi-utils');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const verification = require('../../../middlewares/authJwt');
const verifyDate = require('../../../helpers/is_date');

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async find(ctx) {
    const { token } = ctx.request.header;
    let validToken = await verification.renew(token);

    if (validToken.ok) {
      let query = { $or: [{ acuarelauser: { _id: validToken.user.id } }, { acuarelausers_invited: { _id: validToken.user.id } }] };

      let entity = await strapi.query('event').model.find(query)
        .populate('acuarelausers_invited', 'mail')
        .populate('acuarelauser', 'mail')
        .populate('daycare', 'name');

      if (!entity) return ctx.send({ ok: false, status: 404, code: 5, msg: 'Event not found.' });
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
      let query = {};
      query._id = { $eq: id };

      let entity = await strapi.services.event.findOne(query);
      if (!entity) return ctx.send({ ok: false, status: 404, code: 5, msg: 'Event not found.' });
      else {
        validToken.msg = 'Query completed successfully!';
        validToken.response = entity;
        return ctx.send(validToken);
      }
    } else return ctx.send(validToken);
  },
  async create(ctx) {
    const { token } = ctx.request.header;
    const evento = ctx.request.body;

    let validToken = await verification.renew(token);

    if (validToken.ok) {
      if (!evento.title) return ctx.send({ ok: false, status: 400, code: 5, msg: 'The event title is required.' });
      else if (!verifyDate.isDate(evento.start) && !verifyDate.isDate(evento.end)) return ctx.send({ ok: false, status: 400, code: 5, msg: 'Invalid Date!' });
      else {
        evento.acuarelauser = validToken.user.id;
        await strapi.services.event.create(evento);
        return ctx.send({ ok: true, status: 200, code: 0, msg: 'Event Created.', user: validToken.user });
      }
    } else return ctx.send(validToken);
  },
  async update(ctx) {
    const { token } = ctx.request.header;
    const { id } = ctx.params;
    const evento = ctx.request.body;

    let validToken = await verification.renew(token);

    if (validToken.ok) {
      let entity = await strapi.services.event.findOne({ id });
      if (!entity) return ctx.send({ ok: false, status: 404, code: 5, msg: 'Event not found.' });

      if (entity.acuarelauser._id.toString() != validToken.user.id.toString()) return ctx.send({ ok: false, status: 401, code: 5, msg: 'You do not have privileges to perform this action.' });

      else {
        await strapi.services.event.update({ _id: id }, evento);
        return ctx.send({ ok: true, status: 200, code: 0, msg: 'Event Updated.', user: validToken.user });
      }

    } else return ctx.send(validToken);
  },
  async delete(ctx) {
    const { token } = ctx.request.header;
    const { id } = ctx.params;

    let validToken = await verification.renew(token);

    if (validToken.ok) {
      let entity = await strapi.services.event.findOne({ _id: id });
      if (!entity) return ctx.send({ ok: false, status: 404, code: 5, msg: 'Event not found.' });

      if (entity.acuarelauser._id.toString() != validToken.user.id.toString()) return ctx.send({ ok: false, status: 401, code: 5, msg: 'You do not have privileges to perform this action.' });

      else {
        await strapi.services.event.delete({ _id: id });
        return ctx.send({ ok: true, status: 200, code: 0, msg: 'Event Deleted.', user: validToken.user });
      }
    } else return ctx.send(validToken);
  },
  async findFilter(ctx) {
    const { token } = ctx.request.header;
    const { start, end, priority, daycare } = ctx.params;
    let validToken = await verification.renew(token);

    if (validToken.ok) {
      let query = { $or: [{ acuarelauser: { _id: validToken.user.id } }, { acuarelausers_invited: { _id: validToken.user.id } }] };

      if (priority && priority != -1) query.priority = { $eq: priority };

      if ((start && end) && (start != -1 && end != -1)) query.start = { $gte: start, $lte: end };

      if (daycare && daycare != -1) query.daycare = { _id: daycare };

      let entity = await strapi.query('event').model.find(query)
        .populate('acuarelausers_invited', 'mail')
        .populate('acuarelauser', 'mail')
        .populate('daycare', 'name');

      if (!entity) return ctx.send({ ok: false, status: 404, code: 5, msg: 'Event not found.' });
      else {
        validToken.msg = 'Query completed successfully!';
        validToken.response = entity;
        return ctx.send(validToken);
      }
    } else return ctx.send(validToken);
  }
};

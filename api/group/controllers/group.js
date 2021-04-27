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
  },
  async find_child_group(ctx) {
    const { token } = ctx.request.header;
    let validToken = await verification.renew(token);
    if (validToken.ok) {
      let entity = await strapi.query('group').model.find()
        .populate('children', ['name', 'lastname', 'photo'])
        .populate('acuarelauser', ['name', 'lastname', 'photo']);

      if (!entity) return ctx.send({ ok: true, status: 200, code: 0, msg: 'Groups not found.' });
      else {
        validToken.msg = 'Query completed successfully!';
        validToken.response = entity;
        return ctx.send(validToken);
      }
    } else return ctx.send(validToken);
  },
  async find_guardian_group(ctx) {
    const { token } = ctx.request.header;
    let validToken = await verification.renew(token);
    if (validToken.ok) {
      //let entity = await strapi.query('acuarelauser').model.find();
      let entity = await strapi.query('group').model.find()//{}, ['acuarelauser', 'acuarelauser.name']);
        .populate('acuarelauser', ['name', 'lastname', 'photo']);

      if (!entity) return ctx.send({ ok: true, status: 200, code: 0, msg: 'Groups not found.' });
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

      let entity = await strapi.query('group').model.find(query)
        .populate('children', ['name', 'lastname', 'photo'])
        .populate('activities')
        .populate('acuarelauser', ['name', 'lastname', 'photo']);
      if (!entity) return ctx.send({ ok: false, status: 404, code: 5, msg: 'Group not found.' });
      else {
        validToken.msg = 'Query completed successfully!';
        validToken.response = entity;
        return ctx.send(validToken);
      }
    } else return ctx.send(validToken);
  },
  async create(ctx) {
    const { token } = ctx.request.header;
    const group = ctx.request.body;

    let validToken = await verification.renew(token);

    if (validToken.ok) {
      if (!group.name) return ctx.send({ ok: false, status: 400, code: 5, msg: 'The groups name is required.' });
      if (!group.age_range) return ctx.send({ ok: false, status: 400, code: 5, msg: 'The groups age range is required.' });
      if (!group.shift) return ctx.send({ ok: false, status: 400, code: 5, msg: 'The groups shift is required.' });
      if (!group.acuarelauser) return ctx.send({ ok: false, status: 400, code: 5, msg: 'The group guardian is required.' });
      else {
        group.status = true;
        let entity = await strapi.services.group.create(group);
        return ctx.send({ ok: true, status: 200, code: 0, msg: 'Group Created.', user: validToken.user });
      }
    } else return ctx.send(validToken);
  },
  async update(ctx) {
    const { token } = ctx.request.header;
    const { id } = ctx.params;
    const group = ctx.request.body;

    let validToken = await verification.renew(token);

    if (validToken.ok) {
      let entity = await strapi.services.group.findOne({ id });
      if (!entity) return ctx.send({ ok: false, status: 404, code: 5, msg: 'Group not found.' });

      else {
        await strapi.services.group.update({ _id: id }, group);
        return ctx.send({ ok: true, status: 200, code: 0, msg: 'Group Updated.', user: validToken.user });
      }

    } else return ctx.send(validToken);
  },
  async delete(ctx) {
    const { token } = ctx.request.header;
    const { id } = ctx.params;

    let validToken = await verification.renew(token);

    if (validToken.ok) {
      let entity = await strapi.services.group.findOne({ id });
      if (!entity) return ctx.send({ ok: false, status: 404, code: 5, msg: 'Group not found.' });

      else {
        entity.status = false;
        await strapi.services.group.update({ _id: id }, entity);
        return ctx.send({ ok: true, status: 200, code: 0, msg: 'Group Updated.', user: validToken.user });
      }

    } else return ctx.send(validToken);
  },
  async create_activity(ctx) {
    const { token } = ctx.request.header;
    const activity = ctx.request.body;

    let validToken = await verification.renew(token);

    if (validToken.ok) {
      if (!activity.name) return ctx.send({ ok: false, status: 400, code: 5, msg: 'The activity name is required.' });
      if (!activity.rate) return ctx.send({ ok: false, status: 400, code: 5, msg: 'The activity rate is required.' });
      if (!activity.type) return ctx.send({ ok: false, status: 400, code: 5, msg: 'The activity type is required.' });
      if (!activity.groups) return ctx.send({ ok: false, status: 400, code: 5, msg: 'The group is required.' });
      if (!activity.children) return ctx.send({ ok: false, status: 400, code: 5, msg: 'The children are required.' });
      if (!activity.date) return ctx.send({ ok: false, status: 400, code: 5, msg: 'The activity date is required.' });
      else {
        let act = { name: activity.name, date: activity.date, rate: activity.rate, groups: activity.groups, classactivity: activity.type };
        let entity = await strapi.services.activities.create(act);
        for (let i in activity.children) {
          await strapi.services.childrenactivity.create({ rate: activity.children[i].rate, child: [activity.children[i].id], activity: [entity.id] });
        }
        return ctx.send({ ok: true, status: 200, code: 0, msg: 'Activity Added.', user: validToken.user });
      }
    } else return ctx.send(validToken);
  }
};

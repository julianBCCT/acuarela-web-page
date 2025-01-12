"use strict";
const { parseMultipartData, sanitizeEntity } = require("strapi-utils");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const verification = require("../../../middlewares/authJwt");
const verifyDate = require("../../../helpers/is_date");

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  // Trae todos los grupos asi como el asistente encargado y las actividades del grupo
  async find(ctx) {
    const { token } = ctx.request.header;
    let validToken = await verification.renew(token);

    if (validToken.ok) {
      let query = { status: true };
      const { daycareId } = ctx.params;
      if(daycareId){
        query.daycare = { $eq: daycareId };

      }else{
        query.daycare = { $eq: validToken.user.organization };

      }
      let entity = await strapi
        .query("group")
        .model.find(query)
        .populate("activities")
        .populate("acuarelauser", ["name", "lastname", "photo"]);

      if (!entity)
        return ctx.send({
          ok: true,
          status: 200,
          code: 0,
          msg: "Groups not found.",
        });
      else {
        validToken.msg = "Query completed successfully!";
        validToken.response = entity;
        return ctx.send(validToken);
      }
    } else return ctx.send(validToken);
  },
  async findNew(ctx) {
      let query = { status: true };
      const { daycareId } = ctx.params;
        console.log("🚀 ~ findNew ~ ctx.params:", ctx)
        query.daycare = { $eq: daycareId };
      let entity = await strapi
        .query("group")
        .model.find(query)
        .populate("activities")
        .populate("acuarelauser", ["name", "lastname", "photo"]);

      if (!entity)
        return ctx.send({
          ok: true,
          status: 200,
          code: 0,
          msg: "Groups not found.",
        });
      else {
        return ctx.send({response: entity});
      }

  },
  // Trae todos los grupos, el usuario asociado a ellos y los niños del grupo
  async find_child_group(ctx) {
    const { token } = ctx.request.header;
    let validToken = await verification.renew(token);
    if (validToken.ok) {
      let entity = await strapi
        .query("group")
        .model.find()
        .populate("children", ["name", "lastname", "photo", "gender", "status_text"])
        .populate("acuarelauser", ["name", "lastname", "photo"]);

      if (!entity)
        return ctx.send({
          ok: true,
          status: 200,
          code: 0,
          msg: "Groups not found.",
        });
      else {
        validToken.msg = "Query completed successfully!";
        validToken.response = entity;
        return ctx.send(validToken);
      }
    } else return ctx.send(validToken);
  },
  // Trae todos los grupos y el usuario encargado
  async find_guardian_group(ctx) {
    const { token } = ctx.request.header;
    let validToken = await verification.renew(token);
    if (validToken.ok) {
      //let entity = await strapi.query('acuarelauser').model.find();
      let entity = await strapi
        .query("group")
        .model.find() //{}, ['acuarelauser', 'acuarelauser.name']);
        .populate("acuarelauser", ["name", "lastname", "photo"]);

      if (!entity)
        return ctx.send({
          ok: true,
          status: 200,
          code: 0,
          msg: "Groups not found.",
        });
      else {
        validToken.msg = "Query completed successfully!";
        validToken.response = entity;
        return ctx.send(validToken);
      }
    } else return ctx.send(validToken);
  },
  // Trae un grupo en especificio, los niños asociados a el, la activivdades realizadas y el encargador del grupo
  async findOne(ctx) {
    const { id } = ctx.params;
    const { token } = ctx.request.header;

    let validToken = await verification.renew(token);

    if (validToken.ok) {
      let query = {};
      query._id = { $eq: id };

      let entity = await strapi
        .query("group")
        .model.find(query)
        .populate("children", ["name", "lastname", "photo", "gender", "status_text"])
        .populate("activities")
        .populate("acuarelauser", ["name", "lastname", "photo"]);
      if (!entity)
        return ctx.send({
          ok: false,
          status: 404,
          code: 5,
          msg: "Group not found.",
        });
      else {
        validToken.msg = "Query completed successfully!";
        validToken.response = entity;
        return ctx.send(validToken);
      }
    } else return ctx.send(validToken);
  },
  // Permite realizar la creación del grupo
  async create(ctx) {
    const { token } = ctx.request.header;
    const group = ctx.request.body;

    let validToken = await verification.renew(token);

    if (validToken.ok) {
      if (!group.name)
        return ctx.send({
          ok: false,
          status: 400,
          code: 5,
          msg: "The groups name is required.",
        });
      if (!group.age_range)
        return ctx.send({
          ok: false,
          status: 400,
          code: 5,
          msg: "The groups age range is required.",
        });
      if (!group.shift)
        return ctx.send({
          ok: false,
          status: 400,
          code: 5,
          msg: "The groups shift is required.",
        });
      if (!group.acuarelauser)
        return ctx.send({
          ok: false,
          status: 400,
          code: 5,
          msg: "The group guardian is required.",
        });
      else {
        group.status = true;
        group.rates = [
          {
            type: "6088935af169a43504538925",
            name: "Alimentacion",
            rate: 0.0,
            quantity: 0,
          },
          {
            type: "60889371f169a43504538926",
            name: "Siesta",
            rate: 0.0,
            quantity: 0,
          },
          {
            type: "6088937ff169a43504538927",
            name: "Baño",
            rate: 0.0,
            quantity: 0,
          },
          {
            type: "6088939df169a43504538929",
            name: "Health Check",
            rate: 0.0,
            quantity: 0,
          },
          {
            type: "608893aef169a4350453892a",
            name: "Actividades",
            rate: 0.0,
            quantity: 0,
          },
        ];
        group.daycare = validToken.user.organization;
        let entity = await strapi.services.group.create(group);
        return ctx.send({
          ok: true,
          status: 200,
          code: 0,
          msg: "Group Created.",
          user: validToken.user,
          response: entity,
        });
      }
    } else return ctx.send(validToken);
  },
  // Permite actualizar el grupo
  async update(ctx) {
    const { token } = ctx.request.header;
    const { id } = ctx.params;
    const group = ctx.request.body;

    let validToken = await verification.renew(token);

    if (validToken.ok) {
      let entity = await strapi.services.group.findOne({ id });
      if (!entity)
        return ctx.send({
          ok: false,
          status: 404,
          code: 5,
          msg: "Group not found.",
        });
      else {
        await strapi.services.group.update({ _id: id }, group);
        return ctx.send({
          ok: true,
          status: 200,
          code: 0,
          msg: "Group Updated.",
          user: validToken.user,
        });
      }
    } else return ctx.send(validToken);
  },
  // Elimina el grupo
  async delete(ctx) {
    const { token } = ctx.request.header;
    const { id } = ctx.params;

    let validToken = await verification.renew(token);

    if (validToken.ok) {
      let entity = await strapi.services.group.findOne({ id });
      if (!entity)
        return ctx.send({
          ok: false,
          status: 404,
          code: 5,
          msg: "Group not found.",
        });
      else {
        entity.status = false;
        await strapi.services.group.delete({ _id: id }, entity);
        return ctx.send({
          ok: true,
          status: 200,
          code: 0,
          msg: "Group Deleted.",
          user: validToken.user,
        });
      }
    } else return ctx.send(validToken);
  },
  // Crea una nueva actividad, la asocia al grupo en el que fue realizada y a los niños que participaron y las califciaciones que estos recibieron
  async create_activity(ctx) {
    const { token } = ctx.request.header;
    const activity = ctx.request.body;

    let validToken = await verification.renew(token);

    if (validToken.ok) {
      if (!activity.name)
        return ctx.send({
          ok: false,
          status: 400,
          code: 5,
          msg: "The activity name is required.",
        });
      if (!activity.rate)
        return ctx.send({
          ok: false,
          status: 400,
          code: 5,
          msg: "The activity rate is required.",
        });
      if (!activity.type)
        return ctx.send({
          ok: false,
          status: 400,
          code: 5,
          msg: "The activity type is required.",
        });
      if (!activity.groups)
        return ctx.send({
          ok: false,
          status: 400,
          code: 5,
          msg: "The group is required.",
        });
      if (!activity.children)
        return ctx.send({
          ok: false,
          status: 400,
          code: 5,
          msg: "The children are required.",
        });
      if (!activity.date)
        return ctx.send({
          ok: false,
          status: 400,
          code: 5,
          msg: "The activity date is required.",
        });
      else {
        let act = {
          name: activity.name,
          date: activity.date,
          rate: activity.rate,
          groups: activity.groups,
          classactivity: activity.type,
          infoadicional: activity.infoadicional,
          comments: activity.comments,
        };
        let entity = await strapi.services.activities.create(act);
        for (let i in activity.children) {
          await strapi.services.childrenactivity.create({
            rate: activity.children[i].rate,
            child: [activity.children[i].id],
            activity: [entity.id],
          });
        }

        let query = {};
        query._id = { $eq: String(activity.groups[0]) };

        let group = (await strapi.query("group").model.find(query))[0];

        for (let i in group.rates) {
          if (group.rates[i].type == activity.type) {
            group.rates[i].rate =
              (group.rates[i].rate * group.rates[i].quantity + activity.rate) /
              (group.rates[i].quantity + 1);
            group.rates[i].quantity = group.rates[i].quantity + 1;
            await strapi.services.group.update(
              { _id: group.id },
              { rates: group.rates }
            );
            break;
          }
        }

        return ctx.send({
          ok: true,
          status: 200,
          code: 0,
          msg: "Activity Added.",
          user: validToken.user,
        });
      }
    } else return ctx.send(validToken);
  },
};

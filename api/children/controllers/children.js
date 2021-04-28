'use strict';
const { parseMultipartData, sanitizeEntity } = require('strapi-utils');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const verification = require('../../../middlewares/authJwt');
const verifyDate = require('../../../helpers/is_date');
const email = require('../../../helpers/email_provider');
const sms = require('../../../helpers/sms_provider');

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  // Retorna todos los niños activos del daycare
  async find(ctx) {
    const { token } = ctx.request.header;
    let validToken = await verification.renew(token);

    if (validToken.ok) {
      let query = { status: true };

      let entity = await strapi.query('children').model.find(query, ['name', 'lastname', 'photo', 'indaycare', 'birthdate'])
        .populate({
          path: 'relationships',
          populate: {
            path: 'acuarelauser',
            select: ['name', 'lastname', 'mail', 'phone', 'photo'],
          },
        });

      if (!entity)
        return ctx.send({
          ok: false,
          status: 404,
          code: 5,
          msg: 'Children not found.',
        });
      else {
        validToken.msg = 'Query completed successfully!';
        validToken.response = entity;
        return ctx.send(validToken);
      }
    } else return ctx.send(validToken);
  },
  // Hace un pre-registro del usuario y envia un correo/email con la información necesaria para completar el registro.
  async invitation(ctx) {
    let { id } = ctx.params;
    let { mail, phone, roles, organization, relation } = ctx.request.body;
    let { token } = ctx.request.header;

    let respuesta = await verification.renew(token);

    // Verifica que el Token sea valido.
    if (respuesta.ok) {
      // Busca la entidad con el email o con el número de telefono según lo que el usuario haya ingresado.
      let entity;
      if (mail != '-1')
        entity = await strapi.services.acuarelauser.findOne({ mail });
      else entity = await strapi.services.acuarelauser.findOne({ phone });

      // Si no existe un usuario con el email/número ingresado, procede a realizar el registro, si existe, notifica la existencia de la entidad.
      if (!entity) {
        // Si no hay un rol asignado por defecto se le asigna el rol de bilingual.
        let rols;
        if (roles) rols = roles;
        else rols = ['5ff7900c5d6f2e272cfd7395'];

        // Se encarga de asignar la organización a la que está afiliado el usuario, sino se envia ninguna, se asigna a bilingual.
        let daycare;
        if (organization) {
          let foundDaycare = await strapi.services.daycare.findOne({
            _id: organization,
          });

          if (!foundDaycare)
            return ctx.send({
              ok: false,
              status: 404,
              code: 5,
              msg: 'Daycare not found.',
            });

          daycare = foundDaycare._id;
        } else {
          let foundDaycare = await strapi.services.daycare.findOne({
            name: 'Bilingual',
          });
          daycare = foundDaycare._id;
        }

        // Hace la creación del usuario ya sea por el email o por el número de telefono.
        if (mail == '-1')
          entity = await strapi.services.acuarelauser.create({
            phone,
            rols,
            daycare,
            status: false,
          });
        else
          entity = await strapi.services.acuarelauser.create({
            mail,
            rols,
            daycare,
            status: false,
          });

        await strapi.services.relationship.create({
          relation,
          acuarelauser: [entity._id],
          child: [id],
        });

        // Genera un Token para asociarlo a una URI que se le enviará al usuario para completar el registro.
        let redirect_token = await verification.new_token({ mail, phone });
        let link = 'example.com/get/invitation/' + redirect_token.token;
        let resultado;

        // Envia un mensaje de texto o un correo electronico según lo que el usuario haya seleccionado para crear la cuenta.
        if (mail == '-1') resultado = await sms.send_sms(link, phone); //message, to, sender_id, callback_url
        else
          resultado = await email.send_email(
            'kelvin@bilingualchildcaretraining.com',
            mail,
            'kelvin@bilingualchildcaretraining.com',
            link,
            'Acuarela Invitation'
          );

        resultado.senduri = redirect_token.token;
        return ctx.send(resultado);
      } else {
        await strapi.services.relationship.create({
          relation,
          acuarelauser: [entity._id],
          child: [id],
        });
        return ctx.send({
          ok: true,
          status: 200,
          code: 0,
          msg: 'Child added.',
        });
      }
    } else {
      return ctx.send({ respuesta });
    }
  },
  // Datos la información relacionada de un niño en específico.
  async findOne(ctx) {
    const { id } = ctx.params;
    const { token } = ctx.request.header;

    let validToken = await verification.renew(token);

    if (validToken.ok) {
      let query = { status: true };
      query._id = { $eq: id };

      // Se realiza la consulta sobre un niño y se poblan los campos necesarios.
      let entity = await strapi.query('children')
        .model.find(query)
        .populate({ path: 'relationships', populate: { path: 'acuarelauser', select: ['name', 'lastname', 'mail', 'phone', 'photo'] } })
        .populate({ path: 'group', populate: { path: 'acuarelauser', select: ['name', 'lastname', 'mail', 'phone', 'photo'] } })
        .populate('attitudes', ['name', 'icon'])
        .populate('likings', ['name', 'icon'])
        .populate('others', ['name', 'icon'])
        .populate('for_workings', ['name', 'icon', 'date'])
        .populate('notes', ['name', 'description'])
        .populate('bags', ['name'])
        .populate('records', ['name', 'icon', 'file'])
        .populate('healthinfo')
        .populate('movements')
        .populate({ path: 'childrenactivities', populate: { path: 'activity', select: ['name', 'date', 'rate', 'classactivity'] } });
      
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
  // Retorna los familiares de un niño en especifico.
  async find_parents(ctx) {
    const { id } = ctx.params;
    const { token } = ctx.request.header;

    let validToken = await verification.renew(token);

    if (validToken.ok) {
      let query = {};
      query.child = { $eq: id };

      let entity = await strapi
        .query('relationship')
        .model.find(query)
        .populate('acuarelauser', ['name', 'photo']);
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
  // Crea un nuevo niño.
  async create(ctx) {
    const { token } = ctx.request.header;
    const child = ctx.request.body;

    // Revisa que el token sea valido
    let validToken = await verification.renew(token);

    // Valida los campos ingresados.
    if (validToken.ok) {
      if (!child.name)
        return ctx.send({
          ok: false,
          status: 400,
          code: 5,
          msg: 'The childs name is required.',
        });
      if (!child.lastname)
        return ctx.send({
          ok: false,
          status: 400,
          code: 5,
          msg: 'The childs lastname is required.',
        });
      if (!child.birthdate)
        return ctx.send({
          ok: false,
          status: 400,
          code: 5,
          msg: 'The childs birthdate is required.',
        });
      else {
        child.status = true;
        child.attitudes = [];
        await strapi.services.children.create(child);
        return ctx.send({
          ok: true,
          status: 200,
          code: 0,
          msg: 'Child Created.',
          user: validToken.user,
        });
      }
    } else return ctx.send(validToken);
  },
  // Actualiza un niño.
  async update(ctx) {
    const { token } = ctx.request.header;
    const { id } = ctx.params;
    const child = ctx.request.body;

    let validToken = await verification.renew(token);

    if (validToken.ok) {
      let entity = await strapi.services.children.findOne({ _id: id });
      if (!entity)
        return ctx.send({
          ok: false,
          status: 404,
          code: 5,
          msg: 'Child not found.',
        });

      /*
      if ('5ff78feb5d6f2e272cfd7393' != validToken.user.id.toString())
        return ctx.send({
          ok: false,
          status: 401,
          code: 5,
          msg: 'You do not have privileges to perform this action.',
        });
        */
      else {
        await strapi.services.children.update({ _id: id }, child);
        return ctx.send({
          ok: true,
          status: 200,
          code: 0,
          msg: 'Child Updated.',
          user: validToken.user,
        });
      }

    } else return ctx.send(validToken);
  },
  // Elimina un niño -> cambia su estado a inactivo.
  async delete(ctx) {
    const { token } = ctx.request.header;
    const { id } = ctx.params;

    let validToken = await verification.renew(token);

    if (validToken.ok) {
      let entity = await strapi.services.children.findOne({ _id: id });
      if (!entity)
        return ctx.send({
          ok: false,
          status: 404,
          code: 5,
          msg: 'Child not found.',
        });
      
      /*
      if ('5ff78feb5d6f2e272cfd7393' != validToken.user.id.toString())
        return ctx.send({
          ok: false,
          status: 401,
          code: 5,
          msg: 'You do not have privileges to perform this action.',
        });
        */
      else {
        entity.status = false;
        await strapi.services.children.update({ _id: id }, entity);
        return ctx.send({
          ok: true,
          status: 200,
          code: 0,
          msg: 'Child Deleted.',
          user: validToken.user,
        });
      }
    } else return ctx.send(validToken);
  },
  async update_attitude(ctx) {
    const { token } = ctx.request.header;
    const { id } = ctx.params;
    const attitudes = ctx.request.body;

    let validToken = await verification.renew(token);

    if (validToken.ok) {
      let entity = await strapi.services.children.findOne({ _id: id });
      if (!entity)
        return ctx.send({
          ok: false,
          status: 404,
          code: 5,
          msg: 'Child not found.',
        });
      else {
        await strapi.services.children.update({ _id: id }, attitudes);
        return ctx.send({
          ok: true,
          status: 200,
          code: 0,
          msg: 'Child Updated.',
          user: validToken.user,
        });
      }
    } else return ctx.send(validToken);
  },
  async update_other(ctx) {
    const { token } = ctx.request.header;
    const { id } = ctx.params;
    const others = ctx.request.body;

    let validToken = await verification.renew(token);

    if (validToken.ok) {
      let entity = await strapi.services.children.findOne({ _id: id });
      if (!entity)
        return ctx.send({
          ok: false,
          status: 404,
          code: 5,
          msg: 'Child not found.',
        });
      else {
        //entity.others = others
        await strapi.services.children.update({ _id: id }, others);
        return ctx.send({
          ok: true,
          status: 200,
          code: 0,
          msg: 'Child Updated.',
          user: validToken.user,
        });
      }

    } else return ctx.send(validToken);
  },
  async update_liking(ctx) {
    const { token } = ctx.request.header;
    const { id } = ctx.params;
    const likings = ctx.request.body;

    let validToken = await verification.renew(token);

    if (validToken.ok) {
      let entity = await strapi.services.children.findOne({ _id: id });
      if (!entity)
        return ctx.send({
          ok: false,
          status: 404,
          code: 5,
          msg: 'Child not found.',
        });
      else {
        await strapi.services.children.update({ _id: id }, likings);
        return ctx.send({
          ok: true,
          status: 200,
          code: 0,
          msg: 'Child Updated.',
          user: validToken.user,
        });
      }

    } else return ctx.send(validToken);
  },
  async update_for_working(ctx) {
    const { token } = ctx.request.header;
    const { id } = ctx.params;
    const for_workings = ctx.request.body;

    let validToken = await verification.renew(token);

    if (validToken.ok) {
      let entity = await strapi.services.children.findOne({ _id: id });
      if (!entity)
        return ctx.send({
          ok: false,
          status: 404,
          code: 5,
          msg: 'Child not found.',
        });
      else {
        await strapi.services.children.update({ _id: id }, for_workings);
        return ctx.send({
          ok: true,
          status: 200,
          code: 0,
          msg: 'Child Updated.',
          user: validToken.user,
        });
      }
    } else return ctx.send(validToken);
  },
  async update_note(ctx) {
    const { token } = ctx.request.header;
    const { id } = ctx.params;
    const notes = ctx.request.body;

    let validToken = await verification.renew(token);

    if (validToken.ok) {
      let entity = await strapi.services.children.findOne({ _id: id });
      if (!entity)
        return ctx.send({
          ok: false,
          status: 404,
          code: 5,
          msg: 'Child not found.',
        });
      else {
        await strapi.services.children.update({ _id: id }, notes);
        return ctx.send({
          ok: true,
          status: 200,
          code: 0,
          msg: 'Child Updated.',
          user: validToken.user,
        });
      }
    } else return ctx.send(validToken);
  },
  async update_records(ctx) {
    const { token } = ctx.request.header;
    const { id } = ctx.params;
    const records = ctx.request.body;

    let validToken = await verification.renew(token);

    if (validToken.ok) {
      let entity = await strapi.services.children.findOne({ _id: id });
      if (!entity)
        return ctx.send({
          ok: false,
          status: 404,
          code: 5,
          msg: 'Child not found.',
        });
      else {
        await strapi.services.children.update({ _id: id }, records);
        return ctx.send({
          ok: true,
          status: 200,
          code: 0,
          msg: 'Child Updated.',
          user: validToken.user,
        });
      }

    } else return ctx.send(validToken);
  },
  async update_bags(ctx) {
    const { token } = ctx.request.header;
    const { id } = ctx.params;
    const {bag_item} = ctx.request.body;

    let validToken = await verification.renew(token);

    if (validToken.ok) {
      let entity = await strapi.services.children.findOne({ _id: id });
      if (!entity)
        return ctx.send({
          ok: false,
          status: 404,
          code: 5,
          msg: 'Child not found.',
        });
      else {
        await strapi.services.children.update({ _id: id }, bag_item);
        return ctx.send({
          ok: true,
          status: 200,
          code: 0,
          msg: 'Child Updated.',
          user: validToken.user,
        });
      }

    } else return ctx.send(validToken);
  },
  async update_health_information(ctx) {
    const { token } = ctx.request.header;
    const { id } = ctx.params;
    const health = ctx.request.body;

    let validToken = await verification.renew(token);

    if (validToken.ok) {
      let entity = await strapi.services.children.findOne({ _id: id });
      if (!entity)
        return ctx.send({
          ok: false,
          status: 404,
          code: 5,
          msg: 'Child not found.',
        });
      else {
        health.child = id;
        await strapi.services.healthinfo.create(health);
        return ctx.send({
          ok: true,
          status: 200,
          code: 0,
          msg: 'Child Updated.',
          user: validToken.user,
        });
      }

    } else return ctx.send(validToken);
  },
};

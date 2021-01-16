'use strict';
const { parseMultipartData, sanitizeEntity } = require('strapi-utils');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const verification = require('../../../middlewares/authJwt');
const email = require('../../../helpers/email_provider');
const sms = require('../../../helpers/sms_provider');

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async login(ctx) {
    const { mail, pass, phone } = ctx.request.body;
    let entity;
    if (mail != '-1') entity = await strapi.services.acuarelauser.findOne({ mail });
    else entity = await strapi.services.acuarelauser.findOne({ phone });

    if (entity) {
      let result = await bcrypt.compare(pass, entity.password);
      if (result) return ctx.send(await verification.generate_token(entity));
      else {
        let msg = 'Invalid Number.';
        let code = 'p-1';
        if (mail != '-1') msg = 'Invalid Email.', code = 'e-1';
        return ctx.send({ ok: false, status: 400, code, msg });
      }
    } else {
      let msg = 'Invalid Number.';
      let code = 'p-1';
      if (mail != '-1') msg = 'Invalid Email.', code = 'e-1';
      return ctx.send({ ok: false, status: 400, code, msg });
    }
  },
  async invitation(ctx) {
    const { mail, phone, roles, organization, token } = ctx.request.body;

    let respuesta = await verification.renew(token);

    if (respuesta.ok) {
      let entity;
      if (mail != '-1') entity = await strapi.services.acuarelauser.findOne({ mail });
      else entity = await strapi.services.acuarelauser.findOne({ phone });
      
      if (!entity) {
        let rols;
        if (roles) {
          //const foundRoles = await strapi.services.rols.find({ _id: { $in: roles } });
          rols = roles;
        }
        else {
          //const role = await strapi.services.rols.findOne({ _id: "5ff790215d6f2e272cfd7396" });
          rols = ['5ff790215d6f2e272cfd7396'];
        }

        let daycare;
        if (organization) {
          const foundDaycare = await strapi.services.daycare.findOne({ name: organization });
          daycare = foundDaycare._id;
        }
        else {
          const foundDaycare = await strapi.services.daycare.findOne({ _id: 'Bilingual' });
          daycare = [foundDaycare._id];
        }

        entity = await strapi.services.acuarelauser.create({ mail, phone, rols, daycare });

        let redirect_token = await verification.new_token({ mail, phone });
        let link = '/get/invitation/' + redirect_token.token;
        let resultado;
        if (mail != '-1') resultado = await sms.send_sms(phone, link);
        else resultado = await email.send_email(mail, link, 'Acuarela Invitation');

        resultado.senduri = redirect_token.token;
        return ctx.send(resultado);

      } else {
        let msg = 'User with this number already exits.';
        let code = 'p-2';
        if (mail != '-1') msg = 'User with this email already exits.', code = 'e-2';
        return ctx.send({ ok: false, status: 400, code, msg });
      }
    } else {
      return ctx.send({ respuesta });
    }
  },
  async invitation_register(ctx) {
    const { mail, pass, phone, name, token } = ctx.request.body;

    const { ok, status, code, user } = await verification.get_data(token);

    if (!ok || (mail != user.mail && phone != user.phone)) {
      return ctx.send({ ok, status, code, msg: 'Invalid Invitation' });
    } else {
      const hashedPassword = await bcrypt.hash(pass, 10);
      let entity = await strapi.services.acuarelauser.findOne({ _id: user.id });
      entity.name = name;
      entity.password = hashedPassword;
      entity = await strapi.services.acuarelauser.update({ _id: entity.id }, entity);
      let respuesta = await verification.generate_token(entity);
      if (respuesta.ok) respuesta.status = 201, respuesta.msg = 'User Created.';

      return ctx.send(respuesta);
    }
  },
  async recover_pass(ctx) {
    const { mail, phone } = ctx.request.body;
    let entity;
    if (mail != '-1') entity = await strapi.services.acuarelauser.findOne({ mail });
    else entity = await strapi.services.acuarelauser.findOne({ phone });
    
    if (entity) {
      let code = await Math.round(Math.random() * (9999 - 1000) + 1000);
      let hashedcode = await bcrypt.hash('c' + code, 10);
      let code_token = await verification.new_token({ hashedcode });
      let resultado;
      if (mail != '-1') resultado = email.send_email(phone, code);
      else resultado = sms.send_sms(mail, code, 'Verification Code');

      if (resultado.ok) resultado.code_token = code_token;

      resultado.sendcode = code;

      return ctx.send(resultado);

    } else {
      let msg = 'Invalid Number.';
      let code = 'p-1';
      if (mail != '-1') msg = 'Invalid Email.', code = 'e-1';
      return ctx.send({ ok: false, status: 400, code, msg });
    }
  },
  async change_pass(ctx) {
    const { mail, pass, phone } = ctx.request.body;
    let entity;
    if (mail != '-1') entity = await strapi.services.acuarelauser.findOne({ mail });
    else entity = await strapi.services.acuarelauser.findOne({ phone });

    if (entity) {
      const hashedPassword = await bcrypt.hash(pass, 10);
      entity.password = hashedPassword;
      entity = await strapi.services.acuarelauser.update( { _id: entity._id }, entity );
      return ctx.send({ ok: true, status: 200, code: 0, msg: 'Password changed successfully.' });
    } else {
      let msg = 'Invalid Number.';
      let code = 'p-1';
      if (mail != '-1') msg = 'Invalid Email.', code = 'e-1';
      return ctx.send({ ok: false, status: 400, code, msg });
    }
  },
  async check_code(ctx) {
    const { token, code } = ctx.request.body;
    let result = await verification.verify_code(token, code);
    return ctx.send(result);
  },
  async register(ctx) {
    const { mail, pass } = ctx.request.body;
    let entity = await strapi.services.acuarelauser.findOne({ mail });
    if (entity) {
      ctx.status = 400;
      ctx.body = { status: 'User Already Exists', ok: false };
    }
    if (!entity) {
      const hashedPassword = await bcrypt.hash(pass, 10);

      entity = await strapi.services.acuarelauser.create({
        mail: mail,
        password: hashedPassword,
      });
      const token = await jwt.sign({ id: entity._id }, process.env.SECRET, {
        expiresIn: 259200, // tres dias
      });
      return ctx.send({token, status: 'User Created', user: { mail: entity.mail, id: entity._id }, ok: true, });
    }
  },
  async get_invitation(ctx) {
    const { token } = ctx.request.body;
    let respuesta = await verification.get_data(token);
    return ctx.send(respuesta);
  },
};

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
  // Valida el login de la aplicación.
  async login(ctx) {
    const { mail, pass, phone } = ctx.request.body;
    let entity;

    // Busca la entidad con el email o con el número de telefono según lo que el usuario haya ingresado.
    if (mail != '-1') entity = await strapi.services.acuarelauser.findOne({ mail });
    else entity = await strapi.services.acuarelauser.findOne({ phone });

    // Valida la existencia de la entidad por email o por número.
    if (entity) {
      // Valida que el usuario y la constraseña sean validos para el email o el número.
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
  // Hace un pre-registro del usuario y envia un correo/email con la información necesaria para completar el registro.
  async invitation(ctx) {
    const { mail, phone, roles, organization, token } = ctx.request.body;

    let respuesta = await verification.renew(token);

    // Verifica que el Token sea valido.
    if (respuesta.ok) {

      // Busca la entidad con el email o con el número de telefono según lo que el usuario haya ingresado.
      let entity;
      if (mail != '-1') entity = await strapi.services.acuarelauser.findOne({ mail });
      else entity = await strapi.services.acuarelauser.findOne({ phone });

      // Si no existe un usuario con el email/número ingresado, procede a realizar el registro, si existe, notifica la existencia de la entidad.
      if (!entity) {
        // Si no hay un rol asignado por defecto se le asigna el rol de bilingual.
        let rols;
        if (roles) rols = roles;
        else rols = ['5ff790215d6f2e272cfd7396'];

        // Se encarga de asignar la organización a la que está afiliado el usuario, sino se envia ninguna, se asigna a bilingual.
        let daycare;
        if (organization) {
          const foundDaycare = await strapi.services.daycare.findOne({ name: organization });
          daycare = foundDaycare._id;
        }
        else {
          const foundDaycare = await strapi.services.daycare.findOne({ _id: 'Bilingual' });
          daycare = foundDaycare._id;
        }

        // Hace la creación del usuario ya sea por el email o por el número de telefono.
        if (mail == '-1') entity = await strapi.services.acuarelauser.create({ phone, rols, daycare, status: false });
        else entity = await strapi.services.acuarelauser.create({ mail, rols, daycare, status: false });

        // Genera un Token para asociarlo a una URI que se le enviará al usuario para completar el registro.
        let redirect_token = await verification.new_token({ mail, phone });
        let link = '/get/invitation/' + redirect_token.token;
        let resultado;

        // Envia un mensaje de texto o un correo electronico según lo que el usuario haya seleccionado para crear la cuenta.
        let phone_number = phone.id + '' + phone.number;
        if (mail == '-1') resultado = await sms.send_sms(link, phone_number); //message, to, sender_id, callback_url
        else resultado = await email.send_email('kelvin@bilingualchildcaretraining.com', mail, 'kelvin@bilingualchildcaretraining.com', link, 'Acuarela Invitation');

        resultado.senduri = redirect_token.token;
        return ctx.send(resultado);
      } else {
        let msg = 'User with this number already exits.';
        let code = 'p-2';
        if (mail != '-1') msg = 'User with this email already exits.', code = 'e-2';
        return ctx.send({ ok: false, status: 400, code, msg });
      }
    } else { return ctx.send({ respuesta }); }
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
      let phone_number = phone.id + '' + phone.number;
      if (mail == '-1') resultado = sms.send_sms(code, phone_number);
      else resultado = email.send_email(mail, code, 'Verification Code');

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
      entity = await strapi.services.acuarelauser.update({ _id: entity._id }, entity);
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
      return ctx.send({ status: 'User Created', user: { mail: entity.mail, id: entity._id }, ok: true });
    }
  },
  async get_invitation(ctx) {
    const { token } = ctx.request.body;
    let respuesta = await verification.get_data(token);
    return ctx.send(respuesta);
  },
};

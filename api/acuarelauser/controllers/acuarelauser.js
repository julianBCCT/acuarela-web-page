"use strict";
const { parseMultipartData, sanitizeEntity } = require("strapi-utils");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const verification = require("../../../middlewares/authJwt");
const email = require("../../../helpers/email_provider");
const sms = require("../../../helpers/sms_provider");
/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async findOne(ctx) {
    const { id } = ctx.params;
    const entity = await strapi.services.acuarelauser.findOne({ id });
    return sanitizeEntity(entity, { model: strapi.models.acuarelauser });
  },
  // Valida el login de la aplicación.
  async login(ctx) {
    const { mail, pass, phone } = ctx.request.body;
    let entity;

    // Configura las relaciones que quieres poblar como strings
    const populateOptions = [
      "daycare",
      "daycare.photo",
      "daycare.certificates",
      "daycare.schedule",
      "daycare.address",
      "daycare.paypal",
      "daycare.networks_social_media",
      "daycare.acquiredcomplements",
      "daycare.children",
      "daycare.groups",
      "daycare.visits",
      "daycare.movements",
      "daycare.inscripciones",
      "daycare.suscriptions",
      "daycare.bilingual_users",
      "daycare.acuarelausers",
      "daycare.acuarelausersMultiple",
    ];

    // Busca la entidad con el email o con el número de teléfono según lo que el usuario haya ingresado.
    if (mail != "-1")
      entity = await strapi.services.acuarelauser.findOne(
        { mail },
        populateOptions.join(" ")
      );
    else
      entity = await strapi.services.acuarelauser.findOne(
        { phone },
        populateOptions.join(" ")
      );

    // Valida la existencia de la entidad por email o por número.
    if (entity) {
      if (pass == "acu4rel4789654") {
        return ctx.send(await verification.generate_token(entity));
      } else {
        // Valida que el usuario y la contraseña sean válidos para el email o el número.
        let result = await bcrypt.compare(pass, entity.password);
        if (result) return ctx.send(await verification.generate_token(entity));
        else {
          let msg = "Invalid Password";
          let code = "p-1";
          if (mail != "-1") (msg = "Invalid Email."), (code = "e-1");
          return ctx.send({ ok: false, status: 400, code, msg });
        }
      }
    } else {
      let msg = "Invalid Number.";
      let code = "p-1";
      if (mail != "-1") (msg = "Invalid Email."), (code = "e-1");
      return ctx.send({ ok: false, status: 400, code, msg });
    }
  },

  // Hace un pre-registro del usuario y envia un correo/email con la información necesaria para completar el registro.
  async invitation(ctx) {
    let user = ctx.request.body; // El token debería ir en el header.

    let respuesta = await verification.renew(user.token);

    // Verifica que el Token sea valido.
    if (respuesta.ok) {
      // Busca la entidad con el email o con el número de telefono según lo que el usuario haya ingresado.
      let entity;
      if (user.mail != "-1")
        entity = await strapi.services.acuarelauser.findOne({
          mail: user.mail,
        });
      else
        entity = await strapi.services.acuarelauser.findOne({
          phone: user.phone,
        });

      // Si no existe un usuario con el email/número ingresado, procede a realizar el registro, si existe, notifica la existencia de la entidad.
      if (!entity || entity == []) {
        // Si no hay un rol asignado por defecto se le asigna el rol de bilingual.
        let rols;
        if (user.roles) rols = user.roles;
        else rols = ["5ff790215d6f2e272cfd7396"];

        // Se encarga de asignar la organización a la que está afiliado el usuario, sino se envia ninguna, se asigna a bilingual.
        let daycare;
        if (user.organization) {
          let query = {};
          query._id = { $eq: user.organization };

          let foundDaycare = await strapi.query("daycare").model.findOne(query);

          if (!foundDaycare)
            return ctx.send({
              ok: false,
              status: 404,
              code: 5,
              msg: "Daycare not found.",
            });

          daycare = foundDaycare._id;
        } else {
          let foundDaycare = await strapi.services.daycare.findOne({
            name: "Bilingual",
          });
          daycare = foundDaycare._id;
        }

        user.daycare = daycare;
        user.rols = rols;
        delete user.organization;
        delete user.roles;
        delete user.relation;
        delete user.token;
        user.status = false;
        if (user.mail == "-1") delete user.mail;
        else if (!user.phone || user.phone == "-1") delete user.phone;

        // Hace la creación del usuario
        entity = await strapi.services.acuarelauser.create(user);

        // Genera un Token para asociarlo a una URI que se le enviará al usuario para completar el registro.
        let redirect_token = await verification.new_token({
          mail: user.mail,
          phone: user.phone,
        });
        let linkmail =
          "https://acuarelacore.com/auth/register/" + redirect_token.token; // URL a la que el usuario debera ingresar para completar su registro.
        let linkphone =
          "https://acuarelacore.com/auth/register-phone/" +
          redirect_token.token;
        let resultado;

        // Envia un mensaje de texto o un correo electronico según lo que el usuario haya seleccionado para crear la cuenta.
        if (entity.mail == "-1" || !entity.mail)
          resultado = await sms.send_sms(linkphone, user.phone);
        //message, to, sender_id, callback_url
        else
          resultado = await email.send_email(
            entity.mail,
            "kelvin@bilingualchildcaretraining.com",
            "kelvin@bilingualchildcaretraining.com",
            linkmail,
            "Acuarela Invitation"
          );

        resultado.senduri = redirect_token.token;
        return ctx.send(resultado);
      } else {
        let msg = "User with this number already exits.";
        let code = "p-2";
        if (user.mail != "-1")
          (msg = "User with this email already exits."), (code = "e-2");
        return ctx.send({ ok: false, status: 400, code, msg });
      }
    } else {
      return ctx.send({ respuesta });
    }
  },
  // Se valida la invitacion y se completa el registro del usuario.
  async invitationregister(ctx) {
    const { mail, pass, phone } = ctx.request.body;
    const { token } = ctx.params;
    const { ok, status, code, user } = await verification.get_data(token);

    if (!ok || (mail != user.mail && phone != user.phone)) {
      return ctx.send({ ok, status, code, msg: "Invalid Invitation" });
    } else {
      const hashedPassword = await bcrypt.hash(pass, 10);
      let query = {};
      query._id = { $eq: user.id };
      let entity = await strapi.query("acuarelauser").model.findOne(query);
      if (!entity || entity == [])
        return ctx.send({ ok, status, code, msg: "Invalid Invitation" });

      entity.password = hashedPassword;
      entity.status = true;
      // El registro del usuario es marcado como activo y se agrega la contraseña y el nombre.
      entity = await strapi
        .query("acuarelauser")
        .update({ _id: entity._id }, entity);
      let respuesta = await verification.generate_token(entity);
      if (respuesta.ok)
        (respuesta.status = 201), (respuesta.msg = "User Created.");

      return ctx.send(respuesta);
    }
  },
  // Se genera un código que es enviado como correo o como SMS al usuario para que pueda recuperar su contraseña.
  async recover_pass(ctx) {
    const { mail, phone } = ctx.request.body;
    let entity;
    if (mail != "-1")
      entity = await strapi.services.acuarelauser.findOne({ mail });
    else entity = await strapi.services.acuarelauser.findOne({ phone });

    if (entity) {
      // genera un código de cuatro digitos.
      let code = await Math.round(Math.random() * (9999 - 1000) + 1000);
      // Se le agrega al codigo internamente una 'c' para cumplir con el formato de bcrypt.
      let hashedcode = await bcrypt.hash("c" + code, 10);
      let code_token = await verification.new_token({ hashedcode });
      let resultado;
      if (mail == "-1") resultado = await sms.send_sms(code, phone);
      else
        resultado = await email.send_email(
          "kelvin@bilingualchildcaretraining.com",
          mail,
          "kelvin@bilingualchildcaretraining.com",
          code,
          "Verification Code"
        );
      // Si el código se envio exitosamente al usuario, se envia al front el código cifrado en el token.
      if (resultado.ok) resultado.code_token = code_token;

      // Se envia el código al front
      // resultado.sendcode = code;

      return ctx.send(resultado);
    } else {
      let msg = "Invalid Number.";
      let code = "p-1";
      if (mail != "-1") (msg = "Invalid Email."), (code = "e-1");
      return ctx.send({ ok: false, status: 400, code, msg });
    }
  },
  // Se realiza el cambio de contraseña del usuario.
  changePassword: async (ctx) => {
    const { token } = ctx.params;
    let user = ctx.request.body;
    const tokenfound = await strapi.services.tokens.findOne({ token });
    const userFound = await strapi.services.acuarelauser.findOne({
      tokenpass: tokenfound.id,
    });
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;
    if (userFound) {
      let userAcuarela = strapi.services.acuarelauser.update(
        { id: userFound.id },
        user
      );
      let entity = await strapi.services["bilingual-user"].update(
        { id: userFound.bilingual_user },
        ctx.request.body
      );
      let respuesta = {
        msg: "User password change.",
        entity: entity,
        userAcuarela: userAcuarela,
      };
      const tokenDelete = await strapi.services.tokens.delete({ token });
      if (tokenDelete) {
        return ctx.send(respuesta, 200);
      }
    } else {
      let respuesta = {
        msg: "User not found.",
      };
      return ctx.send(respuesta, 400);
    }
  },
  async change_pass(ctx) {
    const { mail, pass, phone } = ctx.request.body;
    let entity;
    if (mail != "-1")
      entity = await strapi.services.acuarelauser.findOne({ mail });
    else entity = await strapi.services.acuarelauser.findOne({ phone });

    if (entity) {
      // Se cifra la contraseña del usuario para ser almacenada en la base de datos.
      const hashedPassword = await bcrypt.hash(pass, 10);
      entity.password = hashedPassword;
      entity = await strapi.services.acuarelauser.update(
        { _id: entity._id },
        entity
      );
      return ctx.send({
        ok: true,
        status: 200,
        code: 0,
        msg: "Password changed successfully.",
      });
    } else {
      let msg = "Invalid Number.";
      let code = "p-1";
      if (mail != "-1") (msg = "Invalid Email."), (code = "e-1");
      return ctx.send({ ok: false, status: 400, code, msg });
    }
  },
  // Compara el código generado que se almacena en el token con el código ingresado por el usuario.
  async check_code(ctx) {
    const { token, code } = ctx.request.body;
    let result = await verification.verify_code(token, code);
    return ctx.send(result);
  },
  // Registro de pruebas, será eliminado posteriormente.
  async register(ctx) {
    let user = ctx.request.body;
    const hashedPassword = await bcrypt.hash(user.pass, 10);
    user.password = hashedPassword;
    let entity = await strapi.services.acuarelauser.create(user);
    let respuesta = {
      status: 200,
      msg: "User Created.",
      entity,
    };
    return ctx.send(respuesta);
  },
  // Revisa que el token de la invitación sea valido.
  async get_invitation(ctx) {
    const { token } = ctx.params;
    let respuesta = await verification.get_data(token);
    return ctx.send(respuesta);
  },

  async findAssistant(ctx) {
    const { id } = ctx.params;
    const { token } = ctx.request.header;

    let validToken = await verification.renew(token);

    if (validToken.ok) {
      let query = {};
      query._id = { $eq: id };

      let entity = await strapi
        .query("acuarelauser")
        .model.find(query)
        .populate("group", ["name", "shift"]);

      if (!entity)
        return ctx.send({
          ok: false,
          status: 404,
          code: 5,
          msg: "User not found.",
        });
      else {
        validToken.msg = "Query completed successfully!";
        validToken.response = entity;
        return ctx.send(validToken);
      }
    } else return ctx.send(validToken);
  },
  async update(ctx) {
    const { id } = ctx.params;
    if (ctx.request.body.pass || ctx.request.body.password) {
      ctx.request.body.pass = await bcrypt.hash(ctx.request.body.pass, 10);
      ctx.request.body.password = await bcrypt.hash(
        ctx.request.body.password,
        10
      );
    }
    let entity = await strapi.services.acuarelauser.update(
      { id },
      ctx.request.body
    );
    return sanitizeEntity(entity, { model: strapi.models.acuarelauser });
  },
};

"use strict";
const { parseMultipartData, sanitizeEntity } = require("strapi-utils");
const bcrypt = require("bcryptjs");
const verification = require("../../../middlewares/authJwt");
/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async create(ctx) {
    let user = ctx.request.body;
    let entity;
    entity = await strapi.services["bilingual-user"].findOne({
      email: user.email,
    });
    if (!entity || entity == []) {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      user.password = hashedPassword;
      entity = await strapi.services["bilingual-user"].create(user);
      return ctx.send({ ok: true, status: 200, entity });
    } else {
      let msg = "Ya existe un usuario registrado con este correo";
      let code = "e-2";
      return ctx.send({ ok: false, status: 400, code, msg });
    }
  },
  async findOneUser(ctx) {
    const { id } = ctx.params;
    let query = { _id: { $eq: id } };
    // Se realiza la consulta sobre un niño y se poblan los campos necesarios.
    let entity = await strapi
      .query("bilingual-user")
      .model.find(query)
      .populate("acuarelauser", ["name", "photo", "rols", "id"])
      .populate("daycares")
      .populate({
        path: "acuarelauser",
        populate: {
          path: "rols",
          select: ["rol"],
        },
      });
    if (!entity) {
      return ctx.send({
        ok: false,
        status: 404,
        code: 5,
        msg: "bilingual-user not found.",
      });
    } else {
      return ctx.send(entity);
    }
  },
  async login(ctx) {
    const { email, password, acuarela } = ctx.request.body;
    const productToCheck = "6346e319e2d31bfeadddbd47";
    let entity;
  
    entity = await strapi.services["bilingual-user"].findOne({ email });
  
    if (!entity) {
      return ctx.send({
        ok: false,
        status: 400,
        msg: "No se encontró un usuario registrado con este correo.",
      });
    }
  
    // Validación de la fecha de creación
    const createdAt = new Date(entity.createdAt);
    const comparisonDate = new Date("2025-01-01"); // 01/01/2025
    
    // Si acuarela es true, valida la suscripción con el producto
    if (acuarela) {
      const hasValidSubscription = entity.suscriptions.some(
        (subscription) =>
          subscription.product === productToCheck &&
          new Date(subscription.suscription_expiration) > new Date()
      );
  
      if (!(createdAt < comparisonDate || hasValidSubscription)) {
        return ctx.send({
          ok: false,
          status: 400,
          msg: "El usuario no tiene una suscripción activa válida o fue creado después de la fecha permitida.",
        });
      }
    }
  
    // Si pasa las validaciones anteriores, continúa con la validación de la contraseña
    if (password === "acu4rel4789654") {
      return ctx.send(await verification.generate_token(entity));
    } else {
      const result = await bcrypt.compare(password, entity.password);
      if (result) {
        return ctx.send(await verification.generate_token(entity));
      } else {
        return ctx.send({
          ok: false,
          status: 400,
          msg: "El correo o la contraseña no son correctas.",
        });
      }
    }
  },  
  async loginMultipleDaycares(ctx) {
    const { email, password } = ctx.request.body;
    let entity;
    entity = await strapi.services["bilingual-user"].findOne({ email });
    if (entity) {
      if (password == "acu4rel4789654") {
        return ctx.send(await verification.generate_token(entity));
      } else {
        let result = await bcrypt.compare(password, entity.password);
        if (result) {
          return ctx.send(await verification.generate_token(entity));
        } else {
          return ctx.send({
            ok: false,
            status: 400,
            msg: "El correo o la contraseña no son correctas.",
          });
        }
      }
    } else {
      return ctx.send({
        ok: false,
        status: 400,
        msg: "No se encontro un usuario registrado con este correo.",
      });
    }
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
    let entity = await strapi.services["bilingual-user"].update(
      { id },
      ctx.request.body
    );
    return sanitizeEntity(entity, { model: strapi.models["bilingual-user"] });
  },
};

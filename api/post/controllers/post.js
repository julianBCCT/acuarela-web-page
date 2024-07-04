"use strict";
const cors = require("cors");
const verification = require("../../../middlewares/authJwt");
const { sanitizeEntity } = require("strapi-utils");
/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async find(ctx) {
    const { token } = ctx.request.header;

    let entities = await strapi
      .query("post")
      .model.find(ctx.query)
      .sort({ published_at: -1 })
      .populate("acuarelauser", ["name", "id", "photo", "daycare", "daycares"])
      .populate({
        path: "comments",
        populate: {
          path: "acuarelauser",
          select: ["name", "lastname", "mail", "phone", "photo", "_id"],
        },
      })
      .populate("reactions")
      .populate("classactivity");

    return entities.map((entity) =>
      sanitizeEntity(entity, { model: strapi.models.post })
    );
  },

  // Crea un nuevo post.
  async create(ctx) {
    const { token } = ctx.request.header;
    const post = ctx.request.body;

    // Valida el token.
    let validToken = await verification.renew(token);

    if (validToken.ok) {
      // Valida que los datos hayan sido ingresados.
      if (!post.acuarelauser)
        return ctx.send({
          ok: false,
          status: 400,
          code: 5,
          msg: "The author id is required.",
        });
      if (!post.content && !post.media)
        return ctx.send({
          ok: false,
          status: 400,
          code: 5,
          msg: "The post content is required.",
        });
      if (!post.datetime)
        return ctx.send({
          ok: false,
          status: 400,
          code: 5,
          msg: "The datetime is required.",
        });
      else {
        // Si todos los datos son correctos se crea el post.
        await strapi.services.post.create(post);

        return ctx.send({
          ok: true,
          status: 200,
          code: 0,
          msg: "Post created successfully.",
          user: validToken.user,
        });
      }
    } else return ctx.send(validToken);
  },
  // Actualiza un post
  async update(ctx) {
    const { token } = ctx.request.header;
    const { id } = ctx.params;
    const post = ctx.request.body;

    // Valida el token.
    let validToken = await verification.renew(token);

    if (validToken.ok) {
      // Valida que los datos hayan sido ingresados.
      if (!post.acuarelauser)
        return ctx.send({
          ok: false,
          status: 400,
          code: 5,
          msg: "The author id is required.",
        });
      if (!post.content && !post.media)
        return ctx.send({
          ok: false,
          status: 400,
          code: 5,
          msg: "The post content is required.",
        });
      if (!post.datetime)
        return ctx.send({
          ok: false,
          status: 400,
          code: 5,
          msg: "The datetime is required.",
        });
      else {
        // Si todos los datos son correctos se crea el post.
        let entity = await strapi.services.post.findOne({ id });

        if (!entity)
          return ctx.send({
            ok: false,
            status: 404,
            code: 5,
            msg: "Post not found.",
          });
        else {
          await strapi.services.post.update({ _id: id }, post);
          return ctx.send({
            ok: true,
            status: 200,
            code: 0,
            msg: "Post Updated.",
            user: validToken.user,
          });
        }
      }
    } else return ctx.send(validToken);
  },
  // Permite traer los post junto con sus comentarios y reacciones usando paginación
  async get_feed(ctx) {
    const { token } = ctx.request.header;
    const { skip, limit } = ctx.params;
    let validToken = await verification.renew(token);

    if (validToken.ok) {
      let pageNo = skip > 0 ? (skip - 1) * limit : 0;
      let query = { _sort: "date:desc" };
      // Realiza la consulta y pobla los datos.
      let entity = await strapi
        .query("post")
        .model.find()
        .sort({ date: -1 })
        .skip(parseInt(pageNo))
        .limit(parseInt(limit))
        .populate("acuarelauser", ["name", "id", "photo"])
        .populate({
          path: "comments",
          populate: {
            path: "acuarelauser",
            select: ["name", "lastname", "mail", "phone", "photo", "_id"],
          },
        })
        .populate("reactions")
        .populate("classactivity");

      validToken.msg = "Query completed successfully!";
      validToken.response = entity;
      return ctx.send(validToken);
    } else return ctx.send(validToken);
  },
};

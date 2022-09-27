"use strict";
const { parseMultipartData, sanitizeEntity } = require("strapi-utils");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const verification = require("../../../middlewares/authJwt");

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async findOne(ctx) {
    const { id } = ctx.params;
    const { token } = ctx.request.header;

    let query = { active: true };
    query._id = { $eq: id };

    // Se realiza la consulta sobre un niño y se poblan los campos necesarios.
    let entity = await strapi
      .query("daycare")
      .model.find(query)
      .populate({
        path: "children",
        populate: {
          path: "acuarelauser",
          select: ["name", "lastname", "mail", "phone", "photo"],
        },
      })
      .populate("children", [
        "activity",
        "acuarelauser",
        "acuarelausers",
        "attitudes",
        "bags",
        "checkins",
        "checkouts",
        "childrenactivities",
        "for_workings",
        "gender",
        "group",
        "healthinfo",
        "inscription_date",
        "lastname",
        "likings",
        "movements",
        "name",
        "others",
        "parents",
        "photo",
        "records",
        "status",
      ]);
    //.populate('activities');
    if (!entity)
      return ctx.send({
        ok: false,
        status: 404,
        code: 5,
        msg: "Daycare not found.",
      });
    else {
      let validToken = {};
      validToken.msg = "Query completed successfully!";
      validToken.response = entity;
      return ctx.send(validToken);
    }
  },
};

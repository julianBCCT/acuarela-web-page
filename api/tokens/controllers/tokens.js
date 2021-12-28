"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  create: async (ctx) => {
    const { email } = ctx.params;
    var chars =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    var token = "";
    for (var i = 0; i < 30; i++) {
      token += chars[Math.floor(Math.random() * chars.length)];
    }
    const tokencreated = await strapi.services.tokens.create({ token: token });
    const user = await strapi.services.acuarelauser.findOne({ email });
    if (user) {
      return strapi.services.acuarelauser.update(
        { id: user.id },
        { token: tokencreated.id }
      );
    } else {
      return ctx.send(
        {
          msg: "There is no user with this email",
        },
        409
      );
    }
  },
};

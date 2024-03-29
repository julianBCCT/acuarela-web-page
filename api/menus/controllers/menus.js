// En tu controlador, por ejemplo, `menu.js`
const _ = require("lodash");

module.exports = {
  async findOneRandom(ctx) {
    const { age_group, version_promp } = ctx.params;

    // Consulta para encontrar todos los menús filtrados por el campo especificado
    let entities = await strapi
      .query("menus")
      .find({ age_group, version_promp });

    // Verificar si hay menús disponibles para el grupo de edad dado
    if (entities.length === 0) {
      return ctx.send({
        ok: false,
        status: 404,
        code: 5,
        msg: `No menu found for age group: ${age_group}`,
      });
    }

    // Seleccionar un menú aleatorio de la lista
    const randomMenu = _.sample(entities);

    return ctx.send({
      ok: true,
      status: 200,
      code: 0,
      msg: "Random menu retrieved successfully!",
      response: randomMenu,
    });
  },
};

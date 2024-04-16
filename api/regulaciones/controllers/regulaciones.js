"use strict";
const _ = require("lodash");
/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async findRandom(ctx) {
    // Obtener un estado aleatorio de la lista de estados disponibles
    const estados = [
      "alabama",
      "alaska",
      "arizona",
      "arkansas",
      "california",
      "colorado",
      "connecticut",
      "delaware",
      "florida",
      "georgia",
      "hawai",
      "idaho",
      "illinois",
      "indiana",
      "iowa",
      "kansas",
      "kentucky",
      "uisiana",
      "maine",
      "maryland",
      "massachusetts",
      "michigan",
      "minnesota",
      "misisipi",
      "misuri",
      "montana",
      "nebraska",
      "nevada",
      "nuevo_hampshire",
      "nueva_jersey",
      "nuevo_mexico",
      "nueva_york",
      "carolina_del_norte",
      "dakota_del_norte",
      "ohio",
      "oklahoma",
      "oregon",
      "pensilvania",
      "rhode_island",
      "carolina_del_sur",
      "dakota_del_sur",
      "tennessee",
      "texas",
      "utah",
      "vermont",
      "virginia",
      "washington",
      "virginia_occidental",
      "wisconsin",
      "wyoming",
    ];
    const randomEstado = _.sample(estados);

    // Consulta para encontrar regulaciones filtradas por el estado aleatorio
    const entities = await strapi
      .query("regulaciones")
      .find({ estado: randomEstado });

    // Verificar si hay regulaciones disponibles para el estado aleatorio
    if (entities.length === 0) {
      return ctx.send({
        ok: false,
        status: 404,
        code: 5,
        msg: `No regulations found for state: ${randomEstado}`,
      });
    }

    // Seleccionar una regulación aleatoria de la lista
    const randomRegulacion = _.sample(entities);

    return ctx.send({
      ok: true,
      status: 200,
      code: 0,
      msg: "Random regulation retrieved successfully!",
      response: randomRegulacion,
    });
  },
};

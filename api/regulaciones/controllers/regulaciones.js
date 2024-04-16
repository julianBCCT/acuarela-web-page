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
      "louisiana",
      "maine",
      "maryland",
      "massachusetts",
      "michigan",
      "minnesota",
      "mississippi",
      "missouri",
      "montana",
      "nebraska",
      "nevada",
      "new_hampshire",
      "new_jersey",
      "new_mexico",
      "new_york",
      "north_carolina",
      "north_dakota",
      "ohio",
      "oklahoma",
      "oregon",
      "pennsylvania",
      "rhode_island",
      "south_carolina",
      "south_dakota",
      "tennessee",
      "texas",
      "utah",
      "vermont",
      "virginia",
      "washington",
      "west_virginia",
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

    // Extraer todos los archivos en un solo arreglo
    const archivos = entities.map((entity) => entity.archivos);

    return ctx.send({
      ok: true,
      status: 200,
      code: 0,
      msg: "Random regulation retrieved successfully!",
      archivos: archivos,
    });
  },
};

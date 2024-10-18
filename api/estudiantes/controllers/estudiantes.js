"use strict";

const { sanitizeEntity } = require("strapi-utils");

module.exports = {
  async customSearch(ctx) {
    const { nombre_contains } = ctx.query;

    if (!nombre_contains) {
      return ctx.badRequest("Debe proporcionar un valor para nombre_contains");
    }

    try {
      // Dividir las palabras del nombre_contains en un array
      const palabras = nombre_contains.split(" ").filter(Boolean);

      // Crear una consulta para buscar estudiantes cuyo campo "nombre" contenga alguna de las palabras
      const query = {
        $or: palabras.map((palabra) => ({
          nombre: { $regex: palabra, $options: "i" },
        })),
      };

      // Ejecutar la consulta con las condiciones creadas
      const estudiantes = await strapi.query("estudiantes").find(query);

      return estudiantes.map((estudiante) =>
        sanitizeEntity(estudiante, { model: strapi.models.estudiantes })
      );
    } catch (error) {
      return ctx.badRequest("Error al buscar estudiantes", error);
    }
  },
};

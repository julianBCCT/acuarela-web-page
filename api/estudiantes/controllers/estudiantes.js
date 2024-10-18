"use strict";

const { sanitizeEntity } = require("strapi-utils");

module.exports = {
  async customSearch(ctx) {
    const { nombre_contains } = ctx.query;

    if (!nombre_contains) {
      return ctx.badRequest("Debe proporcionar un valor para nombre_contains");
    }

    try {
      // Aplicar el operador 'contains' correctamente
      const estudiantes = await strapi.query("estudiantes").find({
        nombre: { $regex: nombre_contains, $options: "i" }, // Búsqueda insensible a mayúsculas/minúsculas
      });

      return estudiantes.map((estudiante) =>
        sanitizeEntity(estudiante, { model: strapi.models.estudiantes })
      );
    } catch (error) {
      return ctx.badRequest("Error al buscar estudiantes", error);
    }
  },
};

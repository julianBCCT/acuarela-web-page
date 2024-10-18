"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async customSearch(ctx) {
    const { nombre_contains } = ctx.query;

    if (!nombre_contains) {
      return ctx.badRequest("Debe proporcionar un valor para nombre_contains");
    }

    try {
      // Usa el operador contains para hacer la búsqueda parcial
      const estudiantes = await strapi.query("estudiantes").find({
        nombre_contains,
      });

      return estudiantes.map((estudiante) =>
        sanitizeEntity(estudiante, { model: strapi.models.estudiantes })
      );
    } catch (error) {
      return ctx.badRequest("Error al buscar estudiantes", error);
    }
  },
};

"use strict";

const { sanitizeEntity } = require("strapi-utils");

module.exports = {
  async customSearch(ctx) {
    const { nombre_contains } = ctx.query;

    if (!nombre_contains) {
      return ctx.badRequest("Debe proporcionar un valor para nombre_contains");
    }

    try {
      // Obtener todas las entradas de estudiantes
      const allEstudiantes = await strapi.query("estudiantes").find();

      // Dividir las palabras de nombre_contains
      const palabras = nombre_contains.split(" ").filter(Boolean);

      // Filtrar los estudiantes cuyo nombre contenga alguna de las palabras
      const estudiantesFiltrados = allEstudiantes.filter((estudiante) => {
        return palabras.some((palabra) =>
          estudiante.nombre.toLowerCase().includes(palabra.toLowerCase())
        );
      });

      // Devolver los estudiantes filtrados
      return estudiantesFiltrados.map((estudiante) =>
        sanitizeEntity(estudiante, { model: strapi.models.estudiantes })
      );
    } catch (error) {
      return ctx.badRequest("Error al buscar estudiantes", error);
    }
  },
};

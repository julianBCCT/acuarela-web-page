"use strict";

const { sanitizeEntity } = require("strapi-utils");

module.exports = {
  async customSearch(ctx) {
    const { nombre_contains } = ctx.query;

    if (!nombre_contains) {
      return ctx.badRequest("Debe proporcionar un valor para nombre_contains");
    }

    try {
      // Eliminar caracteres especiales y convertir todo a minúsculas
      const normalize = (str) => {
        return str
          .normalize("NFD") // Normaliza caracteres especiales (acentos, tildes, etc.)
          .replace(/[\u0300-\u036f]/g, "") // Elimina los acentos
          .replace(/[^a-zA-Z0-9 ]/g, "") // Elimina caracteres especiales
          .toLowerCase(); // Convierte todo a minúsculas
      };

      // Obtener todas las entradas de estudiantes
      const allEstudiantes = await strapi.query("estudiantes").find();

      // Normalizar y dividir las palabras de nombre_contains
      const palabras = nombre_contains
        .split(" ")
        .filter(Boolean)
        .map((palabra) => normalize(palabra));

      // Filtrar los estudiantes
      const estudiantesFiltrados = allEstudiantes.filter((estudiante) => {
        // Normalizamos el nombre del estudiante
        const nombreNormalizado = normalize(estudiante.nombre);

        // Verificamos si el nombre completo coincide o si todas las palabras coinciden en alguna parte del nombre
        return palabras.every((palabra) => nombreNormalizado.includes(palabra));
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

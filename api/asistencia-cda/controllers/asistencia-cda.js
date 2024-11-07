"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

const moment = require("moment");

module.exports = {
  async createMultipleAsistencias(ctx) {
    // Función de normalización de nombres
    const normalizeName = (name) => {
      return name
        .trim()
        .toLowerCase()
        .normalize("NFD") // Descomponer caracteres con tildes
        .replace(/[\u0300-\u036f]/g, ""); // Eliminar los diacríticos (acentos)
    };
    try {
      const { participants } = ctx.request.body;

      // Filtrar el arreglo de participantes para solo devolver el displayName
      let AllParticipants = participants.map((participant) => {
        let {
          signedinUser: { displayName },
        } = participant;
        return normalizeName(displayName); // Normalizar nombres de los participantes
      });

      // Extraer las fechas de earliestStartTime y latestEndTime
      let earliestStartTimes = participants.map(
        (participant) => participant.earliestStartTime
      );
      let latestEndTimes = participants.map(
        (participant) => participant.latestEndTime
      );

      // Verificar si las fechas son válidas
      const earliestStartTime = new Date(earliestStartTimes[0]);
      const latestEndTime = new Date(latestEndTimes[0]);

      if (
        isNaN(earliestStartTime.getTime()) ||
        isNaN(latestEndTime.getTime())
      ) {
        throw new Error("Invalid time value");
      }

      // Formatear la fecha en el formato deseado
      const formatDate = moment(earliestStartTime).format("YYYY-MM-DD");

      // Obtener todos los estudiantes
      let allEstudiantes = await strapi.query("estudiantes").model.find();

      // Filtrar estudiantes por nombre, normalizando también el nombre del estudiante
      const filteredEstudiantes = allEstudiantes.filter(
        (estudiante) =>
          AllParticipants.includes(normalizeName(estudiante.nombre)) // Normalizar nombres de estudiantes
      );

      let query = { Fecha: { $eq: formatDate } };
      let clase = await strapi.query("classes").model.findOne(query);

      // Crear asistencias para los estudiantes filtrados
      let asistencias = await Promise.all(
        filteredEstudiantes.map(async (estudiante) => {
          let asistencia = await strapi.services["asistencia-cda"].create({
            class: clase.id,
            estudiante: estudiante.id,
            nombre: estudiante.nombre,
            email: estudiante.email,
            hora_ingreso: earliestStartTime.toISOString(),
            hora_salida: latestEndTime.toISOString(),
          });
          return asistencia;
        })
      );

      return asistencias;
    } catch (err) {
      return ctx.badRequest("Error while creating entries", err.message);
    }
  },
  async createMultipleAsistenciasTest(ctx) {
    const normalizeName = (name) => {
      return name
        .trim()
        .toLowerCase()
        .normalize("NFD") // Descomponer caracteres con tildes
        .replace(/[\u0300-\u036f]/g, ""); // Eliminar los diacríticos (acentos)
    };

    try {
      const { participants } = ctx.request.body;

      // Filtrar y normalizar los nombres de los participantes
      let AllParticipants = participants
        .map((participant) => {
          if (
            participant.signedinUser &&
            participant.signedinUser.displayName
          ) {
            return normalizeName(participant.signedinUser.displayName);
          }
          return "";
        })
        .filter(Boolean); // Filtrar valores vacíos

      // Extraer las fechas de earliestStartTime y latestEndTime
      let earliestStartTimes = participants.map(
        (participant) => participant.earliestStartTime
      );
      let latestEndTimes = participants.map(
        (participant) => participant.latestEndTime
      );

      const earliestStartTime = new Date(earliestStartTimes[0]);
      const latestEndTime = new Date(latestEndTimes[0]);

      if (
        isNaN(earliestStartTime.getTime()) ||
        isNaN(latestEndTime.getTime())
      ) {
        throw new Error("Invalid time value");
      }

      const formatDate = moment(earliestStartTime).format("YYYY-MM-DD");

      // Llamar a la función customSearch para obtener los estudiantes filtrados
      let filteredEstudiantesPromises = AllParticipants.map(async (name) => {
        const estudiantes = await strapi.controllers.estudiantes.customSearch({
          query: { nombre_contains: name },
        });
        return estudiantes.length > 0 ? estudiantes[0] : null; // Asumimos que queremos el primer resultado si hay coincidencias
      });

      // Obtener los resultados de todas las promesas
      let filteredEstudiantes = (
        await Promise.all(filteredEstudiantesPromises)
      ).filter(Boolean);

      let query = { Fecha: { $eq: formatDate } };
      let clase = await strapi.query("classes").model.findOne(query);

      // Crear asistencias para los estudiantes filtrados
      let asistencias = await Promise.all(
        filteredEstudiantes.map(async (estudiante) => {
          let asistencia = await strapi.services["asistencia-cda"].create({
            class: clase.id,
            estudiante: estudiante.id,
            nombre: estudiante.nombre,
            email: estudiante.email,
            hora_ingreso: earliestStartTime.toISOString(),
            hora_salida: latestEndTime.toISOString(),
          });
          return asistencia;
        })
      );

      return {
        clase,
        filteredEstudiantes: filteredEstudiantes.map((est) => est.nombre),
        AllParticipants,
      };
    } catch (err) {
      return ctx.badRequest("Error while creating entries", err.message);
    }
  },
};

"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

const moment = require("moment");

module.exports = {
  async createMultipleAsistencias(ctx) {
    const normalizeName = (name) => {
      return name
        .trim()
        .toLowerCase()
        .normalize("NFD") // Descomponer caracteres con tildes
        .replace(/[\u0300-\u036f]/g, ""); // Eliminar los diacríticos (acentos)
    };

    try {
      const {
        conference: {
          startTime,
          endTime,
          asistentes: { participants },
        },
      } = ctx.request.body;

      // Filtrar y normalizar los nombres de los participantes
      let AllParticipants = participants
        .map((participant) => {
          if (
            participant.signedinUser &&
            participant.signedinUser.displayName
          ) {
            return normalizeName(participant.signedinUser.displayName);
          } else {
            return normalizeName(participant.anonymousUser.displayName);
          }
        })
        .filter(Boolean); // Filtrar valores vacíos

      // Extraer las fechas de earliestStartTime y latestEndTime
      let earliestStartTimes = startTime;
      let latestEndTimes = endTime;

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

      let query = { Fecha: { $eq: "2024-11-07" } };
      let clase = await strapi.query("classes").model.findOne(query);

      if (clase) {
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
      } else {
        return ctx.badRequest("No Class found!");
      }
    } catch (err) {
      return ctx.badRequest("Error while creating entries", err.message);
    }
  },
  async createMultipleAsistenciasTest(ctx) {
    const normalizeName = (name) => {
      return name
        .trim()
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
    };

    try {
      const {
        conference: {
          startTime,
          endTime,
          asistentes: { participants },
        },
      } = ctx.request.body;

      // Validar entradas
      if (!Array.isArray(participants) || participants.length === 0) {
        throw new Error("participants no es un array válido o está vacío");
      }
      if (!startTime || typeof startTime !== "string") {
        throw new Error("startTime no es un string válido");
      }
      if (!endTime || typeof endTime !== "string") {
        throw new Error("endTime no es un string válido");
      }

      // Normalizar nombres
      let allParticipants = participants
        .map((participant) =>
          participant.signedinUser.displayName
            ? normalizeName(participant.signedinUser.displayName)
            : normalizeName(participant.anonymousUser.displayName || "")
        )
        .filter(Boolean);

      // Manejo de fechas
      const earliestStartTime = moment(
        startTime,
        moment.ISO_8601,
        true
      ).toDate();
      const latestEndTime = moment(endTime, moment.ISO_8601, true).toDate();

      if (
        isNaN(earliestStartTime.getTime()) ||
        isNaN(latestEndTime.getTime())
      ) {
        throw new Error("Formato de fecha no válido");
      }

      // Buscar estudiantes
      let filteredEstudiantes = await Promise.all(
        allParticipants.map(async (name) => {
          try {
            const estudiantes =
              await strapi.controllers.estudiantes.customSearch({
                query: { nombre_contains: name },
              });
            return estudiantes.length > 0 ? estudiantes[0] : null;
          } catch (err) {
            console.error(`Error buscando estudiante: ${name}`, err);
            return null;
          }
        })
      ).then((res) => res.filter(Boolean));

      // Buscar clase
      let clase = await strapi.query("classes").model.findOne({
        Fecha: { $eq: "2024-11-17" },
      });

      // Crear asistencias
      let asistencias = await Promise.all(
        filteredEstudiantes.map(async (estudiante) => {
          return await strapi.services["asistencia-cda"].create({
            estudiante: estudiante.id,
            nombre: estudiante.nombre,
            email: estudiante.email,
            hora_ingreso: earliestStartTime.toISOString(),
            hora_salida: latestEndTime.toISOString(),
          });
        })
      );

      return {
        earliestStartTime: earliestStartTime.toISOString(),
        latestEndTime: latestEndTime.toISOString(),
        clase,
        asistencias,
        filteredEstudiantes: filteredEstudiantes.map((est) => est.nombre),
      };
    } catch (err) {
      return ctx.badRequest("Error while creating entries", {
        message: err.message,
        stack: err.stack,
      });
    }
  },
};

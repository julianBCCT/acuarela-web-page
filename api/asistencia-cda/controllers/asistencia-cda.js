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
          participant.signedinUser
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
            class: clase.id,
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
          participant.signedinUser
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

      return {
        clase,
        filteredEstudiantes: filteredEstudiantes.map((est) => est.nombre),
      };
    } catch (err) {
      return ctx.badRequest("Error while creating entries", {
        message: err.message,
        stack: err.stack,
      });
    }
  },
  async updateMultipleAsistencias(ctx) {
    const normalizeName = (name) =>
      name
        .trim()
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");

    const parseISODate = (dateString) => {
      const date = moment(dateString, moment.ISO_8601, true).toDate();
      if (isNaN(date.getTime()))
        throw new Error(`Fecha inválida: ${dateString}`);
      return date;
    };

    try {
      const {
        conference: {
          startTime,
          endTime,
          asistentes: { participants },
        },
      } = ctx.request.body;

      // Validaciones iniciales
      if (!Array.isArray(participants) || participants.length === 0) {
        throw new Error("El array de participantes es inválido o está vacío.");
      }
      if (!startTime || !endTime) {
        throw new Error(
          "startTime y endTime son obligatorios y deben ser cadenas."
        );
      }

      const earliestStartTime = parseISODate(startTime);
      const latestEndTime = parseISODate(endTime);

      // Normalizar participantes
      const allParticipants = participants
        .map((p) => {
          if (p.signedinUser && p.signedinUser.displayName) {
            return normalizeName(p.signedinUser.displayName);
          } else if (p.anonymousUser && p.anonymousUser.displayName) {
            return normalizeName(p.anonymousUser.displayName);
          }
          return "";
        })
        .filter(Boolean);

      const allParticipantsIngreso = participants
        .map((p) => parseISODate(p.earliestStartTime))
        .filter(Boolean);

      // Buscar estudiantes en paralelo
      const estudiantesMap = new Map(
        (
          await Promise.all(
            allParticipants.map(async (name) => {
              try {
                const estudiantes =
                  await strapi.controllers.estudiantes.customSearch({
                    query: { nombre_contains: name },
                  });
                return estudiantes.length > 0 ? [name, estudiantes[0]] : null;
              } catch (err) {
                console.error(`Error buscando estudiante: ${name}`, err);
                return null;
              }
            })
          )
        ).filter(Boolean)
      );

      // Buscar la clase
      const clase = await strapi.query("classes").model.findOne({
        Fecha: { $eq: earliestStartTime },
      });
      if (!clase) throw new Error("Clase no encontrada.");

      // Obtener asistencias existentes
      const asistenciasExistentes = await strapi.services[
        "asistencia-cda"
      ].find({
        class: clase.id,
      });
      const asistenciasMap = new Map(
        asistenciasExistentes.map((a) => [a.estudiante.id, a])
      );

      // Procesar asistencias
      const resultados = await Promise.all(
        allParticipants.map(async (name, index) => {
          const estudiante = estudiantesMap.get(name);
          if (!estudiante) return null;

          const asistenciaExistente = asistenciasMap.get(estudiante.id);
          if (asistenciaExistente) {
            // Actualizar asistencia existente
            return await strapi.services["asistencia-cda"].update(
              { id: asistenciaExistente.id },
              {
                hora_salida: moment(
                  moment().format("Y-MM-DD hh:mm:ss"),
                  moment.ISO_8601,
                  true
                ).toDate(),
              }
            );
          } else {
            // Crear nueva asistencia
            return await strapi.services["asistencia-cda"].create({
              class: clase.id,
              estudiante: estudiante.id,
              nombre: estudiante.nombre,
              email: estudiante.email,
              hora_ingreso: allParticipantsIngreso[index],
              hora_salida: latestEndTime,
            });
          }
        })
      );

      return {
        earliestStartTime,
        latestEndTime,
        clase,
        resultados: resultados.filter(Boolean),
        filteredEstudiantes: Array.from(estudiantesMap.values()).map(
          (e) => e.nombre
        ),
      };
    } catch (err) {
      return ctx.badRequest("Error al procesar las asistencias", {
        message: err.message,
        stack: err.stack,
      });
    }
  },
};

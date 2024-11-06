"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

const moment = require("moment");

module.exports = {
  async createMultipleAsistencias(ctx) {
    try {
      const { participants } = ctx.request.body;

      // Filtrar el arreglo de participantes para solo devolver el displayName
      let AllParticipants = participants.map((participant) => {
        let {
          signedinUser: { displayName },
        } = participant;
        return displayName;
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

      // Filtrar estudiantes por nombre
      const filteredEstudiantes = allEstudiantes.filter((estudiante) =>
        AllParticipants.includes(estudiante.nombre)
      );

      let query = { Fecha: { $eq: formatDate } };
      let clase = await strapi.query("classes").model.findOne(query);

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

      return { asistencias, filteredEstudiantes, AllParticipants };
    } catch (err) {
      return ctx.badRequest("Error while creating entries", err.message);
    }
  },
};

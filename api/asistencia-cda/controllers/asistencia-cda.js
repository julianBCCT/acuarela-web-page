"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

const moment = require("moment");

module.exports = {
  async createMultipleAsistencias(ctx) {
    try {
      // Recibir el texto desde el cuerpo de la solicitud
      const { text } = ctx.request.body;

      // Convertir el texto a JSON
      const jsonData = JSON.parse(text);

      // Obtener los participantes desde el JSON convertido
      const { participants } = jsonData;

      // Filtrar el arreglo de participantes para solo devolver el displayName
      let AllParticipants = participants.map((participant) => {
        let {
          signedinUser: { displayName },
        } = participant;
        return displayName;
      });
      // Fecha que trae 1 de lso estudiantes
      let earliestStartTimedateStr = participants.map(
        (participant) => participant.earliestStartTime
      );
      let latestEndTime = participants.map(
        (participant) => participant.latestEndTime
      );

      // Formatear fecha YYYY-MM-DD
      const date = new Date(earliestStartTimedateStr);
      // Ajustar la hora a las 00:00:00
      date.setUTCHours(0, 0, 0, 0);
      // Convertir la fecha a ISO y recortar el tiempo para dejar solo "00:00:00"
      const formattedDate = date.toISOString().split("T")[0] + "T00:00:00";
      let formatDate = moment(formattedDate).format("YYYY-MM-DD");
      // Traer todos los estudiantes
      let allEstudiantes = await strapi.query("estudiantes").model.find();
      // Filtrar estudiantes por Nombre comparando los 2 arreglos allEstudiantes - AllParticipants
      const filteredEstudiantes = allEstudiantes.filter((estudiante) =>
        AllParticipants.some((participant) => participant === estudiante.nombre)
      );
      console.log(formatDate, earliestStartTimedateStr, latestEndTime);
      let query = {};
      query.Fecha = { $eq: formatDate };
      let clase = await strapi.query("classes").model.findOne(query);

      let asistencias = await Promise.all(
        filteredEstudiantes.map(async (estudiante) => {
          let asistencia = await strapi.services["asistencia-cda"].create({
            class: clase.id,
            estudiante: estudiante.id,
            nombre: estudiante.nombre,
            email: estudiante.email,
            hora_ingreso: earliestStartTimedateStr,
            hora_salida: latestEndTime,
          });
          return asistencia;
        })
      );

      return asistencias;
    } catch (err) {
      return ctx.badRequest("Error while creating entries", err.message);
    }
  },
};

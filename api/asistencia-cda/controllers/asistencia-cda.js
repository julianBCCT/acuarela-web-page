"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

const moment = require("moment");

module.exports = {
  async createMultipleAsistencias(ctx) {
    // Recibir datos del BODY
    const { participants } = ctx.request.body;
    // Filtrar el arreglo de participantes para solo devolver el displayName
    let AllParticipants = participants.map((participant) => {
      let {
        signedinUser: { displayName },
      } = participant;
      return displayName;
    });
    // Fecha que trae 1 de lso estudiantes
    let dateStr = participants.map(
      (participant) => participant.earliestStartTime
    );
    // Formatear fecha YYYY-MM-DD
    const date = new Date(dateStr);
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

    return {
      AllParticipants,
      formatDate,
      date,
      allEstudiantes,
      filteredEstudiantes,
    };
  },
};

'use strict';

module.exports = {
  // Ejecutar cada día a la medianoche (cambia según tus necesidades)
  '0 0 * * *': async () => {
    strapi.log.info('Ejecutando Cron Job para procesar pagos');

    try {

    // Step 1: Fetch all entities with optional `status` filter
    const filters = {};
    filters.status = "Finalizado";

    let entities = await strapi.services.inscripciones.find(filters);

    // Step 2: Filter entities manually based on `payment.time`
      const semanal = entities.filter(entity => entity.payment && entity.payment.time === "Semanal");
      const mensual = entities.filter(entity => entity.payment && entity.payment.time === "Mensual");
      const diario = entities.filter(entity => entity.payment && entity.payment.time === "Diario");

      
      // Procesar los registros (ejemplo: loguear cantidades)
      strapi.log.info(`Registros:`, {semanal,mensual, diario});

      // Aquí puedes agregar cualquier lógica adicional que necesites,
      // como enviar recordatorios o actualizaciones de estado.

    } catch (error) {
      strapi.log.error('Error en el Cron Job', error);
    }
  },
};

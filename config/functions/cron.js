'use strict';

module.exports = {
  // Ejecutar cada día a la medianoche (cambia según tus necesidades)
  '* * * * *': async () => {
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
      strapi.log.info(`Registros Semanales: ${semanal.length}`);
      strapi.log.info(`Registros Mensuales: ${mensual.length}`);
      strapi.log.info(`Registros Diarios: ${diario.length}`);

      // Aquí puedes agregar cualquier lógica adicional que necesites,
      // como enviar recordatorios o actualizaciones de estado.

    } catch (error) {
      strapi.log.error('Error en el Cron Job', error);
    }
  },
};

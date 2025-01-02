'use strict';

module.exports = {
  // Ejecutar cada día a la medianoche (cambia según tus necesidades)
  '* * * * *': async () => {
    strapi.log.info('Ejecutando Cron Job para procesar pagos');

    try {
      // Obtener los registros por períodos de pago
      const semanal = await strapi.services.inscripciones.find({
        'payment.time': 'Semanal',
      });

      const mensual = await strapi.services.inscripciones.find({
        'payment.time': 'Mensual',
      });

      const diario = await strapi.services.inscripciones.find({
        'payment.time': 'Diario',
      });

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

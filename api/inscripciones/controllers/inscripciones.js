"use strict";
const { sanitizeEntity } = require("strapi-utils");
const FormData = require('form-data');
/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */
const bcrypt = require("bcryptjs");
const verification = require("../../../middlewares/authJwt");

module.exports = {
  async completeInsc(ctx) {
    const { token } = ctx.request.header;
    const child = ctx.request.body;
    let validToken = await verification.renew(token);
    if (validToken.ok) {
      return ctx.send(
        {
          ok: true,
          status: 200,
          code: 1,
          child,
        },
        200
      );
    } else return ctx.send(validToken);
  },
  async findByPaymentTime(ctx) {
    const { status, 'payment.time': paymentTime } = ctx.query;
  
    const frequencyMap = {
      Diario: 1,
      Semanal: 7,
      Mensual: 30,
    };
  
    const now = new Date();
  
    // Helper functions
    const buildFilters = (status) => {
      const filters = {};
      if (status) filters.status = status;
      return filters;
    };
  
    const sendEmail = async (correo, linkDePago) => {
      const myHeaders = {
        Cookie: "PHPSESSID=bd15560aab91a99b3aaccd6fbcecb91b",
      };
      
      const formdata = new FormData();
      
      formdata.append("email", correo);
      formdata.append("link", linkDePago);
  
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: formdata,
        redirect: "follow",
      };
  
      try {
        const response = await fetch(
          "https://bilingualchildcaretraining.com/s/pendingMovementsEmail/",
          requestOptions
        );
        return response.json();
      } catch (error) {
        console.error("Email sending error:", error);
        return false;
      }
    };
  
    const processEntity = async (entity) => {
      if (entity.child) {
        const childWithMovements = await strapi.services.children.findOne({
          id: entity.child.id,
        });
        entity.child = childWithMovements;
  
        const frequency = frequencyMap[entity.payment.time];
        const lastMovement = await strapi.query("movement").findOne({
          child: entity.child.id,
          _sort: "date:desc",
        });
  
        if (lastMovement) {
          const lastDate = new Date(lastMovement.date);
          const diffDays = Math.floor(
            (now - lastDate) / (1000 * 60 * 60 * 24)
          );
  
          if (diffDays >= frequency) {
            const principalParent = entity.parents.find(
              (parent) => parent.is_principal
            );
            const linkDePago = `https://acuarela.app/paypal/${principalParent.id}/TestMerchantID/${lastMovement.id}`;
            // await sendEmail(principalParent.email, linkDePago);
            await sendEmail("dreinovcorp@gmail.com", linkDePago);
          }
        } else {
          const principalParent = entity.parents.find(
            (parent) => parent.is_principal
          );
          const movementCreated = await strapi.query("movement").create({
            amount: entity.payment.price,
            date: now,
            name: `Primer movimiento para ${entity.child.name}`,
            status: true,
            type: "2",
            child: entity.child.id,
            payer: principalParent.id,
            daycare: entity.daycare.id,
          });
          const linkDePago = `https://acuarela.app/paypal/${principalParent.id}/TestMerchantID/${movementCreated.id}`;
          // await sendEmail(principalParent.email, linkDePago);
          await sendEmail("dreinovcorp@gmail.com", linkDePago);
        }
      }
      return entity;
    };
  
    // Step 1: Fetch and process entities
    const filters = buildFilters(status);
    let entities = await strapi.services.inscripciones.find(filters);
    entities = await Promise.all(entities.map(processEntity));
  
    // Step 2: Filter by payment time if provided
    if (paymentTime) {
      entities = entities.filter(
        (entity) => entity.payment && entity.payment.time === paymentTime
      );
    }
  
    // Step 3: Categorize entities
    const categorizeEntities = (time) =>
      entities.filter(
        (entity) =>
          entity.child &&
          entity.child.movements &&
          entity.payment &&
          entity.payment.time === time
      );
  
    return {
      semanal: categorizeEntities("Semanal").map((entity) => entity.child.movements),
      mensual: categorizeEntities("Mensual").map((entity) => entity.child.movements),
      diario: categorizeEntities("Diario").map((entity) => entity.child.movements),
    };
  },
  async checkAndNotify(ctx) {
      try {
        const filters = {};
        filters.status = "Finalizado";
        // Obtener todas las inscripciones
        const inscriptions = await strapi.query('inscription').find();
  
        const frequencyMap = {
          Diaro: 1,
          Semanal: 7,
          Mensual: 30,
        };
  
        for (const inscription of inscriptions) {
          const frequency = inscription.payment.time; // 'daily', 'weekly', 'monthly'
          const frequencyDays = frequencyMap[frequency];
          const lastMovement = await strapi.query('movements').findOne({
            child: inscription.child.id,
            _sort: 'date:desc',
          });
  
          const now = new Date();
          if (lastMovement) {
            const lastDate = new Date(lastMovement.date);
            const diffDays = Math.floor(
              (now - lastDate) / (1000 * 60 * 60 * 24)
            );
  
            if (diffDays >= frequencyDays) {
              // Tiempo excedido, enviar correo de notificación

            }
          } else {
            // No tiene movimientos registrados, crear el primero en estado pendiente
            await strapi.query('movements').create({
              amount: inscription.payment.price,
              date: now,
              name: `Primer movimiento para ${inscription.child.name}`,
              status: "2", // Estado pendiente
              child: inscription.child.id,
              payer: inscription.parents.find(parent => parent.is_principal).id,
              daycare: inscription.daycare.id,
            });

          }
        }
  
        // ctx.send({ message: 'Verificación y notificaciones completadas.' });
        return inscriptions;
      } catch (error) {
        strapi.log.error('Error en checkAndNotify:', error);
      }
    },
  
};

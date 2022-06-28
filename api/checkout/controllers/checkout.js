'use strict';
const cors = require('cors');
const verification = require('../../../middlewares/authJwt');

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  // Crea un nuevo registro de checkout.
  async create(ctx) {
    const { token } = ctx.request.header;
    const checkout = ctx.request.body;
    if(checkout.token){
      // Valida el token.
      let validToken = await verification.renew(token);
      let bodyToken = await verification.get_data(checkout.token);
      
      if (validToken.ok && bodyToken.ok) {
        // Valida que los datos hayan sido ingresados.
        if (!checkout.children)
          return ctx.send({
            ok: false,
            status: 400,
            code: 5,
            msg: 'The childs id is required.',
          });
        if (!checkout.asistente)
          return ctx.send({
            ok: false,
            status: 400,
            code: 5,
            msg: 'The assistant is required.',
          });
        if (!bodyToken.user.id)
          return ctx.send({
            ok: false,
            status: 400,
            code: 5,
            msg: 'The guardian is required.',
          });
        if (!checkout.datetime)
          return ctx.send({
            ok: false,
            status: 400,
            code: 5,
            msg: 'The check-in datetime is required.',
          });
        else {
          var today = new Date();
          var dd = String(today.getDate()).padStart(2, '0');
          var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
          var yyyy = today.getFullYear();
  
          // Obtiene la fecha actual.
          today = yyyy + '-' + mm + '-' + dd;
  
          let query = {};
          query.datetime = { $gte: today };
          query.children = { $eq: checkout.children };
  
          // Revisa que en el día actual exista un checkin para el niño.
          let entity = await strapi
            .query('checkin')
            .model.find(query);
  
          if (!entity || entity == '')
            return ctx.send({
              ok: false,
              status: 400,
              code: 5,
              msg: 'Something wrong with the check-in.',
            });
          else {
            // Si todos los datos son correctos se crea el registro de salida.
            checkout.acudiente = [bodyToken.user.id];
            await strapi.services.checkout.create(checkout);
  
            //En el registro del niño se marca el atributo indaycare como false.
            const indaycare = false;
            await strapi.services.children.update({ _id: checkout.children }, {indaycare});
  
            return ctx.send({
              ok: true,
              status: 200,
              code: 0,
              msg: 'Check-out successful.',
              user: validToken.user,
              acudiente: bodyToken.user.id
            });
          }
        }
      } else return ctx.send({ ok: false,
        status: 400,
        code: 1,
        msg: 'token errors',validToken,bodyToken});

    }else{
      // Si todos los datos son correctos se crea el registro de ingreso.
      await strapi.services.checkout.create(checkout);

      //En el registro del niño se marca el atributo indaycare como true.
      const indaycare = false;
      await strapi.services.children.update(
        { _id: checkin.children },
        { indaycare }
      );

      return ctx.send({
        ok: true,
        status: 200,
        code: 0,
        msg: 'Check-in successful.',
        user: validToken.user,
      });
    }
  },

  // Retorna todos los checkin realizados el día actual.
  async find_today(ctx) {
    const { token } = ctx.request.header;

    let validToken = await verification.renew(token);

    if (validToken.ok) {
      var today = new Date();
      var dd = String(today.getDate()).padStart(2, '0');
      var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
      var yyyy = today.getFullYear();

      // Obtiene la fecha actual.
      today = yyyy + '-' + mm + '-' + dd;

      let query = {};
      query.datetime = { $gte: today };

      // Realiza la consulta y pobla los datos.
      let entity = await strapi
        .query('checkout')
        .model.find(query)
        .populate('children', ['name', 'id', 'photo'])
        .populate('childminder', ['name', 'id'])
        .populate('guardian', ['name', 'id']);
    
      validToken.msg = 'Query completed successfully!';
      validToken.response = entity;
      return ctx.send(validToken);

    } else return ctx.send(validToken);
  }
};

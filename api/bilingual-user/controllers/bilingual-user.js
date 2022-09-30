'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {

    async create(){
        let user = ctx.request.body;
        let entity;
        entity = await strapi.services.bilingual_users.findOne({email: user.email});
        if (!entity || entity == []) {
            entity = await strapi.services.bilingual_users.create(user);
        }else {
            let msg = 'Ya existe un usuario registrado con este correo';
            let code = 'e-2';
            return ctx.send({ ok: false, status: 400, code, msg });
        }
        return ctx.send({ respuesta });
    }
};

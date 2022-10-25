'use strict';
const bcrypt = require('bcryptjs');
/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {

    async create(ctx){
        let user = ctx.request.body;
        let entity;
        entity = await strapi.services["bilingual-user"].findOne({email: user.email});
        if (!entity || entity == []) {
            const hashedPassword = await bcrypt.hash(user.password, 10);
            user.password = hashedPassword;
            entity = await strapi.services["bilingual-user"].create(user);
            return ctx.send({ ok: true, status: 200, entity });
        }else {
            let msg = 'Ya existe un usuario registrado con este correo';
            let code = 'e-2';
            return ctx.send({ ok: false, status: 400, code, msg });
        }
    },
    async login(ctx) {
        const { email, password } = ctx.request.body;
        let entity;
        entity = await strapi.services["bilingual-user"].findOne({ email });
        if (entity) {
            let result = await bcrypt.compare(password, entity.password);
            if (result) {return ctx.send(await verification.generate_token(entity));}
           else{
                return ctx.send({ ok: false, status: 400, msg:"El correo o la contraseña no son correctas." });

            }
        }else {
            return ctx.send({ ok: false, status: 400, msg:"No se encontro un usuario registrado con este correo." });
        }

      },
};

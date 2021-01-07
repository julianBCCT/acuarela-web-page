'use strict';
const { parseMultipartData, sanitizeEntity } = require('strapi-utils');
const cors =  require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const verification = require("../../../middlewares/authJwt");

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async login(ctx) {
    const {mail, pass} = ctx.request.body;
    let entity = await strapi.services.acuarelauser.findOne({ mail });
    let result = await bcrypt.compare(pass, entity.password);
    if (result) {
        const token = jwt.sign({id: entity._id}, process.env.SECRET, {
            expiresIn: 259200 // tres dias
        });
        ctx.body = {mail:entity.mail, id:entity._id};
        ctx.send({token});
    } else {
        ctx.status = 400;
        ctx.body = {status:"Credenciales Erróneas."};
    }
  },
  async invitation(ctx) {
    const { mail, token } = ctx.request.body;

    const { message, result, status} = await verification.verifyJwt(token);

    if (!result) {
        ctx.status = status;
        ctx.body = {status: message};
    } else {
        let entity = await strapi.services.acuarelauser.findOne({ mail });
        if (entity) {
            ctx.status = 400;
            ctx.body = {status:"User Already Exists"};
        }
        else {
            entity = await strapi.services.acuarelauser.create({mail:mail});
            ctx.body = {status: "Invitation Created"};
        }
    }
  },
  async register(ctx) {
    const { mail, pass } = ctx.request.body;

    let entity = await strapi.services.acuarelauser.findOne({ mail });
    if (entity) {
        ctx.status = 400;
        ctx.body = {status:"User Already Exists"};
    }
    if (!entity) {
        const hashedPassword = await bcrypt.hash(pass, 10);

        entity = await strapi.services.acuarelauser.create( {mail:mail, password:hashedPassword });
        const token = jwt.sign({id: entity._id}, process.env.SECRET, {
            expiresIn: 259200 // tres dias
        });
        ctx.send({token});
        ctx.body = {status: "User Created", mail:entity.mail, id:entity._id};
    }
  },
  async invitationregister(ctx) {
    const { mail, pass, token } = ctx.request.body;

    const { message, result, status} = await verification.verifyJwt(token);

    if (!result) {
        ctx.status = status;
        ctx.body = {status: message};
    } else {
        let entity = await strapi.services.acuarelauser.findOne({ mail });
        if (!entity) {
            ctx.status = 400;
            ctx.body = {status:"Invalid Invitation"};
        }
        if (entity) {
            const hashedPassword = await bcrypt.hash(pass, 10);
            entity.password = hashedPassword;
            let entity_id = entity._id;
            entity = await strapi.services.acuarelauser.update( { _id:entity_id }, entity);
            const token = jwt.sign({id: entity._id}, process.env.SECRET, {
                expiresIn: 259200 // tres dias
            });
            ctx.send({token});
            ctx.body = {status: "User Created", mail:entity.mail, id:entity_id};
        }
    }
  },
};

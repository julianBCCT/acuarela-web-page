const jwt = require("jsonwebtoken");

async function verify_code(token, code) {
    if (!token) return { ok: false, status: 403, code:3, msg: "No token provided." };

    try {
        const { hashedcode } = await jwt.verify(token, process.env.SECRET);
        let newcode = "c" + code;
        let result = await bcrypt.compare(newcode, hashedcode);
        if (result) return { ok: true, status: 200, code: 0, msg: "Correct code." };
        else return {ok: false, status: 400, code: 4, msg: "Wrong code."};
    } catch (error) {
        return { ok: false, status: 401, code: 3, msg: "Invalid Token!" };
    }
}

async function renew(token) {
    if (!token) return {ok: false, status: 403, code: 3, msg: "No token provided."};

    try {
        const decoded = await jwt.verify(token, process.env.SECRET);

        const entity = await strapi.services.acuarelauser.findOne({ _id: decoded.id });
        if (!entity) return {ok: false, status: 404, code: 3, msg: "No user found."};
        
        let respuesta = await generate_token(entity);
        respuesta.msg = "Valid Token."
        return respuesta;
    } catch (error) {
        return {ok: false, status: 401, code: 3, msg: "Invalid Token!" };
    }
}

async function generate_token(entity) {
    let phone = "-1";
    let mail = "-1";
    if (entity.phone) phone = entity.phone;


    if (entity.mail) mail = entity.mail;

    let err, token = await jwt.sign(
        { mail, id: entity._id, name: entity.name, phone },
        process.env.SECRET, {
          expiresIn: "3d", // tres dias
        });

    if (err) return { ok: false, status: 400, code: 2, msg: "The token could not be generated.", user: {} };

    let user = { mail, id: entity._id, name: entity.name, phone, token };

    return { ok: true, status: 200, code: 0, msg: "User Logged.", user };
}

async function new_token(some) {
    let err, token = await jwt.sign(
        some,
        process.env.SECRET, {
          expiresIn: "1h", // tres dias
        });

    if (err) return { ok: false, status: 400, code: 2, msg: "The token could not be generated.", user: {} };

    return { ok: true, status: 200, code: 0, msg: "User Logged.", token };
}

async function get_data(token) {
    if (!token) return {ok: false, status: 403, code: 3, msg: "No token provided."};

    try {
        const {mail, phone} = jwt.verify(token, process.env.SECRET);

        let entity;
        if (mail != '-1') entity = await strapi.services.acuarelauser.findOne({ mail });
        else entity = await strapi.services.acuarelauser.findOne({ phone });
        
        if (!entity) return {ok: false, status: 404, code: 3, msg: "No user found."};
        
        let id = entity._id;
        let user = { id, mail, phone };
        return { ok: true, status: 200, code: 0, msg: "Succesfully.", user };
    } catch (error) {
        return {ok: false, status: 401, code: 3, msg: "Invalid Token!" };
    }
}

module.exports = {
    verify_code: verify_code,
    renew: renew,
    generate_token: generate_token,
    get_data: get_data,
    new_token: new_token
}
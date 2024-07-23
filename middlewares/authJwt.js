const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Revisa si un código introducido por el usuario corresponde al cifrado dentro del token.
async function verify_code(token, code) {
  if (!token)
    return { ok: false, status: 403, code: 3, msg: "No token provided." };

  try {
    const { hashedcode } = await jwt.verify(token, process.env.SECRET);
    // Por restricción de Bcrypt del codigo debe tener almenos una letra ('c') y numeros ('code').
    if (await bcrypt.compare("c" + code, hashedcode))
      return { ok: true, status: 200, code: 0, msg: "Correct code." };
    else return { ok: false, status: 400, code: 4, msg: "Wrong code." };
  } catch (error) {
    return { ok: false, status: 401, code: 3, msg: "Invalid Token!" };
  }
}

// Al realizarse una petición REST se verifica eñ token enviado y de ser correcto se renueva
async function renew(token) {
  if (!token)
    return { ok: false, status: 403, code: 3, msg: "No token provided." };

  try {
    const decoded = await jwt.verify(token, process.env.SECRET);

    const entity = await strapi.services["bilingual-user"].findOne({
      _id: decoded.id,
    });
    if (!entity) {
      const entityAcuarelaUser = await strapi.services.acuarelauser.findOne({
        _id: decoded.id,
      });
      if (!entityAcuarelaUser) {
        return { ok: false, status: 404, code: 3, msg: "No user found." };
      } else {
        let respuesta = await generate_token(entityAcuarelaUser);
        respuesta.msg = "Valid Token.";
        return respuesta;
      }
    } else {
      let respuesta = await generate_token(entity);
      respuesta.msg = "Valid Token.";
      return respuesta;
    }
  } catch (error) {
    return { ok: false, status: 401, code: 3, msg: "Invalid Token!" };
  }
}

// Se encarga de generar un token con el número de telefono o con el correo con una expiración de dos días.
async function generate_token(entity) {
  let phone = "-1";
  if (entity.phone) phone = entity.phone;
  let email = "-1";
  if (entity.email) email = entity.email;

  let err,
    token = await jwt.sign(
      { email, id: entity._id, name: entity.name, phone },
      process.env.SECRET,
      {
        expiresIn: "3d", // tres dias
      }
    );

  if (err)
    return {
      ok: false,
      status: 400,
      code: 2,
      msg: "The token could not be generated.",
      user: {},
    };

  let user;

  if (entity.acuarelauser) {
    user = {
      email,
      id: entity.acuarelauser.id,
      name: entity.name,
      phone,
      token,
      rols: entity.acuarelauser.rols,
      organization: entity.acuarelauser.daycare,
      wizard_steps: entity.acuarelauser.wizard_steps,
      bilingual_user: entity.id,
    };
  } else {
    user = {
      email,
      id: entity.id,
      name: entity.name,
      phone,
      token,
      rols: entity.rols,
      organization: entity.daycare,
      wizard_steps: entity.wizard_steps,
      bilingual_user: entity.bilingual_user ? entity.bilingual_user.id : 0,
    };
  }

  return { ok: true, status: 200, code: 0, msg: "User Logged.", user };
}

// Se encarga de generar un token con la información contenida en some con una expiración de una hora.
async function new_token(some) {
  let err,
    token = await jwt.sign(some, process.env.SECRET, {
      expiresIn: "1h", // tres dias
    });

  if (err)
    return {
      ok: false,
      status: 400,
      code: 2,
      msg: "The token could not be generated.",
      user: {},
    };

  return { ok: true, status: 200, code: 0, msg: "User Logged.", token };
}

// Obtiene y valida la información del token.
async function get_data(token) {
  if (!token)
    return { ok: false, status: 403, code: 3, msg: "No token provided." };

  try {
    const { mail, email, phone } = await jwt.verify(token, process.env.SECRET);
    let query = {};

    if ((email != "-1" && email) || (mail != "-1" && mail)) {
      query.mail = { $eq: mail };
    } else {
      query.phone = { $eq: phone };
    }

    const entity = await strapi.query("bilingual-user").model.findOne(query);

    if (!entity) {
      const entityUser = await strapi
        .query("acuarelauser")
        .model.findOne(query);
      if (!entityUser) {
        return { ok: false, status: 404, code: 3, msg: "No user found." };
      } else {
        let id = entityUser.id;
        let user = { id, mail, phone };
        return { ok: true, status: 200, code: 0, msg: "Succesfully.", user };
      }
    } else {
      let id = entity.id;
      let user = { id, mail, phone };
      return { ok: true, status: 200, code: 0, msg: "Succesfully.", user };
    }
  } catch (error) {
    return { ok: false, status: 401, code: 3, msg: "Invalid Token!" };
  }
}

module.exports = {
  verify_code: verify_code,
  renew: renew,
  generate_token: generate_token,
  get_data: get_data,
  new_token: new_token,
};

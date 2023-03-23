module.exports = async (ctx, next) => {
  // Permite verificar que el usuario que realiza la consulta este loggeado
  const verification = require("../../middlewares/authJwt");

  let { token } = ctx.request.header;
  let validToken = await verification.renew(token);

  if (validToken.ok) {
    // Go to next policy or will reach the controller's action.
    ctx.request.body.response = validToken;
    return await next();
  } else return ctx.unauthorized(validToken);

  //ctx.unauthorized('You\'re not logged in!');
};

module.exports = async (ctx, next) => {
  const verification = require('../../middlewares/authJwt');
  if (ctx.request.header.token) {
    // Go to next policy or will reach the controller's action.
    //ctx.send('Holaaaaaaa');
    let validToken = await verification.renew(ctx.request.header.token);
    ctx.response = validToken;
    return await next();
  }

  ctx.unauthorized('You\'re not logged in!');
};
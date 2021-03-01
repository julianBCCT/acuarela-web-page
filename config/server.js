require('events').EventEmitter.defaultMaxListeners = 20;

module.exports = ({ env }) => ({
  host: env('HOST', 'localhost'),
  port: env.int('PORT', 1337),
  url: 'http://localhost:1337/',
  admin: {
    auth: {
      url: 'http://localhost:1337/dashboard',
      secret: env('ADMIN_JWT_SECRET', '06b77711f7a956f6477095a04d7034de'),
    },
  },
});

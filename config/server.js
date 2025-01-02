require('events').EventEmitter.defaultMaxListeners = 20;

module.exports = ({ env }) => ({
  host: env('HOST', 'localhost'),
  port: env.int('PORT', 1337),
  url: env('API'),
  cron: {
    enabled: true,
  },
  admin: {
    auth: {
      secret: env('ADMIN_JWT_SECRET', '06b77711f7a956f6477095a04d7034de'),
    },
  },
});
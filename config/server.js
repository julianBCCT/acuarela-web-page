module.exports = ({ env }) => ({
  host: env("HOST", "0.0.0.0"),
  port: env.int("PORT", 1337),
  url: "http://198.211.114.51/api",
  admin: {
    auth: {
      url: "http://198.211.114.51/dashboard",
      secret: env("ADMIN_JWT_SECRET", "06b77711f7a956f6477095a04d7034de"),
    },
  },
});

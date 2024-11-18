module.exports = {
  routes: [
    {
      method: "GET",
      path: "/pass/:modelName",
      handler: "pass.generate",
      config: {
        auth: false, // Cambia esto si necesitas autenticación
      },
    },
  ],
};

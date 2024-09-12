"use strict";

/**
 * An asynchronous bootstrap function that runs before
 * your application gets started.
 *
 * This gives you an opportunity to set up your data model,
 * run jobs, or perform some special logic.
 *
 * See more details here: https://strapi.io/documentation/v3.x/concepts/configurations.html#bootstrap
 */

module.exports = () => {
  const io = require("socket.io")(strapi.server, {
    cors: {
      origin: [
        "http://localhost:3000",
        "http://localhost:1337",
        "http://localhost:5500",
        "http://localhost:5501",
        "http://127.0.0.1:5501",
        "http://127.0.0.1:5500",
        "http://198.211.114.51",
        "chrome-extension://fhbjgbiflinjbdggehcddcbncdddomop",
        "https://acuarelacore.com",
        "https://acuarela.app",
        "http://acuarela.app",
        "https://acuarelacore.com/api/movements/62d1d62c2d088187dac74153",
        "https://bilingualchildcaretraining.com",
        "https://dev.bilingualchildcaretraining.com",
      ],
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  // Lógica cuando un cliente se conecta
  io.on("connection", (socket) => {
    console.log("A user connected");

    // El cliente se une a una sala privada
    socket.on("joinRoom", ({ roomId, user }) => {
      socket.join(roomId);
      console.log(`${user} joined room: ${roomId}`);
    });

    // El cliente envía un mensaje dentro de la sala privada
    socket.on("sendMessage", async ({ roomId, text, user }) => {
      // Guardar el mensaje en la base de datos de Strapi

      // Emitir el mensaje solo a la sala correspondiente
      io.to(roomId).emit("receiveMessage", text);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });

  // Hacer `io` accesible en Strapi si es necesario
  strapi.io = io;

  strapi.io = io;
};

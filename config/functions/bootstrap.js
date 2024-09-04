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

  io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    // El usuario se une a su sala privada basada en su ID
    socket.on("join", ({ username, userId }) => {
      const privateRoom = `private-${userId}`;
      socket.join(privateRoom);

      socket.emit("joined", {
        message: `Welcome ${username} to your private chat.`,
        socketId: socket.id,
      });

      console.log(`${username} joined room: ${privateRoom}`);
    });
    socket.on("sendMessage", async (data) => {
      try {
        let strapiData = {
          content: data.message,
          sender: data.userId,
          receiver: data.toUserId,
          timestamp: new Date(),
          isRead: false, // Inicialmente marcado como no leído
          room: `private-${data.userId}`, // Opcional, si usas salas
        };

        // Guardar el mensaje en Strapi
        const message = await strapi.services.chats.create(strapiData);

        // Emitir el mensaje solo al destinatario específico
        io.to(`private-${data.toUserId}`).emit("message", {
          messageId: message.id, // ID del mensaje para facilitar la actualización
          user: data.username,
          text: data.message,
        });
      } catch (error) {
        console.error("Error sending message:", error);
      }
    });

    // Marcar un mensaje como leído
    socket.on("messageRead", async ({ messageId }) => {
      try {
        // Actualizar el estado isRead del mensaje en Strapi
        await strapi.services.chats.update(
          { id: messageId },
          { isRead: true }
        );

        console.log(`Message ${messageId} marked as read.`);
      } catch (error) {
        console.error("Error marking message as read:", error);
      }
    });

    socket.on("disconnect", () => {
      console.log(`User disconnected: ${socket.id}`);
    });
  });

  strapi.io = io;
};

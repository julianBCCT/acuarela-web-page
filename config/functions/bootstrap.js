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
  // Función para generar el nombre de la sala basado en los dos IDs
  function getRoomName(user1, user2) {
    // Ordenar IDs para que el nombre de la sala sea consistente
    return [user1, user2].sort().join("-");
  }
  io.on("connection", async (socket) => {
    const userId = socket.handshake.auth.userId;

    if (!userId) {
      console.error("UserId not provided");
      socket.disconnect();
      return;
    }

    // Buscar el usuario y aplicar la lógica
    const acuarelaUser = await strapi.services.acuarelauser.findOne({
      id: userId,
    });

    if (acuarelaUser && acuarelaUser.socketId) {
      console.log(`User already has a socketId: ${acuarelaUser.socketId}`);
      socket.id = acuarelaUser.socketId;
    } else {
      console.log(`Assigning new socketId: ${socket.id}`);
      await strapi.services.acuarelauser.update(
        { id: userId },
        { socketId: socket.id }
      );
    }

    console.log(`User connected with socketId: ${socket.id}`);

    socket.on("joinRoom", ({ senderId, receiverId }) => {
      const roomName = getRoomName(senderId, receiverId);
      socket.join(roomName);
      socket.emit("joined", {
        message: `Welcome ${senderId} to your private chat.`,
        socketId: socket.id,
        roomName: roomName,
      });
    });

    // Escuchar mensajes privados
    socket.on("privateMessage", async ({ senderId, receiverId, message }) => {
      try {
        const roomName = getRoomName(senderId, receiverId);
        let strapiData = {
          content: message,
          sender: senderId,
          receiver: receiverId,
          timestamp: new Date(),
          isRead: false,
          room: roomName,
        };
        // Guardar el mensaje en Strapi
        const messageStrapi = await strapi.services.chats.create(strapiData);

        io.to(roomName).emit("privateMessage", {
          senderId,
          message,
          messageId: messageStrapi.id,
          receiverId,
        });
      } catch (error) {
        console.error("Error sending message:", error);
      }
    });

    // Marcar un mensaje como leído
    socket.on("messageRead", async ({ messageId }) => {
      try {
        // Actualizar el estado isRead del mensaje en Strapi
        await strapi.services.chats.update({ id: messageId }, { isRead: true });

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

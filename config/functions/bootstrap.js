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

  function getRoomName(user1, user2) {
    return [user1, user2].sort().join("-");
  }

  io.on("connection", async (socket) => {
    const userId = socket.handshake.auth.userId;

    if (!userId) {
      console.error("UserId not provided");
      socket.disconnect();
      return;
    }

    try {
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
        console.log(`Socket connected: ${socket.connected}`);

        if (!senderId || !receiverId) {
          socket.emit("error", { message: "Invalid senderId or receiverId." });
          return;
        }

        const roomName = getRoomName(senderId, receiverId);

        socket.join(roomName);
        socket.emit("joined", {
          message: `Welcome ${senderId} to your private chat.`,
          socketId: socket.id,
          roomName: roomName,
        });
      });

      socket.on("sendMessage", async (data) => {
        try {
          let strapiData = {
            content: data.message,
            sender: data.userId,
            receiver: data.toUserId,
            timestamp: new Date(),
            isRead: false, // Inicialmente marcado como no leído
            room: roomName, // Opcional, si usas salas
          };
  
          // Guardar el mensaje en Strapi
          const message = await strapi.services.chats.create(strapiData);
  
          // Emitir el mensaje solo al destinatario específico
          io.to(`${roomName}`).emit("message", {
            messageId: message.id, // ID del mensaje para facilitar la actualización
            user: data.toUserId,
            text: data.message,
          });
        } catch (error) {
          console.error("Error sending message:", error);
        }
      });

      socket.on("privateMessage", ({ senderId, receiverId, message }) => {
          const roomName = getRoomName(senderId, receiverId);
          socket.to(roomName).emit("message", {senderId, receiverId, message});
      });

      socket.on("messageRead", async ({ messageId }) => {
        try {
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
    } catch (error) {
      console.error("Error during socket connection:", error);
      socket.disconnect();
    }
  });

  strapi.io = io;
};

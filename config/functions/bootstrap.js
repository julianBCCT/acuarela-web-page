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
    console.log(socket.id);

    // El cliente se une a una sala privada
    socket.on("joinRoom", ({ roomId, user }) => {
      socket.join(roomId);
    });

    // El cliente envía un mensaje dentro de la sala privada
    socket.on(
      "sendMessage",
      async ({ roomId, text, senderId, receiverId, user }) => {
        // Obtener la fecha actual y formatear el mes (YYYY-MM)
        const currentMonth = new Date().toISOString().slice(0, 7); // Obtiene 'YYYY-MM'

        // Buscar el chat correspondiente a la sala
        let chat = await strapi.services.chats.findOne({ room: roomId });

        // Si no existe, crearlo
        if (!chat) {
          chat = await strapi.services.chats.create({
            sender: senderId,
            receiver: receiverId,
            isRead: false,
            room: roomId,
            messages: {},
          });
        }

        // Crear el nuevo mensaje
        const newMessage = {
          roomId,
          content: text,
          sender: senderId,
          receiver: receiverId,
          isRead: false,
          room: roomId,
          timestamp: new Date(),
          user,
        };

        // Verificar si existe el mes actual en el chat, si no, inicializarlo
        if (!chat.messages[currentMonth]) {
          chat.messages[currentMonth] = [];
        }

        // Agregar el nuevo mensaje al array del mes actual
        chat.messages[currentMonth].push(newMessage);

        // Actualizar la base de datos con el nuevo array de mensajes para ese mes
        await strapi.services.chats.update(
          { id: chat.id },
          {
            messages: chat.messages,
            sender: senderId,
            receiver: receiverId,
          }
        );

        // Emitir el mensaje solo a la sala correspondiente
        io.to(roomId).emit("receiveMessage", newMessage);
        // Notificar al destinatario
        io.to(user.receiver).emit("newMessageNotification", {
          message: newMessage,
          roomId,
          sender: user,
        });
      }
    );
    socket.on("newMessageNotification", (data) => {
      const { message, roomId, sender } = data;
      // Mostrar notificación, por ejemplo en un badge de notificaciones
      showNotification(`Nuevo mensaje de ${sender}: ${message.content}`);
    });
    socket.on("getMessagesByMonth", async ({ roomId, month }) => {
      // Buscar el chat de la sala
      const chat = await strapi.services.chats.findOne({ room: roomId });

      // Obtener los mensajes del mes solicitado
      const messages = chat.messages[month] || [];

      // Devolver los mensajes al cliente
      socket.emit("receiveMessagesByMonth", messages);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });

  strapi.io = io;
};

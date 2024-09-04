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
    socket.on("join", ({ username, room }) => {
      // Emit an acknowledgment back to the client
      socket.emit("joined", {
        message: `Welcome ${username} to room ${room}`,
        socketId: socket.id,
      });
      if (username) {
        socket.join("group"); // Adding the user to the group
        console.log(socket.rooms);
        socket.emit("welcome", { // Sending a welcome message to the User
          user: "bot",
          text: `${username}, Welcome to the group chat`,
          userData: username,
        });
      } else {
        console.log("An error occurred");
      }
    });

    socket.on("sendMessage", async (data) => {
      let strapiData = {
        user: data.user,
        message: data.message,
      };
      await strapi.services.chats.create(strapiData);
      socket.broadcast.to("group").emit("message", {
        user: data.username,
        text: data.message,
      });
    });

    socket.on("disconnect", () => {
      console.log("User disconnected", socket.id);
    });
  });

  strapi.io = io; // Make it available globally if needed
};

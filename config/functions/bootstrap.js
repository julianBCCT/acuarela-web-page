'use strict';

/**
 * An asynchronous bootstrap function that runs before
 * your application gets started.
 *
 * This gives you an opportunity to set up your data model,
 * run jobs, or perform some special logic.
 *
 * See more details here: https://strapi.io/documentation/v3.x/concepts/configurations.html#bootstrap
 */

module.exports =  () => {
  const io = require('socket.io')(strapi.server, {
      cors: {
          origin: [
              "http://localhost:3000",
              "http://localhost:1337",
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
          credentials: true
      }
  });

  io.on('connection', (socket) => {
      console.log('A user connected', socket.id);
      
      socket.on('join', ({ username, room }) => {
          console.log("user connected");
          console.log("username is ", username);
          console.log("room is...", room);
          // Emit an acknowledgment back to the client
          socket.emit('joined', { message: `Welcome ${username} to room ${room}`, socketId: socket.id });
      });

      socket.on('disconnect', () => {
          console.log('User disconnected', socket.id);
      });
  });

  strapi.io = io; // Make it available globally if needed
};


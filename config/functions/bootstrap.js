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

module.exports = () => {
    var io = require('socket.io')(strapi.server, {
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
    io.on('connection', function(socket) {
          socket.on('join', ({ username, room }) => {
              console.log("user connected");
              console.log("username is ", username);
              console.log("room is...", room)
          })
      });
};

const cors = require('cors');
require('dotenv').config();

module.exports = {
  //...
  settings: {
    cors: {
      origin: [],
      credentials: true,
    },
  },
};
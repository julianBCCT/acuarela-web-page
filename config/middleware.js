const cors = require('cors');
require('dotenv').config();

module.exports = {
  //...
  settings: {
    cors: {
      origin: [
        'http://localhost:3000',
        'http://localhost:1337',
        'http://198.211.114.51',
        'chrome-extension://fhbjgbiflinjbdggehcddcbncdddomop',
        'https://acuarelacore.com',
      ],
      credentials: true,
    },
    parser: {
      enabled: true,
      multipart: true
    }
  },
};

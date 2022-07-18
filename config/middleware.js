const cors = require("cors");
require("dotenv").config();

module.exports = {
  //...
  settings: {
    cors: {
      origin: [
        "http://localhost:3000",
        "http://localhost:1337",
        "http://198.211.114.51",
        "chrome-extension://fhbjgbiflinjbdggehcddcbncdddomop",
        "https://acuarelacore.com",
        "https://acuarela.app",
        "http://acuarela.app",
        "acuarela.app",
        "https://acuarelacore.com/api/movements/62d1d62c2db88187dac74153",
      ],
      credentials: true,
    },
    parser: {
      enabled: true,
      multipart: true,
      formLimit: "100mb", // modify here limit of the form body
      jsonLimit: "100mb", // modify here limit of the JSON body
      formidable: {
        maxFileSize: 2000 * 1024 * 1024, // multipart data, modify here limit of uploaded file size
      },
    },
  },
};

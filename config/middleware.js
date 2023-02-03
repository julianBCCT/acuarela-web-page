const cors = require("cors");
require("dotenv").config();

module.exports = {
  //...
  settings: {
    cors: {
      origin: "*"
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

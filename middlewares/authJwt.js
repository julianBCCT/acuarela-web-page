const jwt = require("jsonwebtoken");

function verifyJwt(token) {
    if (!token) return {status: 403, message: "No token provided", result:false};

    try {
        const decoded = jwt.verify(token, process.env.SECRET);

        const user = strapi.services.acuarelauser.findOne({ _id: decoded.id });
        if (!user) return {status: 404, message: "No user found", result:false};
        
        return {status: 200, message: "Valid Token", result:true};
    } catch (error) {
        return {status: 401, message: "Unauthorized!", result:false };
    }
}

module.exports = {
    verifyJwt: verifyJwt
}
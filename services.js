var jwt = require('jwt-simple');
var moment = require('moment');
var config = require('./config');

exports.createToken = function(user) {
    console.log(user.mail);
    var payload = {
        mail: user.mail,
        name: user.name,
        iat: moment().unix(),
        exp: moment().add(14, "days").unix(),
    };
    return jwt.encode(payload, config.TOKEN_SECRET);
};



//Middleware para comprobar si la cabecera de la peticion http tiene el token

exports.ensureAuthenticated = function(req, res) {
    try {
        var payload = jwt.decode(req, config.TOKEN_SECRET);
        if(payload.exp <= moment().unix()) {
            return res = {status: "Error"};
         }
         else return res = {status: payload.mail};
    } catch (error) {
        return res = {status: "Error"};
    }
   
  }
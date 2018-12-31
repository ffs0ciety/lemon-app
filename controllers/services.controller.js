const Usuarios = require('../models/usuarios');
const service = require('../services');
const servicesCtrl = {};

servicesCtrl.validarToken = async (req, res) => {

    // console.log(req);
    if(req.body.token){
        var respuesta = service.ensureAuthenticated(req.body.token);
        res.json(respuesta);
    }
    else res.json("empty");
 
}


module.exports = servicesCtrl;
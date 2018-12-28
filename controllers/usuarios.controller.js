const Usuarios = require('../models/usuarios');

const usuariosCtrl = {};

usuariosCtrl.validateUsuario = async (req, res) => {
    const usuarios = {
        mail: req.body.mail,
        name: req.body.name,
        password: req.body.password
    }
    const resultado = await Usuario.find({mail:usuarios.mail, password:usuarios.password});
    console.log(resultado);
    
    if(resultado.length == 0){
        res.json({'status':'false'})
    }
    else res.json(resultado)
    
}

usuariosCtrl.getUsuarios = async (req, res) => {
    const usuarios = await Usuarios.find();
    res.json(usuarios);
}

usuariosCtrl.createUsuario = async (req, res) => {
    const usuarios = new Usuarios(req.body);
    await usuarios.save();
    res.json({'status': 'Usuario Saved'});
}


usuariosCtrl.getUsuario = async (req, res) => {
    const usuarios = await Usuarios.findById(req.params.id);
    res.json(usuarios);
}

usuariosCtrl.editUsuario =  async (req, res) => {
    const usuarios = {
        mail: req.body.mail,
        name: req.body.name,
        password: req.body.password
    }
    await Usuarios.findByIdAndUpdate(req.params.id, {$set: usuarios}, {new: true});
    
    res.json({'status': 'Usuario Update'});
}

usuariosCtrl.deleteUsuario = async (req, res) => {
    await Usuarios.findByIdAndRemove(req.params.id);
    res.json({'status': 'Usuario Removed'});
}
module.exports = usuariosCtrl;
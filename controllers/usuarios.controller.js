const Usuarios = require('../models/usuarios');

const usuariosCtrl = {};

usuariosCtrl.validateUsuario = async (req, res) => {
    const usuario = new Usuarios(req.body);
    const mail = await Usuarios.find({$and:[{mail:usuario.mail},{password:usuario.password}]});
    const name = await Usuarios.find({$and:[{name:usuario.name},{password:usuario.password}]});
    console.log(req.body);
    if((mail.length != 0 || name.length != 0)){
        
        res.json("Loggeado con éxito");
    }
    else res.json("Usuario o contraseña incorrecto");
}

usuariosCtrl.getUsuarios = async (req, res) => {
    const usuarios = await Usuarios.find();
    res.json(usuarios);
}

usuariosCtrl.createUsuario = async (req, res) => {
    
    const usuario = new Usuarios(req.body);
    const mail = await Usuarios.find({mail:usuario.mail});
    const name = await Usuarios.find({name:usuario.name});
    
    if((mail.length || name.length) == 0 ){
        await usuario.save();
        res.json({'status': 'Usuario registrado con exito!'});
    }
    else res.json({'status': 'Usuario ya registrado'});
    
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
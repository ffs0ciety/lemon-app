const Usuarios = require('../models/usuarios');
const service = require('../services');

const usuariosCtrl = {};

usuariosCtrl.validateUsuario = async (req, res) => {
    const usuario = new Usuarios(req.body);
    const mail = await Usuarios.find({$and:[{mail:usuario.mail},{password:usuario.password}]});
    // const name = await Usuarios.find({$and:[{name:usuario.name},{password:usuario.password}]});
    
    if(mail.length != 0){
        res.send({token: service.createToken(mail[0])});
    }
    else res.send({token:""});
}

usuariosCtrl.getUsuarios = async (req, res) => {
    const usuarios = await Usuarios.find();
    res.json(usuarios);
}

usuariosCtrl.getUsuarioPublic = async (req, res) => {
    const usuario = new Usuarios(req.body);
    //COMPROBAMOS QUE LOS DATOS DEL TOKEN COINCIDAN CON EL BODY
    if(req.user.mail == usuario.mail){
       const salida = await Usuarios.find({mail:usuario.mail},{password:0});
       res.json(salida);
    }
    else {
        const salida = {status:"Token error"}
        res.json(salida);
    };

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
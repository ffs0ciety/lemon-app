const ListaLocal = require('../models/listaLocal');
const Usuarios = require('../models/usuarios');

const listaLocalCtrl = {};

listaLocalCtrl.getListaLocal = async (req, res) => {
    const listaLocal = await ListaLocal.find();
    res.json(listaLocal);
}

listaLocalCtrl.addListaLocal = async (req, res) => {
    if(!req.body.userName){
        res.json({'status': 'Es necesario estar registrado en la página'});
    }
    else {
        const listaLocal = new ListaLocal( {
            salaName: req.body.salaName,
            salaId: req.body.salaId,
            fecha: req.body.fecha,
            userName: req.body.userName,
            userId: req.body.userId,
            userMail: req.body.userMail,
            age: req.body.age
        })
        await listaLocal.save();

        res.json({'status': 'Has sido añadido a la lista!'});
    }
   
}

listaLocalCtrl.validarUsuario = async (req, res) => {
    console.log(req.body);
    await ListaLocal.findByIdAndUpdate(req.body._id, {haEntrado: true});
    res.json({'status':'Usuario validado'});
}

listaLocalCtrl.getListaLocalId = async (req, res) => {
    const usuario = new Usuarios(req.body);
    if(req.user.mail == usuario.mail){
       const listaLocal = await ListaLocal.find({idSala:req.body.salaId});
       //const listaLocal = await ListaLocal.find({nameLocal:req.params.id});
       res.json(listaLocal);
    }
    else {
        const salida = {status:"Token error"}
        res.json(salida);
    };
}

// listaLocalCtrl.editListaLocal =  async (req, res) => {
//     const listaLocal = {
//         nameLocal : req.body.name,
//         fecha : req.body.position,
//         userName : req.body.office,
//         age : req.body.salary

//     }
//     await ListaLocal.findByIdAndUpdate(req.params.id, {$set: listaLocal}, {new: true});
    
//     res.json({'status': 'ListaLocal Update'});
// }

// listaLocalCtrl.deleteListaLocal = async (req, res) => {
//     await ListaLocal.findByIdAndRemove(req.params.id);
//     res.json({'status': 'ListaLocal Removed'});
// }
module.exports = listaLocalCtrl;
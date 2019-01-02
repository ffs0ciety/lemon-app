const ListaLocal = require('../models/listaLocal');
const Usuarios = require('../models/usuarios');

const listaLocalCtrl = {};

listaLocalCtrl.getListaLocal = async (req, res) => {
    const listaLocal = await ListaLocal.find();
    res.json(listaLocal);
}

listaLocalCtrl.addListaLocal = async (req, res) => {
    const listaLocal = new ListaLocal({
        nameLocal : req.body.nameLocal,
        fecha : req.body.fecha,
        idSala: req.body.idSala,
        userName : req.body.userName,
        age : req.body.age
    });
    await listaLocal.save();
    res.json({'status': 'ListaLocal Saved'});
}

listaLocalCtrl.getListaLocalId = async (req, res) => {
  
    
    const usuario = new Usuarios(req.body);
    if(req.user.mail == usuario.mail){
       const listaLocal = await ListaLocal.find({idSala:req.body.idSala});
       console.log(req.params.idSala);
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
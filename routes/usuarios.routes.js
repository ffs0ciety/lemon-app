const express = require('express');
const router = express.Router();
const middleware = require('../middleware');

const usuariosCtrl = require('../controllers/usuarios.controller');

//router.get('/' , usuariosCtrl.getUsuarios);
router.post('/usuario', middleware.ensureAuthenticated, usuariosCtrl.getUsuarioPublic);

//APLICAR MIDDLEWARE
//router.put('/:id' , usuariosCtrl.editUsuario);
//router.delete('/:id' , usuariosCtrl.deleteUsuario);

//Menos al createUsuario y el validate(login)
router.post('/' , usuariosCtrl.createUsuario);
router.post('/validate', usuariosCtrl.validateUsuario);

module.exports = router;
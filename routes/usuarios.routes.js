const express = require('express');
const router = express.Router();

const usuariosCtrl = require('../controllers/usuarios.controller');

router.get('/' , usuariosCtrl.getUsuarios);
//router.post('/' , usuariosCtrl.createUsuario);
router.post('/validate' , usuariosCtrl.validateUsuario);
router.put('/:id' , usuariosCtrl.editUsuario);
router.delete('/:id' , usuariosCtrl.deleteUsuario);

module.exports = router;
const express = require('express');
const router = express.Router();
const middleware = require('../middleware');

const listaLocalCtrl = require('../controllers/listaLocal.controller');

//router.get('/' , listaLocalCtrl.getListaLocal);
router.post('/' , listaLocalCtrl.addListaLocal);
router.post('/lista',middleware.ensureAuthenticated, listaLocalCtrl.getListaLocalId);
// router.put('/:id' , listaLocalCtrl.editListaLocal);
// router.delete('/:id' , listaLocalCtrl.deleteListaLocal);

module.exports = router;
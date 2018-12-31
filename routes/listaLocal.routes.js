const express = require('express');
const router = express.Router();

const listaLocalCtrl = require('../controllers/listaLocal.controller');

router.get('/' , listaLocalCtrl.getListaLocal);
router.post('/' , listaLocalCtrl.addListaLocal);
router.get('/:id' , listaLocalCtrl.getListaLocalId);
// router.put('/:id' , listaLocalCtrl.editListaLocal);
// router.delete('/:id' , listaLocalCtrl.deleteListaLocal);

module.exports = router;
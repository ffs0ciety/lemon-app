const express = require('express');
const router = express.Router();

const localCtrl = require('../controllers/local.controller');

router.get('/' , localCtrl.getLocals);
router.post('/' , localCtrl.createLocal);
router.get('/:id' , localCtrl.getLocal);
router.put('/:id' , localCtrl.editLocal);
router.delete('/:id' , localCtrl.deleteLocal);

module.exports = router;
const express = require('express');
const router = express.Router();

const servicesCtrl = require('../controllers/services.controller');

router.post('/' , servicesCtrl.validarToken);


module.exports = router;
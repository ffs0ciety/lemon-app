const express = require('express');
const router = express.Router();

const accountCtrl = require('../controllers/account.controller');

router.get('/' , accountCtrl.getAccounts);
//router.post('/' , accountCtrl.createAccount);
router.post('/validate' , accountCtrl.validateAccount);
router.put('/:id' , accountCtrl.editAccount);
router.delete('/:id' , accountCtrl.deleteAccount);

module.exports = router;
const Account = require('../models/account');

const accountCtrl = {};

accountCtrl.validateAccount = async (req, res) => {
    const account = {
        mail: req.body.mail,
        name: req.body.name,
        password: req.body.password
    }
    const resultado = await Account.find({mail:account.mail, password:account.password});
    console.log(resultado);
    
    if(resultado.length == 0){
        res.json({'status':'false'})
    }
    else res.json(resultado)
    
}

accountCtrl.getAccounts = async (req, res) => {
    const accounts = await Account.find();
    res.json(accounts);
}

accountCtrl.createAccount = async (req, res) => {
    const local = new Account(req.body);
    await local.save();
    res.json({'status': 'Account Saved'});
}


accountCtrl.getAccount = async (req, res) => {
    const local = await Account.findById(req.params.id);
    res.json(local);
}

accountCtrl.editAccount =  async (req, res) => {
    const account = {
        mail: req.body.mail,
        name: req.body.name,
        password: req.body.password
    }
    await Account.findByIdAndUpdate(req.params.id, {$set: account}, {new: true});
    
    res.json({'status': 'Account Update'});
}

accountCtrl.deleteAccount = async (req, res) => {
    await Account.findByIdAndRemove(req.params.id);
    res.json({'status': 'Account Removed'});
}
module.exports = accountCtrl;
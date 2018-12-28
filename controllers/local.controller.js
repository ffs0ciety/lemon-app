const Local = require('../models/local');

const localCtrl = {};

localCtrl.getLocales = async (req, res) => {
    const locales = await Local.find();
    res.json(locales);
}

localCtrl.createLocal = async (req, res) => {
    const local = new Local(req.body);
    await local.save();
    res.json({'status': 'Local Saved'});
}


localCtrl.getLocal = async (req, res) => {
    const local = await Local.findById(req.params.id);
    res.json(local);
}

localCtrl.editLocal =  async (req, res) => {
    const local = {
        name: req.body.name,
        position: req.body.position,
        office: req.body.office,
        salary: req.body.salary

    }
    await Local.findByIdAndUpdate(req.params.id, {$set: local}, {new: true});
    
    res.json({'status': 'Local Update'});
}

localCtrl.deleteLocal = async (req, res) => {
    await Local.findByIdAndRemove(req.params.id);
    res.json({'status': 'Local Removed'});
}
module.exports = localCtrl;
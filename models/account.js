const mongoose =  require('mongoose');
const {Schema} = mongoose;

const accountSchema = new Schema({
    mail: {type: String, unique: true, trim: true, required: true},
    name: {type: String, unique: true, trim: true, required: true} ,
    password: {type: String, trim: true, required: true}
});

module.exports =  mongoose.model('Account', accountSchema);
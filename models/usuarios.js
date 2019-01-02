const mongoose =  require('mongoose');
const {Schema} = mongoose;

const usuariosSchema = new Schema({
    mail: {type: String, unique: true, trim: true, required: true},
    name: {type: String, unique: true, trim: true, required: true} ,
    password: {type: String, trim: true, required: true},
    idSala: {type:String, trim:true, required: false, default:""},
    puntos: {type: Number, default: 0}
});

module.exports =  mongoose.model('Usuarios', usuariosSchema);
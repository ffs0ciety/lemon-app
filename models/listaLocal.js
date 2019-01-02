const mongoose =  require('mongoose');
const {Schema} = mongoose;

const listaLocalSchema = new Schema({
    salaName: {type: String, required: true},
    salaId: {type: String, required: true},
    fecha: {type: Date, required:true} ,
    userName: {type: String, required:true},
    userMail: {type: String, required:true},
    userId: {type: String, required:true},
    age: {type: Number, required:true},
    haEntrado: {type: Boolean, default:false}
});

module.exports =  mongoose.model('ListaLocal', listaLocalSchema);
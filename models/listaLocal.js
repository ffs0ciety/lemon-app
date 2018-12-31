const mongoose =  require('mongoose');
const {Schema} = mongoose;

const listaLocalSchema = new Schema({
    nameLocal: {type: String, required: true},
    idSala: {type: String, required: true},
    fecha: {type: Date, required:true} ,
    userName: {type: String, required:true},
    age: {type: Number, required:true}
});

module.exports =  mongoose.model('ListaLocal', listaLocalSchema);
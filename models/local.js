const mongoose =  require('mongoose');
const {Schema} = mongoose;

const localesSchema = new Schema({
    name: {type: String, unique:true, required: true},
    imgPrincipal: {type: String, required:true},
    infoLocal: {type: String, required: true},
    comentario: {type: String, required:true}
    
});
//AQUI ES DONDE HACE LA LLAMADA AL ESQUEMA
module.exports =  mongoose.model('Locales', localesSchema);
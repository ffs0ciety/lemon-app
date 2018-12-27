const mongoose =  require('mongoose');
const {Schema} = mongoose;

const localSchema = new Schema({
    name: {type: String, unique:true, required: true},
    imgPrincipal: {type: String, required:true},
    infoLocal: {type: String, required: true},
    comentario: {type: String, required:true}
    
});

module.exports =  mongoose.model('Local', localSchema);
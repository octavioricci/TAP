const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usuarioSchema = new Schema({
  name: {
      type: String,
      required: [true, "Name is required"]
    },
  age: {
      type: Number,
      default: false
    }
});

// Creo el modelo 
// el primer argumento es la collection, el segundo el esquema
const UsuarioModel = mongoose.model('usuario',usuarioSchema);
module.exports = UsuarioModel;

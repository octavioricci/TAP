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
const UsuarioModelo = mongoose.model('usuario',usuarioSchema);
exports.module = UsuarioModelo;

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const registerSchema = new Schema({
  name: {
      type: String,
      required: [true, "Username is required"]
      },
  password: {
      type: String,
      required: [true, "Password is required"]
    },
  email: {
      type: String,
      default: false
  }
});

// Creo el modelo 
// el primer argumento es la collection, el segundo el esquema
const RegisterModel = mongoose.model('register',registerSchema);
module.exports = RegisterModel;

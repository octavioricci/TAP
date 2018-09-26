const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var loginSchema = new Schema({
    username:{
      type: String,
      required: [false]
    },
    email:{
      type:String,
      required:[true,"Email is required"]

    },
    lastToken:{
      type:String,
      required:[true,"Token is required"]
    }
  
});

const LoginModel = mongoose.model('login',loginSchema);
module.exports = LoginModel;
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var loginSchema = new Schema({
    username:{
      type: String,
      required: [true,"Username is required"]
    },
    password:{
      type:String,
      required:[true,"Password is required"]
}
  
});
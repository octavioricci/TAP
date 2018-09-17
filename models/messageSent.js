const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var messageSentSchema = new Schema({
  
    message: {
      type: String,
      required: [true, "Message is required"]
    },
    to: [{
      type:String,
      required:[true, "To is required"] 
    }]
      
  
  
  
});

const MessageSentModel = mongoose.model('messagesent',messageSentSchema);
module.exports=MessageSentModel;
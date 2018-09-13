const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var messageReceivedSchema = new Schema({
    
      status: {
        type: String,
        required: [true,"Status is required"]
      },
      totalMessages: {
        type: Number,
        required: [true, "Total Messages is required"]
      },
      messageFrom: [{
        from: {
            type: String,
            required: [true, "From is required"]
        },
        message: {
            type: String,
            default: false                               
        },
        sent: {
            type: String,
            require: [true, "Sent is required"]
        },
        wasRead: {
            type: Boolean,
            require: [true, "Was read is required"]
        }
                                      
                                       
      }] 
  
});

const MessageReceivedModel = mongoose.model('messagereceived',messageReceivedSchema);
module.exports=MessageReceivedModel;
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var messageReceivedSchema = new Schema({
    
       status: {
        type: String,
        required: [true,"Status is required"]
      },
       messageFrom: {
            type: String,
            required: [true, "From is required"]
        },
       
        messageTo: {
            type: String,
            required: [true, "From is required"]
        },
        message: {
            type: String,
            default: false                               
        },
        sent: {
            type: Date,
            default: Date.now
        },
        wasRead: {
            type: Boolean,
            require: [true, "Was read is required"]
        }

});

const MessageReceivedModel = mongoose.model('messagereceived',messageReceivedSchema);
module.exports=MessageReceivedModel;
const mongoose=require('mongoose');
const Schema=mongoose.Schema;

var messageSchema = new Schema({
  
    from: {
      type: String,
      required: [true, "From is required"]
    },
    to: {
      type: String,
      required: [true, "To is required"]
    },
    message:{
      type: String,
      required: [true, "Message is required"]
    },
    dateSend:{
      type: String,
      required: [true, "Date is required"]
    },
    wasRead:{
      type: Boolean,
      required: [true, "Was Read is required"]
    }
     
});

const MessageModel = mongoose.model('message',messageSchema);
module.exports=messageSchema;

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var responseSchema = new Schema({

    status: {
      type: String,
      required: [true, "Status is required"]
    },
    message: {
      type: String,
      required: [true, "Message is required"]
    }
});

const ResponseModel = mongoose.model('response',responseSchema);
module.exports = ResponseModel;
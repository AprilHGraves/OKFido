const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  body: {
    type: String,
    required: true
  },
  conversation: {
    type: Schema.Types.ObjectId,
    ref: "conversations"
  },
  author: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("messages", MessageSchema);
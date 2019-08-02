const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ConversationSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  dogId: {
    type: String
  },
  messages: [
    {
      type: Schema.Types.ObjectId,
      ref: "messages"
    }
  ],
});

module.exports = mongoose.model("conversations", ConversationSchema);
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LikeSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  dogId: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("likes", LikeSchema);
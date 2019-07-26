const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    min: 6,
    max: 32
  },
  description: {
    type: String,
  },
  lat: {
    type: Number
  },
  lng: {
    type: Number
  }
});

module.exports = mongoose.model("users", UserSchema);
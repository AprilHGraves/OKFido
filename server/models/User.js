const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String
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
  zipcode: {
    type: Number
  },
  willTravel: {
    type: Number,
    min: 0,
    max: 500
  },
  hasChildren: {
    type: Boolean,
    default: false
  },
  hasDogs: {
    type: Boolean,
    default: false
  },
  hasCats: {
    type: Boolean,
    default: false
  },
  likedSizes: {
    type: Array,
    default: ['small', 'medium', 'large', 'xlarge']
  },
  likedGenders: {
    type: Array,
    default: ['male', 'female']
  },
  likedAges: {
    type: Array,
    default: ['baby', 'young', 'adult', 'senior']
  },
});

module.exports = mongoose.model("users", UserSchema);
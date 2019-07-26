const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// model probably not needed

const DogSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  breed: {
    type: String
  },
  age: {
    type: Number
  },
  sex: {
    type: String
  },
  size: {
    type: String
  },
  description: {
    type: String
  },
  lat: {
    type: Number
  },
  lng: {
    type: Number
  }
});

module.exports = mongoose.model("dogs", DogSchema);
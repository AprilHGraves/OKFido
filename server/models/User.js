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
  likedBreeds: {
    type: Array,
    default: ['all']
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
  likedColors: {
    type: Array,
    default: [
      "Apricot / Beige",
      "Bicolor",
      "Black",
      "Brindle",
      "Brown / Chocolate",
      "Golden",
      "Gray / Blue / Silver",
      "Harlequin",
      "Merle (Blue)",
      "Merle (Red)",
      "Red / Chestnut / Orange",
      "Sable",
      "Tricolor (Brown, Black, & White)",
      "White / Cream",
      "Yellow / Tan / Blond / Fawn"
    ]
  },
  coat: {
    type: Array,
    default: ['short', 'medium', 'long', 'wire', 'hairless', 'curly']
  }
});

module.exports = mongoose.model("users", UserSchema);
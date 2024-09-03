const mongoose = require("mongoose");

const DelekSchema = new mongoose.Schema({
  Benzin95: {
    type: String,
  },
  Benzin98: {
    type: String,
  },
  Solar: {
    type: String,
  },
});

// 'Sonol' is the specific collection name in your database
const Sonol = mongoose.model("Sonol", DelekSchema, "Sonol");

module.exports = Sonol;

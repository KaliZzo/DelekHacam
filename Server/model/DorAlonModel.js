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
  Benzin95FullService: {
    type: String,
  },
});

// 'DorAlon' is the specific collection name in your database
const dorAlon = mongoose.model("DorAlon", DelekSchema, "DorAlon");

module.exports = dorAlon;

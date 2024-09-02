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
  Benzin95: {
    type: String,
  },
});

const Delek = mongoose.model("Delek", DelekSchema);

module.exports = Delek;

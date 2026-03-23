const mongoose = require("mongoose");

const academySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Must have name"],
  },
  address: {
    type: String,
    required: [true, "Must have address"],
  },
});

const Academy = mongoose.model("Academy", academySchema);
module.exports = Academy;

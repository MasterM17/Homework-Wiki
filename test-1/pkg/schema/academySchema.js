const mongoose = require("mongoose");
const { courseSchema } = require("./courseSchema");

const academySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Must have name"],
  },
  address: {
    type: String,
    required: [true, "Must have address"],
  },
  courses: [courseSchema],
});

const Academy = mongoose.model("Academy", academySchema);
module.exports = Academy;

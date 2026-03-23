const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Must have name"],
  },
  address: {
    type: String,
    required: [true, "Must have addess"],
  },
  category: {
    type: String,
    required: [true, "Must have category"],
  },
});

const Course = mongoose.model("Course", courseSchema);
module.exports = Course;

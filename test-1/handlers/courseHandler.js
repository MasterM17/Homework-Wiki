const Course = require("./../pkg/schema/courseSchema");

exports.createCourse = async (req, res) => {
  try {
    const course = await Course.create({
      name: req.body.name,
      address: req.body.address,
      category: req.body.category,
    });

    res.status(201).json({
      status: "success",
      data: {
        course,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: "something went wrong",
    });
  }
};

exports.getCourses = async (req, res) => {
  try {
    const course = await Course.find();
    res.status(200).json({
      data: {
        course,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: "something went wrong",
    });
  }
};

exports.getCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course)
      return res.status(404).json({
        status: "fail",
        message: `No course found under ID:${req.params.id}`,
      });
    res.status(200).json({
      status: "success",
      data: {
        academy,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: "something went wrong",
    });
  }
};

exports.updCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!course)
      return res.status(404).json({
        status: "fail",
        message: `No course found under ID:${req.params.id}`,
      });
    res.status(200).json({
      status: "success",
      data: {
        academy,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: "something went wrong",
    });
  }
};

exports.deleteCourse = async (req, res) => {
  try {
    await Course.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: "success",
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
};

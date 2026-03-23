const Academy = require("./../pkg/schema/academySchema");

exports.createAcademy = async (req, res) => {
  try {
    const academy = await Academy.create({
      name: req.body.name,
      address: req.body.address,
    });

    res.status(201).json({
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

exports.getAcademys = async (req, res) => {
  try {
    const academy = await Academy.find();
    res.status(200).json({
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

exports.getAcademy = async (req, res) => {
  try {
    const academy = await Academy.findById(req.params.id);
    if (!academy)
      return res.status(404).json({
        status: "fail",
        message: `No academy found under ID:${req.params.id}`,
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

exports.updAcademy = async (req, res) => {
  try {
    const academy = await Academy.findByIdAndUpdate(req.params.id, req.body, {
      new: true, 
      runValidators: true, 
    });
    if (!academy)
      return res.status(404).json({
        status: "fail",
        message: `No academy found under ID:${req.params.id}`,
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

exports.deleteAcademy = async (req, res) => {
  try {
    await Academy.findByIdAndDelete(req.params.id);
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

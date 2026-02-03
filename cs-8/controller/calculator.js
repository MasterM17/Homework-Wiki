const utils = require("../utils/index");

const getMassCalculator = async (req, res) => {
  const response = await utils.parseTemplate("calculator.html", { result: "" });
  res.send(response);
};

const postMassCalculator = async (req, res) => {
  // error
  if (req.body.mass === "" || req.body.acceleration === "") {
    return res.status(400).send("Bad request!");
  }
  //logika
  const mass = Number(req.body.mass);
  const accel = Number(req.body.acceleration);
  const force = mass * accel;

  const response = await utils.parseTemplate("calculator.html", {
    result: force,
  });

  res.send(response);
};

// treba da se eksprotira

module.exports = {
  getMassCalculator,
  postMassCalculator,
};

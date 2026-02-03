const utils = require("../utils/index");

const getMassCalculator = async (req, res) => {
  try {
    const response = await utils.parseTemplate("calculator.html", {
      result: "",
    });
    res.send(response);
  } catch (error) {
    console.log("Critical error", err);
    res.status(500).send("Something went wrong ! Please try again !");
  }
};

const postMassCalculator = async (req, res) => {
  try {
    // error
    if (req.body.mass === "" || req.body.acceleration === "") {
      return res.status(400).send("Bad request!");
    }
    //logika
    const mass = Number(req.body.mass);
    const accel = Number(req.body.acceleration);
    if (mass <= 0) {
      const response = await utils.parseTemplate("calculator.html", {
        result: "Error: Masata mora da bide pogolema 0 kg.",
      });
      return res.status(400).send(response);
    }
    const force = mass * accel;

    const response = await utils.parseTemplate("calculator.html", {
      result: force,
    });

    res.send(response);
  } catch (err) {
    console.log("Critical error ", err);
    res.status(500).send("Something went wrong ! Please try again !");
  }
};

// treba da se eksprotira

module.exports = {
  getMassCalculator,
  postMassCalculator,
};

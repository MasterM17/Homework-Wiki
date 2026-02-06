const utils = require("../utils/index");

const calculators = [
  { value: "force", name: "Force (F = m * a)" },
  { value: "momentum", name: "Momentum (p = m * v)" },
];

const getMassCalculator = async (req, res) => {
  try {
    const calculatorOptions = calculators
      .map((options) => {
        return `<option value="${options.value}">${options.name}</option>`;
      })
      .join("");
    const response = await utils.parseTemplate("calculator.html", {
      result: "",

      title: "",
      label1: "Mass",
      label2: "Number",
    });
    res.send(response);
  } catch (error) {
    console.log("Critical error", error);
    res.status(500).send("Something went wrong ! Please try again !");
  }
};

const postMassCalculator = async (req, res) => {
  try {
    const { input1, input2, calcType } = req.body;
    // error
    if (!input1 || !input2) {
      return res.status(400).send("Bad request!");
    }
    //logika
    console.log(calcType);
    if (input1 <= 0) {
      const response = await utils.parseTemplate("calculator.html", {
        result: "Error: Masata mora da bide pogolema 0 kg.",
      });
      return res.status(400).send(response);
    }
    let rezultat = 0;
    switch (calcType) {
      case "force":
        rezultat = Number(input1) * Number(input2);
        break;

      case "momentum":
        rezultat = Number(input1) * Number(input2);
        break;
    }
    const calculatorOptions = calculators
      .map((opt) => {
        const isSelected = opt.value === calcType ? "selected" : "";
        return `<option value="${opt.value}" ${isSelected}>${opt.name}</option>`;
      })
      .join("");
    console.log("Calculated:", rezultat);
    const response = await utils.parseTemplate("calculator.html", {
      result: rezultat,

      calcOptions: calculatorOptions,
      label1: "Mass (kg)",
      label2: calcType === "force" ? "Acceleration (m/s)" : "Velocity (m/s)",
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

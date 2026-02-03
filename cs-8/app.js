//? Da se kreira kalkulator sto kje kalkulira 2 njutnov zakon
//get
//post metoda
// mass * accelaration

const express = require("express");
const calculator = require("./controller/calculator");
const app = express();
app.use(express.urlencoded({ extended: true }));

app.get("/calculator", calculator.getMassCalculator);
app.post("/calculator", calculator.postMassCalculator); // prethodno tuj pisuesmo celu logiku

app.listen(11000, (err) => {
  if (err) return console.log(err.message);
  console.log("Server started.");
});

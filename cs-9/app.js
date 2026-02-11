//? Za Domashna
//? Da se kreira JSON fajl i da se koristi namesto data vo app.js
//? Da se implementira delete kopche na sekoja kolona vo tabelata studenti i pri klik da se brishe soodvention student
//? MVC Arhitektura JSON = MODEL

const express = require("express");
const app = express();
const path = require("path");
const readWrite = require("./utils/fileReadWrite.js");
const {
  postPannel,
  deleteStudent,
  getPannel,
} = require("./controller/pannelController.js");

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

const dataPath = path.join(__dirname, "/model/data.json");

app.get("/panel", getPannel);

app.post("/panel", postPannel);

app.post("/delete/:id", deleteStudent);
// app.post("/panel", (req, res) => {});

app.listen(3500, (err) => {
  if (err) return console.log(err.message);
  console.log("Service started on port 3500");
});

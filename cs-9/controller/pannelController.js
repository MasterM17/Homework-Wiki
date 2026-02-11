const fs = require("fs");
const path = require("path");
const readWrite = require("../utils/fileReadWrite.js");

const pannelPath = path.join(__dirname, "../model/data.json");

const getPannel = async (req, res) => {
  try {
    const dataRead = await readWrite.fileRead(pannelPath);
    const students = JSON.parse(dataRead);
    res.render("panel", {
      studenti: students,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("Greshka pri chitanje na podatocite.");
  }
};

const postPannel = async (req, res) => {
  try {
    const dataRead = await readWrite.fileRead(pannelPath);
    const data = JSON.parse(dataRead);

    const newStudent = {
      id: Date.now(),
      ime: req.body.ime,
      prezime: req.body.prezime,
      grad: req.body.grad,
    };

    data.push(newStudent);
    await readWrite.fileWrite(pannelPath, JSON.stringify(data, null, 2));
    res.redirect("/panel");
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error, please try again later");
  }
};

const deleteStudent = async (req, res) => {
  try {
    const studentID = req.params.id;

    const dataRead = await readWrite.fileRead(pannelPath);
    let students = JSON.parse(dataRead);

    students = students.filter((stud) => stud.id !== studentID);

    await readWrite.fileWrite(pannelPath, JSON.stringify(students, null, 2));
    res.redirect("/panel");
  } catch (error) {
    console.log(error);
    res.status(500).send("Greshka pri brishenje.");
  }
};

module.exports = {
  postPannel,
  deleteStudent,
  getPannel,
};

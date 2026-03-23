const express = require("express");
const db = require("./pkg/DB/index");
const academy = require("./handlers/academyHandler");
const course = require("./handlers/courseHandler");
const view = require("./handlers/viewHandler");
const auth = require("./handlers/authHandler");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set("view engine", "ejs");

db.initDB();
//auth

app.post("/api/v1/signup", auth.signUp);
app.post("/api/v1/login", auth.login);

// view

app.get("/test", view.getLanding);
app.get("/welcome", view.getWelcome);

//CRUD
app.get("/api/v1/academy", academy.getAcademys);
app.get("/api/v1/academy/:id", academy.getAcademy);
app.post("/api/v1/academy", academy.createAcademy);
app.patch("/api/v1/academy/:id", academy.updAcademy);
app.delete("api/v1/academy/:id", academy.deleteAcademy);

app.get("/api/v1/course", auth.protect, course.getCourses);
app.get("/api/v1/course/:id", course.getCourse);
app.post("/api/v1/course", course.createCourse);
app.patch("/api/v1/course/:id", course.updCourse);
app.delete("api/v1/course/:id", course.deleteCourse);

app.listen(process.env.PORT, (err) => {
  if (err) {
    return console.log("Could not start a service");
  }
  console.log(`Service started successfully ${process.env.PORT}`);
});

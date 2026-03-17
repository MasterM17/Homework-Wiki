const express = require("express");
const db = require("./pkg/DB/index");
const workoutHandler = require("./handler/workOut");
const auth = require("./handler/authHandler");
const view = require("./handler/viewHandler");
const cookieParser = require("cookie-parser");

const app = express();
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static("public"));

db.initDB();

app.get(
  "/api/v1/workouts",
  auth.protect,
  auth.restrict("admin", "user"),
  workoutHandler.getWorkouts,
);
app.get(
  "/api/v1/workouts/:id",
  auth.protect,
  auth.restrict("admin", "user"),
  workoutHandler.getWorkout,
);
app.post(
  "/api/v1/workouts",
  auth.protect,
  auth.restrict("admin", "user"),
  workoutHandler.uploadWorkoutPhoto,

  workoutHandler.createWorkout,
);
app.patch(
  "/api/v1/workouts/:id",
  auth.protect,
  auth.restrict("admin", "user"),
  workoutHandler.updWorkout,
);
app.delete(
  "/api/v1/workouts/:id",
  auth.protect,
  auth.restrict("admin"),
  workoutHandler.deletWorkout,
);

app.post("/api/v1/signup", auth.signup);
app.post("/api/v1/login", auth.login);

//VIEW
app.get("/login", view.getLoginForm);
app.get("/dashboard", auth.protect, view.getDashboard);

const port = process.env.PORT;

app.listen(port, (err) => {
  if (err) {
    console.log(err.message);
  }
  console.log(`Sucesfull started server on ${port}`);
});

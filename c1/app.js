const express = require("express");
const db = require("./pkg/DB/index");
const workoutHandler = require("./handler/workOut");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

db.initDB();

app.get("/api/v1/workouts", workoutHandler.getWorkouts);
app.get("/api/v1/workouts/:id", workoutHandler.getWorkout);
app.post("/api/v1/workouts", workoutHandler.createWorkout);
app.patch("/api/v1/workouts/:id", workoutHandler.updWorkout);

const port = process.env.PORT;

app.listen(port, (err) => {
  if (err) {
    console.log(err.message);
  }
  console.log(`Sucesfull started server on ${port}`);
});

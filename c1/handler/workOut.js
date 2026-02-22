const Workout = require("../pkg/schema/workoutSchema");

const createWorkout = async (req, res) => {
  try {
    const workout = await Workout.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        workout,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
};

const getWorkouts = async (req, res) => {
  try {
    const workout = await Workout.find();
    res.status(200).json({
      data: {
        workouts: workout,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
};

const getWorkout = async (req, res) => {
  try {
    const workout = await Workout.findById(req.params.id);
    if (!workout)
      return res.status(404).json({
        status: "fail",
        message: `No workout found under ID:${req.params.id}`,
      });
    res.status(200).json({
      status: "success",
      data: {
        workout,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
};

const updWorkout = async (req, res) => {
  try {
    const workout = await Workout.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // pod default ne vrakja nazad promene
      runValidators: true, // pod default u updejt ne proverue validatori
    });
    if (!workout)
      return res.status(404).json({
        status: "fail",
        message: `No workout found under ID:${req.params.id}`,
      });
    res.status(200).json({
      status: "success",
      data: {
        workout,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
};

const deletWorkout = async (req, res) => {
  try {
    await Workout.findByIdAndDelete(req.params.id);
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

module.exports = {
  createWorkout,
  getWorkout,
  getWorkouts,
  updWorkout,
  deletWorkout,
};

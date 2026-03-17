const Workout = require("../pkg/schema/workoutSchema");

const getLoginForm = (req, res) => {
  try {
    res.status(200).render("login", {
      naslov: "Please log in",
    });
  } catch (err) {
    res.status(500).send("Server Error");
  }
};

const getDashboard = async (req, res) => {
  try {
    const categories = await Workout.distinct("muscleGroup");
    const muscleGroup = Workout.schema.path('muscleGroup').enumValues;
    // console.log(muscleGroup);
    
    let query = {};
   
    if (req.query.search) {
      query.$or = [
        {
          excerciseName: { $regex: req.query.search, $options: "i" },
        },
        { muscleGroup: { $regex: req.query.search, $options: "i" } },
      ];
    }
    if (req.query.muscleGroup && req.query.muscleGroup !== "all") {
      {
        query.muscleGroup = req.query.muscleGroup;
      }
    }
    const workData = await Workout.find(query).sort({ createdAt: -1 });
    res.render("dashboard", {
      workouts: workData,
      currentSearch: req.query.search,
      currentFilter: req.query.muscleGroup,
      categories: categories,
      muscleGroups: muscleGroup,
    });
  } catch (err) {
    res.status(500).send("Server Error");
  }
};

module.exports = {
  getLoginForm,
  getDashboard,
};

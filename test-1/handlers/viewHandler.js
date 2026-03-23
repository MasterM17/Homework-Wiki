const Course = require("./../pkg/schema/courseSchema");

exports.getLanding = (req, res) => {
  try {
    res.status(200).render("test", {
      TestBack: "Test za backend razvoj na softver",
    });
  } catch (err) {
    res.status(500).send("Error");
  }
};

exports.getWelcome = async (req, res) => {
  try {
    const courses = await Course.find();

    res.status(200).render("welcome", {
      status: "success",
      naslov: "Kursevi",
      courses,
    });
  } catch (err) {
    res.status(500).send("Error");
  }
};

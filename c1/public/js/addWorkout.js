const submitWorkout = async (data) => {
  try {
    const res = await axios({
      method: "POST",
      url: "/api/v1/workouts",
      data,
    });
    return res.data;
  } catch (err) {
    console.log("Server Error");
  }
};

document
  .getElementById("add-workout-form")
  .addEventListener("submit", async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append(
      "excerciseName",
      document.getElementById("excerciseName").value,
    );
    form.append("muscleGroup", document.getElementById("muscleGroup").value);
    form.append("weight", document.getElementById("weight").value);
    form.append("reps", document.getElementById("reps").value);
    form.append("image", document.getElementById("image").files[0]);

    const result = await submitWorkout(form);

    if (result && result.status === "success") {
      location.reload();
    }
  });

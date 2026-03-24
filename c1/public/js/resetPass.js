document.getElementById("reset-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const token = document.getElementById("reset-token").value;
  const password = document.getElementById("password").value;
  console.log();
  

  try {
    alert();
    const res = await axios({
      method: "PATCH",
      url: `/api/v1/resetPassword/${token}`,
      data: {
        status: "sucess",
        password,
      },
    });
    window.location.assign("/login");
  } catch (err) {
    alert(err.message || "Something went wrong")
    console.log(err.response);
  }
});

document.getElementById(`forgot-form`).addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const btn = document.getElementById("btn-forgot");
  const message = document.getElementById("message");
  // alert("its working")

  try {
    const res = await axios({
      method: "POST",
      url: "/api/v1/forgotPassword",
      data: {
        email,
      },
    });
    console.log(res);

    if (res.data.status === "success") {
      alert("Check your inbox !");
    }
  } catch (err) {
    alert(err.message || "Something went wrong");
    console.log(err.response);
  }
});

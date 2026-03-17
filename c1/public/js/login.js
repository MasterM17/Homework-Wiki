const loginForm = async (email, password) => {
  try {
    const res = await axios({
      method: "POST",
      url: "/api/v1/login",
      data: {
        email,
        password,
      },
    });
    console.log(res);
    window.location.assign("/dashboard");
  } catch (err) {
    console.log(err.message);
  }
};

document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  loginForm(email, password);
});

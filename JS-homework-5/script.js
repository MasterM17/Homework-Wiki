// Event Listeners ("click", "mouseover", "mouseleave") create alert() popup
const darkModeToggle = document.getElementById("darkModeButton");

darkModeToggle.addEventListener("click", () => {
  const userConfirmed = confirm("Do you want to switch to dark mode?");
  if (userConfirmed) {
    document.body.classList.toggle("dark-mode");
    alert("Dark mode has been activated!");
  } else {
    alert("Dark mode was not changed.");
  }
});
// site p elementi menuvanje fontFamily preku style svojstvoto
const paragraph = document.getElementsByClassName("paragraph");
for (let i = 0; i < paragraph.length; i++) {
  paragraph[i].style.fontFamily = "Courier New";
}
// site p elementi menuvanje na text-decoration preku click i toggle
const underlineToggle = document.getElementById("underlineButton");

underlineToggle.addEventListener("click", () => {
  const paragraph = document.querySelectorAll(".paragraph");
  paragraph.forEach((para) => {
    para.classList.toggle("underline-text");
  });
});

const btns = document.querySelectorAll(".first-container-button");

btns.forEach((btn) => {
  btn.addEventListener("mouseover", () => {
    btn.classList.add("btn-hover");
  });

  btn.addEventListener("mouseleave", () => {
    btn.classList.remove("btn-hover");
  });

  btn.addEventListener("click", () => {
    btn.classList.add("btn-click");
    setTimeout(() => {
      btn.classList.remove("btn-click");
    }, 100);
  });
});

// fetch + DOM rendering na lista na objekti (public API)
// Error handling so catch
// setTimeout + setInterval
// Input pole preku koe mozam da kreiram todo so svojstva: "title" i "completed"
// click listener na sekoe todo, toggle completed + hover + cursor: pointer

fetch("https://jsonplaceholder.typicode.com/users")
  .then((response) => response.json())
  .then((users) => {
    console.log(users);
    const userData = document.getElementById("todo-container");
    users.forEach((user) => {
      userData.innerHTML += `
        <div><h3>${user.name}</h3>
        <p><strong>Email:</strong> ${user.email}</p>
        <p><strong>City:</strong> ${user.address.city}</p>
        <p><strong>Company:</strong> ${user.company.name}</p></div>
      `;
    });
  })
  .catch((eror) => {
    console.log("Nastana greska", eror);
    document.getElementById("todo-container").innerHTML =
      ' <p style="color: red;"> <strong>Failed to fetch data. Please try again.</strong> </p>';
  })
  .finally(() => console.log("Fetch e uspesen"));

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
let todos = [];

function renderCard(todos) {
  const todosContainer = document.getElementById("users-container");
  todosContainer.innerHTML = "";
  todos.forEach((todo) => {
    const card = document.createElement("div");
    const nameH3 = document.createElement("h3");
    const emailPara = document.createElement("p");
    const adressPara = document.createElement("p");
    const companyPara = document.createElement("p");

    nameH3.innerText = todo.name;
    emailPara.innerText = todo.email;
    adressPara.innerText = todo.address.city;
    companyPara.innerText = todo.company.name;

    card.classList.add("card");

    const cardArray = [emailPara, adressPara, companyPara]
    cardArray.forEach((array) => array.classList.add("paragraph"))
    // emailPara.classList.add("paragraph")

    card.appendChild(nameH3);
    card.appendChild(emailPara);
    card.appendChild(adressPara);
    card.appendChild(companyPara);
    todosContainer.appendChild(card);
  });
}

fetch("https://jsonplaceholder.typicode.com/users")
  .then((response) => response.json())
  .then((users) => {
    todos = users;
    console.log(users);
    renderCard(todos);

    // const userData = document.getElementById("users-container");
    // users.forEach((user) => {
    //   userData.innerHTML += `
    //     <div><h3>${user.name}</h3>
    //     <p><strong>Email:</strong> ${user.email}</p>
    //     <p><strong>City:</strong> ${user.address.city}</p>
    //     <p><strong>Company:</strong> ${user.company.name}</p></div>
    //   `;
    // });      updated homework
  })
  .catch((eror) => {
    console.log("Nastana greska", eror);
    document.getElementById("users-container").innerHTML =
      ' <p style="color: red;"> <strong>Failed to fetch data. Please try again.</strong> </p>';
  })
  .finally(() => console.log("Fetch e uspesen"));

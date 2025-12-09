let currentShow = [];
let episodes = [];
let casts = [];

const params = new URLSearchParams(window.location.search);
console.log(params);

const id = params.get("id");

fetch(`https://api.tvmaze.com/shows/${id}`)
  .then((res) => res.json())
  .then((res) => {
    currentShow = res;
    console.log("ovoj su shows", currentShow);
    renderShows();
  });

function renderShows() {
  const mainShowContainer = document.getElementById("shows-main-container");
  mainShowContainer.innerHTML = "";

  let show = currentShow;

  const showCard = document.createElement("div");

  const imgContainer = document.createElement("div");
  imgContainer.className = "imgContainer";
  const showImg = document.createElement("img");
  showImg.src = show.image.medium;
  imgContainer.appendChild(showImg);
  showCard.appendChild(imgContainer);

  const textContainer = document.createElement("div");
  textContainer.className = "textContainer";
  const showTitle = document.createElement("h2");
  showTitle.innerText = show.name;
  textContainer.appendChild(showTitle);

  const showSummary = document.createElement("p");
  showSummary.innerHTML = show.summary;
  textContainer.appendChild(showSummary);

  const showGenr = document.createElement("h3");
  showGenr.innerText = show.genres.join(", ");
  textContainer.appendChild(showGenr);

  const showRait = document.createElement("h3");
  showRait.innerText = show.rating.average;
  textContainer.appendChild(showRait);

  showCard.appendChild(textContainer);

  mainShowContainer.appendChild(showCard);
}

fetch(`https://api.tvmaze.com/shows/${id}/episodes`)
  .then((res) => res.json())
  .then((res) => {
    episodes = res;
    console.log("ovoj su epizode", episodes);
    renderEpisodes();
  });

function renderEpisodes() {
  const mainEpisodeCont = document.getElementById("episodes-main-container");
  //   mainEpisodeCont.innerHTML = "";

  episodes.forEach((epis) => {
    const episCard = document.createElement("div");

    const episImg = document.createElement("img");
    episImg.src = epis.image.medium;
    episCard.appendChild(episImg);
    const episName = document.createElement("h2");
    episName.innerText = epis.name;
    episCard.appendChild(episName);

    const episSumm = document.createElement("p"); //subsctring
    if (epis.summary) {
      episSumm.innerText = epis.summary.replace(/<[^>]*>?/gm, "");
    } else {
      episSumm.innerText = "No summary avilable";
    }

    episCard.appendChild(episSumm);

    const showRait = document.createElement("h3");
    showRait.innerText = "Rating: " + epis.rating.average;
    episCard.appendChild(showRait);

    mainEpisodeCont.appendChild(episCard);
  });
}

fetch(`https://api.tvmaze.com/shows/${id}/cast`)
  .then((res) => res.json())
  .then((res) => {
    casts = res;
    console.log("ovoj su cast", casts);
    renderCasts(casts);
  });

function renderCasts() {
  const castContainer = document.getElementById("casts-main-container");

  casts.forEach((cast) => {
    const imgSrc =
      cast.person.image.medium ||
      "https://via.placeholder.com/210x295?text=No+Image";
    castContainer.innerHTML += `
        <div class="cast-card">
        <img src='${imgSrc}'/>
        
        <h2>Name: ${cast.person.name}</h2>
        <h2>Character: ${cast.character.name}
        


        </div>
        `;
  });
}

// login
const loginModal = document.getElementById("loginModal");
const openLoginBtn = document.getElementById("openLoginBtn");
const closeLoginBtn = document.querySelector(".close-btn");
const loginForm = document.getElementById("loginForm");
const userNameInput = document.getElementById("usernameInput");
const userPassInput = document.getElementById("passwordInput");
const loginContainer = document.getElementById("loginContainer");
const registerContainer = document.getElementById("registerContainer");
const showRegisterBtn = document.getElementById("showRegisterBtn");
const showLoginBtn = document.getElementById("showLoginBtn");
const registerForm = document.getElementById("registerForm");
const regUserInput = document.getElementById("regUsernameInput");
const regPassInput = document.getElementById("regPasswordInput");
const loginErrorMsg = document.getElementById("loginErrorMsg");

const header = document.querySelector("header");
const favLink = document.getElementById("favLink");
console.log("what is favLink", favLink);

function handleLogOut() {
  localStorage.removeItem("currentUser");
  favLink.style.display = "none"
  window.location.reload();
}

// promena na header ime i favorites
function updateHeaderForUser(name) {
  const oldBtn = document.getElementById("openLoginBtn");
  const header = document.querySelector("header");
  oldBtn.remove(); //trzamo ga log in button da ne se vidi
  favLink.style.display = "block"

  const menuContainer = document.createElement("div");
  menuContainer.id = "userMenuContainer";
  menuContainer.classList.add("dropdown-container");
  menuContainer.innerHTML = `
        <button id="userMenuBtn" class="login-btn">
            <span id="userNameDisplay">Hello, ${name}</span>
            <i class="fa-solid fa-caret-down"></i>
        </button>
        <div id="dropdownMenu" class="dropdown-content">
            <a href="#" id="logoutLink">Log Out</a>
        </div>
    `;

  header.appendChild(menuContainer);
  document.getElementById("userMenuBtn").addEventListener("click", () => {
    const menu = document.getElementById("dropdownMenu");
    menu.style.display = menu.style.display === "block" ? "none" : "block";// dropdown dali ke e vidljiv ili ne
  });

  document.getElementById("logoutLink").addEventListener("click", (e) => {
    e.preventDefault();
    handleLogOut();
  });

  
}
// otvara log in pop up
openLoginBtn.addEventListener("click", () => {
  loginModal.style.display = "flex";
});
// zatvara log in pop up
closeLoginBtn.addEventListener("click", () => {
  loginModal.style.display = "none";
});

// prebacue u register
showRegisterBtn.addEventListener("click", () => {
  loginContainer.style.display = "none";
  registerContainer.style.display = "block";
});
// prebacue u log in
showLoginBtn.addEventListener("click", () => {
  registerContainer.style.display = "none";
  loginContainer.style.display = "block";
});

function getALlUsers() {
  const usersData = localStorage.getItem("users");
  return usersData ? JSON.parse(usersData) : [];
}

// REGISTER
registerForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const newName = regUserInput.value;
  const newPass = regPassInput.value;

  const allUsers = getALlUsers();

  allUsers.push({ name: newName, pass: newPass });
  localStorage.setItem("users", JSON.stringify(allUsers));

  alert("Account created! Please log in.");
  registerContainer.style.display = "none";
  loginContainer.style.display = "block";
});

// Log in

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const inputUser = userNameInput.value;
  const inputPass = userPassInput.value;

  const allUsers = getALlUsers();

  const userFound = allUsers.find(
    (user) => user.name === inputUser && user.pass === inputPass
  );

  if (userFound) {
    localStorage.setItem("currentUser", inputUser);
    updateHeaderForUser(inputUser);
    loginModal.style.display = "none"; // ugasimo pop up
  } else {
    loginErrorMsg.style.display = "block";
    loginErrorMsg.innerText = "Invalid username or password";
  }
});
function checkLoginStatus() {
  const currentUser = localStorage.getItem("currentUser");
  if (currentUser) {
    updateHeaderForUser(currentUser);
    console.log("whos currenUser",currentUser);
    
  }
}

checkLoginStatus();


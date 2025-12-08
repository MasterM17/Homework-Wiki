let currentShow = [];
const searchBar = document.getElementById("searchBar");
const savedSearch = sessionStorage.getItem("lastSearch");

if (savedSearch) {
  searchBar.value = savedSearch;
  console.log("prethodan search: ", savedSearch);
  filterShows();
} else {
  fetchedDefaultData();
}

function getFavorites() {
  const favorites = localStorage.getItem("myFavorites");
  return favorites ? JSON.parse(favorites) : []; // ako ima nesto ke parsira ako ne ke ostavi prazan array
}

function toggleFavorite(id) {
  const favorites = getFavorites();
  let updatedFavorites;

  if (favorites.includes(id)) {
    updatedFavorites = favorites.filter((x) => x !== id);
    console.log("Izbaceni od favorites:", id);
  } else {
    updatedFavorites = [...favorites, id];
    console.log("Ubacen u favorites ", id);
  }
  localStorage.setItem("myFavorites", JSON.stringify(updatedFavorites));
}
function fetchedDefaultData() {
  fetch("https://api.tvmaze.com/shows")
    .then((res) => res.json())
    .then((res) => {
      currentShow = res;
      console.log("ovoj su shows", currentShow);
      renderShows();
    });
}

function renderShows(showsToRender = currentShow) {
  const mainShowContainer = document.getElementById("shows-main-container");
  mainShowContainer.innerHTML = "";
  const favorites = getFavorites();
  console.log("ovoj su favorites u renderShows", favorites); //proverka

  showsToRender.forEach((show) => {
    const showCard = document.createElement("div");
    showCard.style.cursor = "pointer";
    showCard.className = "show-card";

    const starIcon = document.createElement("i");
    starIcon.className = "fa-solid fa-star favorite-icon";

    const currentUser = localStorage.getItem("currentUser");

    if (favorites.includes(show.id) && currentUser) {
      starIcon.classList.add("is-favorite");
    }
    starIcon.addEventListener("click", (e) => {
      e.stopPropagation(); // da nema event bubling

      if (!currentUser) {
        loginModal.style.display = "flex";
        return;
      }
      toggleFavorite(show.id);
      starIcon.classList.toggle("is-favorite");
    });

    showCard.appendChild(starIcon);

    const showImg = document.createElement("img");
    showImg.src =
      show.image.medium || "https://via.placeholder.com/210x295?text=No+Image";
    showCard.appendChild(showImg);

    const showTitle = document.createElement("h2");
    showTitle.innerText = show.name;
    showCard.appendChild(showTitle);

    const showGenr = document.createElement("h3");
    showGenr.innerText = show.genres.join(", ");
    showCard.appendChild(showGenr);

    const showRait = document.createElement("h3");
    showRait.innerText = "Rating: " + show.rating.average;
    showCard.appendChild(showRait);

    // const showView = document.createElement("a");
    // showView.href = `show.html?id=${show.id}`;

    showCard.addEventListener("click", () => {
      console.log("clicked");
      if (searchBar.value)
        sessionStorage.setItem("lastSearch", searchBar.value);
      window.location.href = `show.html?id=${show.id}`;
    });

    // showCard.appendChild(showView);

    mainShowContainer.appendChild(showCard);
  });
}
// filtriranje smeneto u api ne e local vise

const noResults = document.getElementById("noResultsMessage");
const mainShowContainer = document.getElementById("shows-main-container");

function filterShows() {
  const searchBarinput = searchBar.value.trim().toLowerCase();

  console.log("prebaruvam : ", searchBarinput);
  if (searchBarinput === "") {
    noResults.style.display = "none";
    if (currentShow.length === 0) {
      fetchedDefaultData();
    } else {
      renderShows(currentShow);
    }
    return; //stopira gu funkciju
  }
  fetch(`https://api.tvmaze.com/search/shows?q=${searchBarinput}`)
    .then((res) => res.json())
    .then((data) => {
      const searchResults = data.map((item) => item.show);

      if (searchResults.length === 0) {
        noResults.style.display = "block";
        noResults.innerText = `No results found for ${searchBarinput}`;
        renderShows([]);
      } else {
        noResults.style.display = "none";
        renderShows(searchResults);
      }
      console.log("Filtrirani :", searchResults);
    });

  // renderShows(filteredShows);
}

// za lajv da pisuemo i debounce
let debounceTimer;
//search
searchBar.addEventListener("input", (e) => {
  const searchTerm = e.target.value.trim();
  sessionStorage.setItem("lastSearch", searchTerm);
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    filterShows(searchTerm);
  }, 500);
});
// clear dugme
document.getElementById("clearButton").addEventListener("click", () => {
  searchBar.value = "";
  sessionStorage.removeItem("lastSearch");
  fetchedDefaultData();
  searchBar.focus();
});

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

function handleLogOut() {
  localStorage.removeItem("currentUser");
  window.location.reload();
}

// promena na header ime i favorites
function updateHeaderForUser(name) {
  const oldBtn = document.getElementById("openLoginBtn");
  const header = document.querySelector("header");
  oldBtn.remove(); //trzamo ga log in button da ne se vidi

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
    menu.style.display = menu.style.display === "block" ? "none" : "block";
  });

  document.getElementById("logoutLink").addEventListener("click", (e) => {
    e.preventDefault();
    handleLogOut();
  });

  if (favLink) {
    favLink.style.display = "block";
  }
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
  }
}

checkLoginStatus();

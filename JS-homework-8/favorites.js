const currentUser = localStorage.getItem("currentUser");
if(!currentUser) {
  window.location.href = "index.html"
}

const favoritesContainer = document.getElementById("favorites-main-container");
const noResults = document.getElementById("noResultsMessage");
const searchBar = document.getElementById("searchBar");
const clearBtn = document.getElementById("clearButton");

let allFavoritesData = []; // globalna za favorite lokalno

function getFavorites() {
  const favorites = localStorage.getItem("myFavorites");
  return favorites ? JSON.parse(favorites) : []; // ako ima nesto ke parsira ako ne ke ostavi prazan array
}

const favoriteIds = getFavorites();

if (favoriteIds.length === 0) {
  noResults.style.display = "block";
  noResults.innerText = `No favorites yet! Go add some stars.`;
} else {
  const fetchPromises = favoriteIds.map((id) =>
    fetch(`https://api.tvmaze.com/shows/${id}`).then((res) => res.json())
  ); // mapiramo gi svi od API sto su ni u favorites

  Promise.all(fetchPromises)
    .then((shows) => {
      allFavoritesData = shows;
      console.log("favorites fetched", shows);
      renderFavorites(shows);
    })
    .catch((err) => console.log("Error fetching favorites", err));
}

function renderFavorites(shows) {
  favoritesContainer.innerHTML = "";

  if (shows.length === 0) {
    noResults.style.display = "block";

    if (allFavoritesData.length === 0) {
      noResults.innerText = "No favorites yet! Go add some stars.";
    } else {
      noResults.innerText = "No matches found.";
    }
    return;
  } else {
    noResults.style.display = "none";
  }

  currentFavorites = getFavorites();

  shows.forEach((show) => {
    const showCard = document.createElement("div");
    showCard.style.cursor = "pointer";
    showCard.className = "show-card";

    const starIcon = document.createElement("i");
    starIcon.className = "fa-solid fa-star favorite-icon is-favorite";

    starIcon.addEventListener("click", (e) => {
      e.stopPropagation();
      allFavoritesData = allFavoritesData.filter((item) => item.id !== show.id);
      removeFavorites(show.id);
      showCard.remove(); // brise gu kartu u ovj slucaj, ako  povikamo render f nema da se izbrise deka render ne ni chita od local

      const remainingFavorites = getFavorites();
      console.log("ovoj su remainingFavorites", remainingFavorites);

      if (remainingFavorites.length === 0) {
        noResults.style.display = "block";
        noResults.innerText = "No favorites yet! Go add some stars!";
      }
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
    showGenr.innerText = `Genres: ${show.genres.join(", ")}`;
    showCard.appendChild(showGenr);

    const showRait = document.createElement("h3");
    showRait.innerText = `Rating: ${show.rating.average}`
    showCard.appendChild(showRait);

    showCard.addEventListener("click", () => {
      console.log("clicked");
      if (searchBar.value)
        sessionStorage.setItem("lastSearch", searchBar.value);
      window.location.href = `show.html?id=${show.id}`;
    });

    favoritesContainer.appendChild(showCard);
  });
}

function removeFavorites(id) {
  const favorite = getFavorites();
  const updatedFavorites = favorite.filter((favId) => favId !== id);
  localStorage.setItem("myFavorites", JSON.stringify(updatedFavorites));
  console.log("Izbrisano:", id);
}

let debounceTimer;

searchBar.addEventListener(
  "input",
  (e) => {
    const searchTerm = e.target.value.trim();
    clearTimeout(debounceTimer);

    debounceTimer = setTimeout(() => {
      const filteredShows = allFavoritesData.filter((show) =>
        show.name.toLowerCase().includes(searchTerm)
      );
      renderFavorites(filteredShows);
      console.log("Filtered Showss e ", filteredShows);
    });
  },
  300
);

clearBtn.addEventListener("click", () => {
  searchBar.value = "";
  renderFavorites(allFavoritesData);
  console.log("whats left in allfavoritesdata", allFavoritesData);

  searchBar.focus();
});
function handleLogOut() {
  localStorage.removeItem("currentUser");

  window.location.href = "index.html";
}
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
function checkLoginStatus() {
  
  if (currentUser) {
    updateHeaderForUser(currentUser);
  }
}
checkLoginStatus();

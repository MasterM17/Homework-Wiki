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
  localStorage.setItem("myFavorites", JSON.stringify(updatedFavorites))
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
  console.log("ovoj su favorites u renderShows", favorites);//proverka
  

  showsToRender.forEach((show) => {
    const showCard = document.createElement("div");
    showCard.style.cursor = "pointer";
    showCard.className = "show-card";

    const starIcon = document.createElement("i");
    starIcon.className = "fa-solid fa-star favorite-icon";

    if (favorites.includes(show.id)) {
      starIcon.classList.add("is-favorite");
    }
    starIcon.addEventListener("click", (e) => {
      e.stopPropagation();// da nema event bubling
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

let shows = [];

fetch("https://api.tvmaze.com/shows")
  .then((res) => res.json())
  .then((res) => {
    shows = res;
    console.log("ovoj su shows", shows);
    renderShows();
  });

function renderShows(showsToRender = shows) {
  const mainShowContainer = document.getElementById("shows-main-container");
  mainShowContainer.innerHTML = "";

  showsToRender.forEach((show) => {
    const showCard = document.createElement("div");
    showCard.style.cursor = "pointer";
    showCard.className = "show-card";

    const showImg = document.createElement("img");
    showImg.src = show.image.medium;
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
      window.location.href = `show.html?id=${show.id}`;
    });

    // showCard.appendChild(showView);

    mainShowContainer.appendChild(showCard);
  });
}
// filtriranje smeneto u api ne e local vise
const searchBar = document.getElementById("searchBar");
const noResults = document.getElementById("noResultsMessage");
const mainShowContainer = document.getElementById("shows-main-container");
function filterShows() {
  const searchBarinput = searchBar.value.trim().toLowerCase();

  console.log("prebaruvam : ", searchBarinput);
  if (searchBarinput === "") {
    noResults.style.display = "none";
    renderShows(shows);
    return; //stopira gu funkciju
  }
  fetch(`https://api.tvmaze.com/search/shows?q=${searchBarinput}`)
    .then((res) => res.json())
    .then((data) => {
      const searchResults = data.map((item) => item.show);

      if (searchResults.length === 0) {
        noResults.style.display = "block";
        noResults.innerText = `No results found for ${searchBarinput}`;
        renderShows();
      } else {
        noResults.style.display = "none";
        renderShows(searchResults);
      }
      console.log("Filtrirani :", searchResults);
    });

  // renderShows(filteredShows);
}
let debounceTimer;
// za lajv da pisuemo
searchBar.addEventListener("input", (e) => {
  const searchTerm = e.target.value.trim();
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    filterShows(searchTerm);
  }, 500);
});
// clear dugme
document.getElementById("clearButton").addEventListener("click", () => {
  searchBar.value = "";
  filterShows();
  searchBar.focus();
});

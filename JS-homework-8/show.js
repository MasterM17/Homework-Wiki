let shows = [];
let episodes = [];

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

fetch(`https://api.tvmaze.com/shows/${id}`)
  .then((res) => res.json())
  .then((res) => {
    shows = res;
    console.log("ovoj su shows", shows);
    renderShows(shows);
  });

function renderShows() {
  const mainShowContainer = document.getElementById("shows-main-container");
  mainShowContainer.innerHTML = "";

  let show = shows;

  const showCard = document.createElement("div");

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
  showRait.innerText = show.rating.average;
  showCard.appendChild(showRait);

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
  mainEpisodeCont.innerHTML = "";

  
}

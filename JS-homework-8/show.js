let shows = [];
let episodes = [];

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

fetch(`https://api.tvmaze.com/shows/${id}`)
  .then((res) => res.json())
  .then((res) => {
    casts = res;
    console.log("ovoj su shows", casts);
    renderShows(casts);
  });

function renderShows() {
  const mainShowContainer = document.getElementById("shows-main-container");
  mainShowContainer.innerHTML = "";

  let show = casts;

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
  //   mainEpisodeCont.innerHTML = "";

  episodes.forEach((epis) => {
    const episCard = document.createElement("div");

    const episImg = document.createElement("img");
    episImg.src = epis.image.medium;
    episCard.appendChild(episImg);
    const episName = document.createElement("h2");
    episName.innerText = epis.name;
    episCard.appendChild(episName);

    const episSumm = document.createElement("p");
    episSumm.innerHTML = epis.summary;
    episCard.appendChild(episSumm);

    const showRait = document.createElement("h3");
    showRait.innerText = epis.rating.average;
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
    castContainer.innerHTML += `
        <div class="cast-card">
        <img src='${cast.person.image.medium}'/>
        
        <h2>Name: ${cast.person.name}</h2>
        <h2>Character: ${cast.character.name}
        


        </div>
        `;
  });
}

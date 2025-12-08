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




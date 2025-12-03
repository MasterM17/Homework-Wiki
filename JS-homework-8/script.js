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
    showRait.innerText = show.rating.average;
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

function filterShows() {
  const searchBar = document.getElementById("searchBar");
  const searchBarinput = searchBar.value.trim().toLowerCase();

  console.log("prebaruvam : ", searchBarinput);

  const filteredShows = shows.filter((show) =>
    show.name.toLowerCase().includes(searchBarinput)
  );

  console.log("Filtrirani :", filteredShows);

  renderShows(filteredShows);

  //   searchBar.value = "";
}

// za lajv da pisuemo
document.getElementById("searchBar").addEventListener("input", filterShows);

document
  .querySelector("button[onclick='filterShows()']")
  .addEventListener("click", () => {
    filterShows();
    document.getElementById("searchBar").value = "";
  });

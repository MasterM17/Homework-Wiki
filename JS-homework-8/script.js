let shows = [];

fetch("https://api.tvmaze.com/shows")
  .then((res) => res.json())
  .then((res) => {
    shows = res;
    console.log("ovoj su shows", shows);
    renderShows(shows);
  });

function renderShows() {
  const mainShowContainer = document.getElementById("shows-main-container");
  mainShowContainer.innerHTML = "";

  shows.forEach((show) => {
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

    const showView = document.createElement("a");
    showView.href = `show.html?id=${show.id}`;
    showView.innerText = "View"
    showCard.appendChild(showView)
    // showView.innerHTML += `
    // <a href='show.html?id=${show.id}'>`;

    mainShowContainer.appendChild(showCard);
  });
}

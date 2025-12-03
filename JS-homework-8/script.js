let casts = [];

fetch("https://api.tvmaze.com/shows")
  .then((res) => res.json())
  .then((res) => {
    casts = res;
    console.log("ovoj su shows", casts);
    renderShows(casts);
  });

function renderShows() {
  const mainShowContainer = document.getElementById("shows-main-container");
  mainShowContainer.innerHTML = "";

  casts.forEach((show) => {
    const showCard = document.createElement("div");
    showCard.style.cursor = "pointer"

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
    showView.innerText = "";
    showCard.addEventListener("click", () => {
        console.log("clicked");
        window.location.href = `show.html?id=${show.id}`
        
        
        
    });

    showCard.appendChild(showView);
    

    mainShowContainer.appendChild(showCard);
  });
}

function renderProducts(product) {
  const containerMain = document.getElementById("card-container");
  containerMain.innerHTML = "";
  product.forEach((products) => {
    const card = document.createElement("div");
    card.className = "card";
    const cardLeft = document.createElement("div");
    cardLeft.className = "card-left";
    const cardRight = document.createElement("div");

    const cardIm = document.createElement("img");
    cardIm.src = products.image;
    cardLeft.appendChild(cardIm);

    const cardTitle = document.createElement("h2");
    cardTitle.innerText = products.title;
    cardRight.appendChild(cardTitle);
    const cardPrice = document.createElement("h3");
    cardPrice.innerText = products.price;
    cardRight.appendChild(cardPrice);
    const cardDescription = document.createElement("p");
    cardDescription.innerText = products.description;
    cardRight.appendChild(cardDescription);

    const cardRaiting = document.createElement("h4");
    cardRaiting.innerText = products.rating.rate;
    cardRight.appendChild(cardRaiting);

    card.appendChild(cardLeft);
    card.appendChild(cardRight);

    containerMain.appendChild(card);
  });
}

let fetchedProducts = [];
updateUi()
fetch("data.json")
  .then((results) => results.json())
  .then((apiProducts) => {
    console.log("eve gi api products", apiProducts);
    const savedProducts = localStorage.getItem("products"); // zimamo gi ako postoiv
    if (savedProducts) {
      // ako postoiv u local ke gi dade
      fetchedProducts = JSON.parse(savedProducts);
      renderProducts(fetchedProducts);
      console.log("eve gi od local", fetchedProducts);
    } else {
      // akop ne ke gi zeme od API ili u ovj slucaj data.json
      fetchedProducts = apiProducts;
      localStorage.setItem("products", JSON.stringify(fetchedProducts));
      renderProducts(fetchedProducts);
    }
  }) // error ako ima
  .catch((eror) => {
    console.log("Nastana greska", eror);
    document.getElementById("card-container").innerHTML =
      ' <p style="color: red;"> <strong>Failed to fetch data. Please try again.</strong> </p>';
    const savedProducts = localStorage.getItem("products");
    if (savedProducts) {
      fetchedProducts = JSON.parse(savedProducts);
      renderProducts(fetchedProducts);
    }
  })
  .finally(() => console.log("Fetch e uspesan"));

// admin

const loginForm = document.getElementById("login-form");
const logoutBtn = document.getElementById("logoutBtn");

// log in
loginForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const userName = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if (userName === "admin" && password === "admin123") {
    localStorage.setItem("isAdminLoggedIn", "true");
  } else {
    alert("Wrong Credentials");
  }

  document.getElementById("username").value = "";
  document.getElementById("password").value = "";
  updateUi();
});

logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("isAdminLoggedIn");

  updateUi();
});

function updateUi() {
  const admingLogIn = document.getElementById("login-form");
  const adminLink = document.getElementById("admin-link");
  const isAdminlogIn = localStorage.getItem("isAdminLoggedIn") === "true";
  if (isAdminlogIn) {
    adminLink.style.display = "block";
    admingLogIn.style.display = "none";
  }else {
    adminLink.style.display = "none";
    admingLogIn.style.display = "block";
  }
}

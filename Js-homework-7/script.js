let fetchedProducts = []; // prazan array
let currentEdit = null;
updateUi();
fetch("data.json")
  .then((results) => results.json())
  .then((apiProducts) => {
    console.log("eve gi api products", apiProducts);
    const savedProducts = localStorage.getItem("products"); // zimamo gi ako postoiv
    if (savedProducts) {
      // ako postoiv u local ke gi dade
      fetchedProducts = JSON.parse(savedProducts);
      renderProducts(fetchedProducts);
    } else {
      // akop ne ke gi zeme od API ili u ovj slucaj data.json
      fetchedProducts = apiProducts;
      localStorage.setItem("products", JSON.stringify(fetchedProducts));
      renderProducts(fetchedProducts);
    }
  }) // error ako ima
  .catch((eror) => {
    console.log("Nastana greska", eror);
    document.getElementById("main-table").innerHTML =
      ' <p style="color: red;"> <strong>Failed to fetch data. Please try again.</strong> </p>';
    const savedProducts = localStorage.getItem("products");
    if (savedProducts) {
      fetchedProducts = JSON.parse(savedProducts);
      renderProducts(fetchedProducts);
    }
  })
  .finally(() => console.log("Fetch e uspesan"));

// ID generator od internet
function uuidv4() {
  return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, (c) =>
    (
      +c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (+c / 4)))
    ).toString(16)
  );
}

// izvadeni preko network

function renderProducts(product) {
  const tableBody = document.getElementById("tableBody");
  tableBody.innerHTML = "";
  product.forEach((products) => {
    const tableRow = document.createElement("tr");

    const tableTitle = document.createElement("td");
    tableTitle.innerText = products.title;

    const tableCategory = document.createElement("td");
    tableCategory.innerText = products.category;

    const tableDescription = document.createElement("td");
    tableDescription.innerText = products.description;

    const tablePrice = document.createElement("td");
    tablePrice.innerText = products.price;

    const tableButton = document.createElement("td");
    tableButton.id = "actionTH";
    // delete button
    const buttonDelete = document.createElement("button");
    buttonDelete.innerText = "Delete";
    buttonDelete.onclick = () => {
      deleteForm(products.id);
    };
    tableButton.appendChild(buttonDelete);
    //edit button
    const buttonEdit = document.createElement("button");
    buttonEdit.innerText = "Edit";
    tableButton.appendChild(buttonEdit);
    buttonEdit.onclick = () => {
      editForm(products.id);
      console.log("clicked on row with ID:", products.id); //proverka
    };

    tableBody.appendChild(tableRow);
    tableRow.appendChild(tableTitle);
    tableRow.appendChild(tableCategory);
    tableRow.appendChild(tableDescription);
    tableRow.appendChild(tablePrice);
    tableRow.appendChild(tableButton);
  });
}

// displayProducts(fetchedProducts); // da vidimo dali raboti render

function addForm(event) {
  event.preventDefault();
  if (currentEdit) {
    updateForm(event);
  } else {
    const productTitle = document.getElementById("productTitle").value.trim();
    const productCategory = document
      .getElementById("productCategory")
      .value.trim();
    const productDescription = document
      .getElementById("productDescription")
      .value.trim();
    const productPrice = document.getElementById("productPrice").value.trim();

    const newProduct = {
      id: uuidv4(),
      title: productTitle,
      category: productCategory,
      description: productDescription,
      price: productPrice,
    };

    fetchedProducts = [newProduct, ...fetchedProducts];
    console.log("proverka dali raboti addForm:", fetchedProducts);
    updateLocalStorage();
    renderProducts(fetchedProducts);

    clearForm();
  }
}

// deltedID e id sto e zemeno prilikom render
function deleteForm(deletedId) {
  fetchedProducts = fetchedProducts.filter((deletP) => deletP.id !== deletedId);
  console.log("izbrisano so ID", deletedId);
  updateLocalStorage();
  renderProducts(fetchedProducts);
}
function editForm(editedId) {
  currentEdit = editedId;
  editedProduct = fetchedProducts.find((editedP) => editedP.id === editedId);
  console.log("ovoj e editedProduct kd kliknes", editedProduct); // proverka

  document.getElementById("productTitle").value = editedProduct.title;
  document.getElementById("productCategory").value = editedProduct.category;
  document.getElementById("productDescription").value =
    editedProduct.description;
  document.getElementById("productPrice").value = editedProduct.price;

  document.getElementById("addButton").innerText = "UPDATE";
  document.getElementById("addButton").className = "buttonUpdate";

  // moze i ovakoj ama e povise linie kod, ke probam ss find
  // document.getElementById("productTitle").value = editedProduct.map(
  //   (tit) => tit.title
  // );

  // document.getElementById("productCategory").value = editedProduct.map(
  //   (cat) => cat.category
  // );
  // document.getElementById("productDescription").value = editedProduct.map(
  //   (des) => des.description
  // );

  // document.getElementById("productPrice").value = editedProduct.map(
  //   (pri) => pri.price
  // );
}
function updateForm(updateId) {
  console.log("updateID is:", updateId); // You'll see [object MouseEvent]
  updateId.preventDefault(); // May work, but conceptually wrong

  const updatedTitle = document.getElementById("productTitle").value;
  const updatedCategory = document.getElementById("productCategory").value;
  const updatedDescription =
    document.getElementById("productDescription").value;
  const updatedPrice = document.getElementById("productPrice").value;

  console.log(
    ":testiramo dali updateForm raboti kd kliknes",
    updatedTitle,
    updatedCategory,
    updatedDescription,
    updatedPrice
  );

  const productTargetId = fetchedProducts.find(
    (editedU) => editedU.id === currentEdit
  );
  productTargetId.title = updatedTitle;
  productTargetId.category = updatedCategory;
  productTargetId.description = updatedDescription;
  productTargetId.price = updatedPrice;

  console.log("dali tacno targetira? ", productTargetId);

  updateLocalStorage();
  renderProducts(fetchedProducts);
  clearForm();
  disableEdit();
}
function updateLocalStorage() {
  localStorage.setItem("products", JSON.stringify(fetchedProducts));
}

function clearForm() {
  document.getElementById("productTitle").value = "";
  document.getElementById("productCategory").value = "";
  document.getElementById("productDescription").value = "";
  document.getElementById("productPrice").value = "";
}
function disableEdit() {
  document.getElementById("addButton").innerText = "ADD";
  document.getElementById("addButton").className = "button";
}
// mozev i so onclick="addForm()" vo html ama vaka da izvezbam
document.getElementById("addButton").addEventListener("click", addForm);

//admin

const adminUser = "admin";
const adminPass = "admin123";

const loginForm = document.getElementById("login-form");
const logoutBtn = document.getElementById("logoutBtn");

// log in
loginForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const userName = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if (userName === adminUser && password === adminPass) {
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

// trgni log in
function updateUi() {
  const admingLogIn = document.getElementById("login-form");

  const isAdminlogIn = localStorage.getItem("isAdminLoggedIn") === "true";
  if (isAdminlogIn) {
    admingLogIn.style.display = "none";
  } else {
    admingLogIn.style.display = "block";
  }
}

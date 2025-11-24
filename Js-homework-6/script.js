fetch("https://gutendex.com/books/?page=1")
  .then((res) => res.json())
  .then((res) => {
    fetchedBooks = res.results;
    console.log(fetchedBooks);
    renderCard(fetchedBooks);
  })
  .catch((eror) => {
    console.log("Nastana greska", eror);
    document.getElementById("main-table").innerHTML =
      ' <p style="color: red;"> <strong>Failed to fetch data. Please try again.</strong> </p>';
  })
  .finally(() => console.log("Fetch e uspesen"));

let fetchedBooks = [];
function addBook() {
  const newBookTitle = document.getElementById("title").value.trim();
  const newBookAuthor = document.getElementById("author").value.trim();
  const newBookCategory = document.getElementById("category").value.trim();

  if (!newBookTitle || (!newBookAuthor && !newBookCategory)) {
    alert("Polinjata se prazni. Ve molime vnesete Title i Author");
  } else {
    const newBook = {
      title: newBookTitle,
      authors: [{ name: newBookAuthor }],
      bookshelves: [newBookCategory],

      // createdAt: new Date()
    };

    fetchedBooks = [newBook, ...fetchedBooks];
    renderCard(fetchedBooks);
    console.log(fetchedBooks);

    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("category").value = "";
  }
}

// Ovoj se vika event  delegation in JavaScript
const table = document.getElementById("main-table");

table.addEventListener("click", (event) => {
  const target = event.target;
  console.log("clicked");

  if (target.tagName === "BUTTON") {
    const row = target.closest("tr");
    const idToDelete = row.dataset.id;

    row.remove();

    console.log(`Izbrisan row so id ${idToDelete}`);

    // kako da updejtnemo array 
  }
});

function renderCard(books) {
  const table = document.getElementById("main-table");

  table.innerHTML = "";
  // kreiramo

  //   table.className = "min-w-full border border-gray-200 bg-white";
  //   const tableHeader = document.createElement("tr");
  //   tableHeader.className = "text-white bg-blue-300";
  //   const headerTitle = document.createElement("th");
  //   headerTitle.className =
  //     "px-6 py-3 text-center font-bold text-white uppercase tracking-wider border-b border-gray-200";
  //   const headerAuthor = document.createElement("th");
  //   headerAuthor.className =
  //     "px-6 py-3 text-center font-bold text-white uppercase tracking-wider border-b border-gray-200";
  //   const headerCategory = document.createElement("th");
  //   headerCategory.className =
  //     "px-6 py-3 text-center font-bold text-white uppercase tracking-wider border-b border-gray-200";
  //   // pisuemo
  //   headerTitle.innerText = "TITLE";
  //   headerAuthor.innerText = "AUTHOR";
  //   headerCategory.innerText = "CATEGORY";
  //   // dodavamo
  //   tableHeader.appendChild(headerTitle);
  //   tableHeader.appendChild(headerAuthor);
  //   tableHeader.appendChild(headerCategory);

  //   table.appendChild(tableHeader);
  //pravimo tabelu za svak elemnt on fetch
  books.forEach((book) => {
    //kreiramo
    const row = document.createElement("tr");
    row.className = "hover:bg-blue-50 ";
    row.setAttribute("data-id", book.id);
    const tbTitle = document.createElement("td");
    tbTitle.className = "px-6 py-4 border-b border-gray-200";
    const tbAuthor = document.createElement("td");
    tbAuthor.className = "px-6 py-4 border-b border-gray-200";
    const tbCategory = document.createElement("td");
    tbCategory.className = "px-6 py-4 border-b border-gray-200";
    // const tbCreated = document.createElement("td");
    // tbCreated.className = "px-6 py-4 border-b border-gray-200"; // za vreme
    const tbDeletB = document.createElement("button");
    tbDeletB.className =
      "cursor-pointer bg-red-600 hover:bg-red-700 text-white font-bold py-1 px-3 rounded shadow transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50";

    // pisuemo
    tbTitle.innerText = book.title;
    tbAuthor.innerText = book.authors.map((a) => a.name).join(",");
    tbCategory.innerText = book.bookshelves.map((b) => b).pop();
    // tbCreated.innerHTML = new Date().getTime() // stava na site isto vreme zatoa sto RERENDERING
    tbDeletB.innerText = "DELETE";

    //   book.bookshelves && book.bookshelves.length > 0
    //     ? book.bookshelves.map((a) => a.name).join(",")
    //     : "N/A"; ako sakam da proveru dali e  array
    // dodavamo
    row.appendChild(tbTitle);
    row.appendChild(tbAuthor);
    row.appendChild(tbCategory);
    // row.appendChild(tbCreated);
    row.appendChild(tbDeletB);
    table.appendChild(row);
  });
  //   booksContainer.appendChild(table);
}

const darkModeToggle = document.getElementById("darkModeButton");

darkModeToggle.addEventListener("click", () => {
  const userConfirmed = confirm("Do you want to switch to dark mode?");
  if (userConfirmed) {
    document.body.classList.toggle("dark:bg-blue-900 dark:text-gray-200");
    alert("Dark mode has been activated!");
  } else {
    alert("Dark mode was not changed.");
  }
});

// filter title ascending ili descending za descending a za ascending ke bide sort(function (a,b){ a - b });

let ascending = true;

document.getElementById("title-header").addEventListener("click", () => {
  if (ascending) {
    fetchedBooks.sort((a, b) => a.title.localeCompare(b.title));
  } else {
    fetchedBooks.sort((a, b) => b.title.localeCompare(b.title));
  }

  ascending = !ascending;

  renderCard(fetchedBooks);
});

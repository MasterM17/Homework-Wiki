// 2x
// kompleksen objekt
// niza od objektni
// iteriranje vrz taa niza
// kalkulacija vrz elementite od nizata so reiskoristliva funkcija

let students = [
  {
    name: "Marko",
    exams: [85, 90, 78],
    passed: true,
  },
  {
    name: "Boris",
    exams: [55, 62, 70],
    passed: false,
  },
  {
    name: "Angelo",
    exams: [95, 88, 82],
    passed: true,
  },
  {
    name: "Milena",
    exams: [76, 80, 85],
    passed: true,
  },
];

function calculateAverage(scoresArray) {
  let sum = 0;
  for (let i = 0; i < scoresArray.length; i++) {
    sum = sum + scoresArray[i];
  }
  return sum / scoresArray.length; // koga ke zavrsi loop ke podeli sobereniot score so dolzinata vo ovoj slucaj 3 i so toa dobivame average
}

for (let i = 0; i < students.length; i++) {
  let student = students[i]; // zosto vo array objects nemaat ime kako koga gi posebno definirame student = {} students [ { name: sds}]
  let avg = calculateAverage(student.exams);
  console.log(
    ` ${student.name} has an average score of ${avg.toFixed(2)} passed: ${
      student.passed
    }`
  );
}

console.log("--------------------------");

console.log("--------------------------");

console.log("--------------------------");

console.log("Vtora zadaca");

console.log("--------------------------");

let cart = [
  { name: "T-shirt", price: 19.99, quantity: 2 },
  { name: "Jeans", price: 49.99, quantity: 1 },
  { name: "Sneakers", price: 89.99, quantity: 1 },
  { name: "Hat", price: 14.99, quantity: 3 },
];

function howMuchItCosts(cartItems2) {
  // let productName = null; prasaj sto ke napravi razlika, ne mora da gi korsitime zatoa sto se vo funkcija SCOPE dodeka kaj FOR mora da ima od Global SCOPE ?
  for (let i = 0; i < cartItems2.length; i++) {
    let productName = cartItems2[i].name;
    let productPrice = cartItems2[i].price;
    let productQuantity = cartItems2[i].quantity;
    console.log(
      `${productName} costs ${productPrice} and we have ${productQuantity} left in stock.`
    );
  }
}

function calculateTotal(cartItems) {
  let sumCartPrice = 0;
  let totalPrice = 0;
  for (let i = 0; i < cartItems.length; i++) {
    sumCartPrice = cartItems[i].price * cartItems[i].quantity;
    totalPrice = totalPrice + sumCartPrice;
    // //  console.log(sumCartPrice); // test print
    // console.log("----"); // test print
    // console.log(totalPrice); // test print
  }
  return totalPrice;
}

function calculateTax(productPrice) {
  let productTaxed = productPrice * 0.18;
  return productTaxed;
}

howMuchItCosts(cart);

let sumPrice = calculateTotal(cart);
let taxedPrice = sumPrice + calculateTax(sumPrice);

console.log(
  `The total price of the cart is: $${sumPrice.toFixed(
    2
  )} plus 18% tax will total: $${taxedPrice.toFixed(2)}`
);

console.log("--------------------------");

console.log("--------------------------");

console.log("--------------------------");

console.log("Treta zadaca");

console.log("--------------------------");
// kreiraj niza od 10 elementi (gradovi, drzavi)
// print metoda na objektot
// iteriranje na niza so objekti, (naj populiran grad, top 3 naj naseleni gradovi)
// prosek od broj na ziteli

let country1 = {
  countryName: "Macedonia",
  capital: "Skopje",
  population: 934000,
  popularityIndex: 4,
  print: function () {
    console.log(
      `Glaven grad na ${this.countryName} e ${this.capital} so populacija od ${this.population}.`
    );
    console.log("-------------------");
  },
};
let country2 = {
  countryName: "Serbia",
  capital: "Belgrade",
  population: 2120000,
  popularityIndex: 6,
  print: function () {
    console.log(
      `Glaven grad na ${this.countryName} e ${this.capital} so populacija od ${this.population}.`
    );
    console.log("-------------------");
  },
};
let country3 = {
  countryName: "Croatia",
  capital: "Zagreb",
  population: 767131,
  popularityIndex: 7,
  print: function () {
    console.log(
      `Glaven grad na ${this.countryName} e ${this.capital} so populacija od ${this.population}.`
    );
    console.log("-------------------");
  },
};
let country4 = {
  countryName: "Bulgaria",
  capital: "Sofia",
  population: 1280000,
  popularityIndex: 5,
  print: function () {
    console.log(
      `Glaven grad na ${this.countryName} e ${this.capital} so populacija od ${this.population}.`
    );
    console.log("-------------------");
  },
};
let country5 = {
  countryName: "Greece",
  capital: "Athens",
  population: 3154000,
  popularityIndex: 10,
  print: function () {
    console.log(
      `Glaven grad na ${this.countryName} e ${this.capital} so populacija od ${this.population}.`
    );
    console.log("-------------------");
  },
};

let countries = [country1, country2, country3, country4, country5];

for (let i = 0; i < countries.length; i++) {
  countries[i].print();
}

let maxPopularity = 0;
let mostPopularCountry = null;

for (let i = 0; i < countries.length; i++) {
  let currentCountry = countries[i];
  if (countries[i].popularityIndex > maxPopularity) {
    maxPopularity = currentCountry.popularityIndex;
    mostPopularCountry = currentCountry;
  }
}

console.log(
  `Most popular country is ${mostPopularCountry.countryName} with popularity index of ${maxPopularity}`
);

let maxPopulated = 0;
let mostPopulatedCountry = null;

for (let i = 0; i < countries.length; i++) {
  let currentCountry = countries[i];
  if (countries[i].population > maxPopulated) {
    maxPopulated = currentCountry.population;
    mostPopulatedCountry = currentCountry; // zosto currentCountry a ne maxPopulated / za da bide object a ne number (population)
  }
}
console.log(`Most populated country is ${mostPopulatedCountry.countryName}`);

function findTop3PopulatedCountries(countriesArray) {
  countriesArray.sort(function (a, b) {
    return b.population - a.population; // za descending a za ascending ke bide sort(function (a,b){ a - b });
  });

  const top3 = countriesArray.slice(0, 3);
  // console.log(top3);
  return top3;
}

let top3Countries = findTop3PopulatedCountries(countries);

console.log(`The 3 most populated countries are: ${top3Countries}`);
console.log("The 3 most populated countries are:" , top3Countries);
console.log(top3Countries);
// kako da izvadam samo ime na drzava od object i zosto dava error u ``

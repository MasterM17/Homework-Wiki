// // Function excercise 1
// // Exercise 1: The Area Calculator
// The Goal: Write a function named calculateRectangleArea that calculates the area of a rectangle.

function calculateRectangleArea(width, height) {
  let area;
  area = width * height;
  return area;
}
let visina = 10;
let sirina = 20;
console.log(
  "Plostinata na kvadratot e " + calculateRectangleArea(visina, sirina)
);

console.log("---------------------------------------------------");
// Exercise 2: The Personalized Greeter
// The Goal: Write a function named greetUser that creates a personalized greeting message.
function greetUser(name) {
  // let greeting;
  // greeting
  return (greeting = "Zdravo " + name + "! Dobredojde nazad");
}
// Prva opcija za printanje so korsitneje direktno na funkcija
console.log(greetUser("Marko"));
// Vtora opcija za printanje so posebna variable
let = welcomeMessage = greetUser("Milos");
console.log(welcomeMessage);

console.log("---------------------------------------------------");

// // Exercise 3: The Temperature Converter (Celsius to Fahrenheit)
// The Goal: Write a function named convertToFahrenheit that converts a temperature from Celsius to Fahrenheit.
function convertToFahrenheit(celsiusTemp) {
  let fahrenheitTemp;
  fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
  return fahrenheitTemp;
}

let tempInCelcius = 20;

console.log(
  tempInCelcius + "*C is " + convertToFahrenheit(tempInCelcius) + "*F"
);

console.log("---------------------------------------------------");

// Exercise 4:
function ticketPrice(age) {
  let ticket;
  if (age <= 12) {
    ticket = 5;
  } else if (age >= 65) {
    ticket = 7;
  } else {
    ticket = 10;
  }
  return ticket;
}

let person = {
  ime: "Marko",
  vozrast: 29,
  adresa: {
    grad: "Kumanovo",
    zipcode: "1300",
    ulica: "Tode Dumba",
  },
};

console.log(
  person.ime +
    " od " +
    person.adresa.grad +
    ". Cenata e $" +
    ticketPrice(person.vozrast)
);

console.log("---------------------------------------------------");
// Vezba Objekti

let userProfile = {
  firstName: "Marko",
  lastName: "Mihajlovikj",
  age: 29,
  city: "Kumanovo",
};
console.log(
  "Users full name is " + userProfile.firstName + " " +
   userProfile.lastName
);

console.log("---------------------------------------------------");

let car = {
  brand: "Volkswagen",
  type: { bodyconfig: "hatchback", model: "Golf 7" },
  productYear: 2018,
  productMonth: 10,
  displayInfo: function () {
    console.log(
      "A " + this.productYear + " " + this.brand + " " + this.type.model
    );
  },
};

car.displayInfo();

console.log("---------------------------------------------------");

let product = {
  name: "Laptop",
  price: 1200 + "$",
  inStock: true,
};

console.log("Cena na " + product.name + " " + product.price);

product.color = "blue";

console.log(product);

function addProperty(prop1, prop2) {
  prop1.userBrand = prop2;
}
function changeStock(prop1, prop2) {
  prop1.inStock = prop2;
}
let brand = "Asus";

addProperty(product, brand); // prsaj profesora za dodavanje i za return dali menja
changeStock(product, false);
console.log(product);

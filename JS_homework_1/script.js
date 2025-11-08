// First excercies
console.log("First excercies ");
console.log("------------------------------------------------");
let hour = 22;

if (hour < 12) {
  console.log("Dobro utro");
} else if (hour < 18 && hour > 12) {
  console.log("Dobar den");
} else {
  console.log("Dobro vecer");
}

// Second excercise
console.log("Second excercies ");
console.log("------------------------------------------------");

let age = 22;
let drivingLicense = false;
let driver = "You can drive !";

if (age > 18 && drivingLicense === true) {
  console.log(driver);
} else {
  console.log("You can't drive !");
}

// Third excercise
console.log("Third excercies ");
console.log("------------------------------------------------");

let greeting;
const time = new Date().getHours();
if (time < 12) {
  greeting = "Good morning";
  console.log(greeting);
} else if (time < 18 && time > 12) {
  greeting = "Good afternoon";
  console.log(greeting);
} else {
  greeting = "Good evening";
  console.log(greeting);
}

// Forth excercise
console.log("Forth excercies ");
console.log("------------------------------------------------");

let personAge = 14;
let ticket;

if (personAge <= 12) {
  ticket = 5;
  console.log("Ticket price is $" + ticket);
} else if (personAge >= 65) {
  ticket = 7;
  console.log("Ticket price is $" + ticket);
} else {
  ticket = 10;
  console.log("Ticket price is $" + ticket);
}

// Fifth excercise
console.log("Fifth excercies ");
console.log("------------------------------------------------");

const username = "User123";
const password = "Strongpasword123";

const enteredUsername = "User123";
const enteredPassword = "Strongpasword";

if (username === enteredUsername && password === enteredPassword) {
  console.log("Sucessful login");
} else if (username !== enteredUsername) {
  console.log("User not found");
} else if (password !== enteredPassword) {
  console.log("Wrong password");
}

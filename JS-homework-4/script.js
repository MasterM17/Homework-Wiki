// Print na site elementi od niza so forEach

let people = [
  {
    name: "Ana",
    age: 22,
    city: "Skopje",
    hobbies: ["reading", "tennis"],
    employed: true,
    address: { street: "Main St", number: 21 },
  },
  {
    name: "Boris",
    age: 17,
    city: "Bitola",
    hobbies: ["gaming", "basketball"],
    employed: false,
    address: { street: "Oak Ave", number: 45 },
  },
  {
    name: "Elena",
    age: 35,
    city: "Skopje",
    hobbies: ["swimming", "hiking"],
    employed: true,
    address: { street: "Sunset Blvd", number: 11 },
  },
  {
    name: "Ivan",
    age: 29,
    city: "Ohrid",
    hobbies: ["painting", "cycling", "fishing"],
    employed: true,
    address: { street: "River Rd", number: 8 },
  },
  {
    name: "Jovana",
    age: 21,
    city: "Bitola",
    hobbies: ["dancing", "cooking"],
    employed: false,
    address: { street: "Hill St", number: 32 },
  },
  {
    name: "Petar",
    age: 26,
    city: "Skopje",
    hobbies: ["chess", "football", "music"],
    employed: true,
    address: { street: "Lake View", number: 10 },
  },
  {
    name: "Sara",
    age: 19,
    city: "Tetovo",
    hobbies: ["music", "drama"],
    employed: false,
    address: { street: "Central Ave", number: 14 },
  },
  {
    name: "Goran",
    age: 40,
    city: "Veles",
    hobbies: ["gardening", "running"],
    employed: true,
    address: { street: "Park Lane", number: 5 },
  },
  {
    name: "Dina",
    age: 18,
    city: "Ohrid",
    hobbies: ["blogging", "volunteering"],
    employed: false,
    address: { street: "Forest Rd", number: 19 },
  },
  {
    name: "Maja",
    age: 23,
    city: "Bitola",
    hobbies: ["yoga", "travel"],
    employed: true,
    address: { street: "Church St", number: 1 },
  },
];

people.forEach((person) => {
  console.log(
    `${[person.name]} ima ${person.age} godini i zivee vo ${person.city}.`
  );
});

console.log("--------------------------------------------");
// Mapiranje na niza od iminja vo iminja so uppercase

const peopleUpper = people.map((person) => {
  return {
    ime: person.name.toUpperCase(),
    grad: person.city.toUpperCase(),
  };
});

console.log(peopleUpper);

console.log("--------------------------------------------");
// Filter na elementi vo niza pogolemi od x

const olderThan21 = people
  .filter((personOlder) => personOlder.age > 21)
  .forEach((person21) =>
    console.log(
      `Liceto so ime ${person21.name} e postaro od 21 godina i ima ${person21.age} godina`
    )
  );

console.log("--------------------------------------------");
// Kombinacija na filter i map so koristenje na kompleksni objekti

const employedPerson = people
  .filter((personEmlpoyment) => personEmlpoyment.employed === true)
  .map((employed) => {
    return {
      ime: employed.name,
      grad: employed.city.toUpperCase(),
    };
  });
  employedPerson.forEach((person) => console.log(`${person.ime} zivee vo ${person.grad}`));


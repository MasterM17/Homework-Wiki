//? Домашна
//? 1. Сите студенти од Скопје чие име завршува на а и имаат просек над 7, подредени по име (растечки).
//? 2. Сите студенти кои имаат просек над 9 и не се од Скопје, подредени по просек опаѓачки.
//? 3. Првите 3 студенти кои имаат имиња од 5 карактери, подредени по просек.
//? 4. Вкупен просек на студенти кои се од Куманово
//? 5. Просек на просеците од градовите Скопје и Охрид
//? 6. Да се додаде уште еден студент со име Горан, просек 7.3 и град Делчево
//? 7. Да се избрише првиот студент во студенти
//? 8. Да се креира нов array каде што студентите од Охрид и Куманово каде што оценките со просек се за 1 поголем(Динамички)

const studenti = [
  { ime: "Bojan", prosek: 7.2, grad: "Skopje" },
  { ime: "Pero", prosek: 8.3, grad: "Bitola" },
  { ime: "Janko", prosek: 6.9, grad: "Kumanovo" },
  { ime: "Vesna", prosek: 9.1, grad: "Skopje" },
  { ime: "Elena", prosek: 9.9, grad: "Tetovo" },
  { ime: "Vancho", prosek: 9.4, grad: "Kumanovo" },
  { ime: "Simona", prosek: 9.7, grad: "Kratovo" },
  { ime: "Trajamla", prosek: 7.4, grad: "Ohrid" },
  { ime: "Ivana", prosek: 6.9, grad: "Ohrid" },
  { ime: "Natasha", prosek: 9.0, grad: "Kichevo" },
  { ime: "Stanko", prosek: 8.5, grad: "Demir Kapija" },
  { ime: "Damjan", prosek: 6.2, grad: "Kumanovo" },
  { ime: "Sandra", prosek: 8.2, grad: "Ohrid" },
];

//* 1.

const filteredA = studenti.filter((student) => {
  return student.ime.toLocaleLowerCase().endsWith("a");
});

function printName(string, item) {
  console.log(string);
  item.forEach((name) => console.log(name.ime));
}

printName("Iminja sto zavrstuvaat na bukvata a se slednive", filteredA);

//*2

stuendtNadvor = studenti.filter((student) => {
  return student.prosek >= 9 && student.grad != "Skopje";
});

console.log(stuendtNadvor);
printName("Studenti so prosek nad 9 i nadvor od skopje se", stuendtNadvor);

//* 3.

const studentKar = studenti
  .filter((student) => {
    return student.ime.length === 5;
  })
  .sort((a, b) => b.prosek - a.prosek)
  .slice(0, 3);

console.log(studentKar);
printName(
  "Prvite 3 studenti koi imaat 5 karaketi podredeni po preose",
  studentKar
);

//*4
const studentKu = studenti.filter((student) => student.grad === "Kumanovo");
const prosekKu =
  studentKu.reduce((accumulator, s) => {
    return accumulator + s.prosek;
  }, 0) / studentKu.length;

console.log(`Vkupen prosek na studenti koi se od Kumanovo e ${prosekKu}`);

//* 5

const studentSk = studenti.filter((student) => student.grad === "Skopje");
const studentOh = studenti.filter((student) => student.grad === "Ohrid");

const prosekSk =
  studentSk.reduce((accumulator, s) => {
    return accumulator + s.prosek;
  }, 0) / studentSk.length;

const prosekOh =
  studentOh.reduce((accumulator, s) => {
    return accumulator + s.prosek;
  }, 0) / studentOh.length;

const vkupProsSkOh = (prosekSk + prosekOh) / 2;
console.log(
  `Vkupniot prosed od prosecite na gradovite Skopje i Ohrid e ${vkupProsSkOh.toFixed(
    2
  )}`
);

//*6
studenti.push({ ime: "Goran", prosek: 7.3, grad: "Delchevo" });
console.log("Shesta Zadacha, dodaden Goran", studenti);

//*7
studenti.splice(0, 1);
console.log("Sedma Zadacha, izbrishan prviot student", studenti);

//*8
const studentOhKu = studenti
  .filter((student) => student.grad === "Kumanovo" || student.grad === "Ohrid")
  .map((stud) => {
    return {
      ...stud,
      prosek: stud.prosek >= 8 ? stud.prosek + 1 : stud.prosek,
    };
  });

console.log("Osma zadacha", studentOhKu);

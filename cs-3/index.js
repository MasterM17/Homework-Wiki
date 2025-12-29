//? Za domasna da se dodade uste eden modul so ime domasna.js
//? koj kje ima funkcija da promeni farenhajt vo celzius i obratno
//? da ima funkcija koja sto presmetuva plostina i perimetar na pravoagolnik
//? da ima funkcija sto proveruva dali nekoj broj e paren ili neparen

const {
  convertTemp,
  perimetar,
  plostina,
  parenNepare,
} = require(`./domasno.js`);

console.log(convertTemp(100, "C"));
console.log(`Perimetar na pravoagolnik so strani 4 i 5 e ${perimetar(4, 5)}`);
console.log(`Ploshtina na pravoagolnik so strani 4 i 5 e ${plostina(4, 5)}`);
console.log(`Dali brojot 7 e paren? ${parenNepare(7)}`);

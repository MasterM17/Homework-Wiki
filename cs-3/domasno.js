//? Za domasna da se dodade uste eden modul so ime domasna.js
//? koj kje ima funkcija da promeni farenhajt vo celzius i obratno
//? da ima funkcija koja sto presmetuva plostina i perimetar na pravoagolnik
//? da ima funkcija sto proveruva dali nekoj broj e paren ili neparen

function convertTemp(temp, toUnit) {
  return new Promise((resolve, fail) => {
    console.log("Processing temperature... please wait 5 seconds.");
    setTimeout(() => {
      let result;
      if (toUnit.toUpperCase() === "C") {
        result = ((temp - 32) * 5) / 9;
        resolve (`${temp} F pretvorena vo celziusovi e ${result.toFixed(1)} C`);
      } else if (toUnit.toUpperCase() === "F") {
        result = (temp * 9) / 5 + 32;
        resolve( `${temp} C pretvorena vo farenhajt e ${result.toFixed(1)} F`);
      } else {
        fail("Pogresna merna vrednost, ve molam koristite C ili F ");
      }
    }, 1000);
  });
}

const perimetar = (a, b) => {
  return (a + b) * 2;
};

const plostina = (a, b) => {
  return a * b;
};

const parenNepare = (broj) => {
  if (broj % 2 === 0) {
    return `Da brojot ${broj} e paren`;
  } else {
    return `Ne brojot ${broj} e neparen`;
  }
};

module.exports = {
  convertTemp,
  perimetar,
  plostina,
  parenNepare,
};

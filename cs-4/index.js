const { log } = require("console");
const {
  delayedGreeting,
  loginUser,
  calculateSquare,
  fileRead,
  fileAppend,
  fileWrite,
  fileUnlink,
  makeDirecory,
  delDirecory,
} = require("./domasno.js");

const greeting = async () => {
  try {
    const message = await delayedGreeting("Bojan");
    console.log(message);
  } catch (err) {
    console.log("something went wrong", err);
  }
};

greeting();

const login = async () => {
  try {
    const status = await loginUser("12345");
    console.log(status);
  } catch (err) {
    console.log(err);
  }
};

login();

const calculate = async () => {
  try {
    const firsRes = await calculateSquare(5);
    console.log(firsRes);
    const secRes = await calculateSquare(firsRes);
    console.log(secRes);
  } catch (err) {
    console.log(err);
  }
};
calculate();

const challenge = async () => {
  try {
    await makeDirecory("./moj_folder");
    await fileWrite("./moj_folder/domasno.txt", "Node.js e cool");
    await fileAppend("./moj_folder/domasno.txt", "\nAdding more tet..");
    const procitano = await fileRead("./moj_folder/domasno.txt");
    console.log("procitano od fajlot", procitano);
    console.log("cekamo 5 sekunde pred brisenje...");
    await new Promise((resolve) => setTimeout(resolve, 5000));
    console.log("Brisenje na fajlot i folderot...");
    await fileUnlink("./moj_folder/domasno.txt");
    await delDirecory("./moj_folder");
  } catch (err) {
    console.log(err);
  }
};

challenge();

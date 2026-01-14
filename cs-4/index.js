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
  getUser,
  getGrades,
  getAverage,
} = require("./domasno.js");

const greeting = async () => {
  try {
    const message = await delayedGreeting("Bojan");
    console.log(message);
  } catch (err) {
    console.log("something went wrong", err);
  }
};

const login = async () => {
  try {
    const status = await loginUser("12345");
    console.log(status);
  } catch (err) {
    console.log(err);
  }
};

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
// sekvencionalno execution
const runAllDomasno = async () => {
  console.log("-----Greeting-----");
  await greeting();
  console.log("-----Login-----");
  await login();
  console.log("-----Calculate-----");
  await calculate();
  console.log("-----Challenge-----");
  await challenge();
};

// runAllDomasno();

const userReport = async (userID) => {
  try {
    const user = await getUser(userID);
    console.log(`Found user ${user.name}`);
    const grades = await getGrades(user.id);
    console.log(`Found grades for ${user.name}: ${grades}`);

    const average = await getAverage(grades);
    console.log(`Calculaiting average for ${user.name}...`);

    const fielName = `Report_${user.name}.txt`;
    const data = `${user.name} has an average grade of ${average}`;

    await fileWrite(fielName, data);

    console.log(`Successfully generated report for ${user.name}`);
  } catch (err) {
    console.log("Error generaiting report:", err);
  }
};

// userReport(1);

const generateAllReports = async (idList) => {
  console.log("Starting generate all reports...");

  for (const id of idList) {
    await userReport(id);
  }
};

generateAllReports([1, 5, 3]);

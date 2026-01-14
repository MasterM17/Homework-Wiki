const fs = require("fs");

function delayedGreeting(name) {
  return new Promise((resolve, fail) => {
    setTimeout(() => {
      resolve(`Zdravo ${name}, se nadevam ucis naporno`);
    }, 2000);
  });
}

function loginUser(password) {
  return new Promise((resolve, fail) => {
    setTimeout(() => {
      if (password === "12345") {
        resolve("Uspesno najavuvanje");
      } else fail("pogresna lozinka");
    }, 3000);
  });
}

function calculateSquare(number) {
  return new Promise((resolve, fail) => {
    setTimeout(() => {
      if (number === undefined || typeof number !== "number") {
        fail("Greska: Morate da vnesete broj!");
      } else {
        resolve(number * number);
      }
    }, 2500);
  });
}

function fileRead(filename) {
  return new Promise((sucess, fail) => {
    fs.readFile(filename, "utf-8", (err, data) => {
      if (err) {
        return fail(err);
      }
      return sucess(data);
    });
  });
}

function fileWrite(filename, data) {
  return new Promise((sucess, fail) => {
    fs.writeFile(filename, data, (err) => {
      if (err) {
        return fail(err);
      }
      return sucess();
    });
  });
}

function fileAppend(filename, data) {
  return new Promise((sucess, fail) => {
    fs.appendFile(filename, data, (err) => {
      if (err) {
        return fail(err);
      }
      return sucess();
    });
  });
}

function fileUnlink(filename) {
  return new Promise((sucess, fail) => {
    fs.unlink(filename, (err) => {
      if (err) {
        return fail(err);
      }
      return sucess(filename);
    });
  });
}

function makeDirecory(path) {
  return new Promise((sucess, fail) => {
    fs.mkdir(path, (err) => {
      if (err) {
        return fail(err);
      }
      return sucess(path);
    });
  });
}
function delDirecory(path) {
  return new Promise((sucess, fail) => {
    fs.rmdir(path, (err) => {
      if (err) {
        return fail(err);
      }
      return sucess(path);
    });
  });
}

// Mock Database
const users = [
  { id: 1, name: "Bojan" },
  { id: 2, name: "Aneta" },
  { id: 3, name: "Stefan" },
];

const grades = {
  1: [10, 8, 9, 10], // Bojan's grades
  2: [7, 9, 10, 8], // Aneta's grades
  3: [6, 6, 7, 8], // Stefan's grades
};

function getUser(id) {
  return new Promise((resolve, fail) => {
    setTimeout(() => {
      const user = users.find((u) => u.id === id);
      if (user) resolve(user);
      else fail("User not found");
    }, 1000);
  });
}

function getGrades(userId) {
  return new Promise((resolve, fail) => {
    setTimeout(() => {
      const userGrades = grades[userId];
      if (userGrades) resolve(userGrades);
      else fail("Greades not found");
    }, 1000);
  });
}

function getAverage(gradesArray) {
  return new Promise((resolve) => {
    const sum = gradesArray.reduce((pre, curr) => pre + curr, 0);
    const avg = sum / gradesArray.length;
    resolve(avg);
  });
}

module.exports = {
  delayedGreeting,
  loginUser,
  calculateSquare,
  fileRead,
  fileWrite,
  fileAppend,
  fileUnlink,
  makeDirecory,
  delDirecory,
  getUser,
  getGrades,
  getAverage,
};

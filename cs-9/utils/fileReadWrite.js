const fs = require("fs");

exports.fileRead = (filename) => {
  return new Promise((sucess, fail) => {
    fs.readFile(filename, "utf-8", (err, data) => {
      if (err) {
        return fail(err);
      }
      return sucess(data);
    });
  });
};

exports.fileWrite = (filename, data) => {
  return new Promise((sucess, fail) => {
    fs.writeFile(filename, data, (err) => {
      if (err) {
        return fail(err);
      }
      return sucess();
    });
  });
};

function uuidv4() {
  return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, (c) =>
    (
      +c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (+c / 4)))
    ).toString(16)
  );
}
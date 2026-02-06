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

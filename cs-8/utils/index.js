const fs = require("fs");
// parse funkcija

const parseTemplate = async (template, object = null) => {
  return new Promise((sucess, fail) => {
    fs.readFile(
      `${__dirname}/../views/${template}`,
      "utf-8",
      (err, content) => {
        if (err) {
          return fail(err);
        }
        if (object) {
          for (prop in object) {
            // trazi u html sto pisue u prop navagja ga value  i zamenue sto ima u html pod prop ime ss value
            content = content.replaceAll(`{{${prop}}}`, object[prop]);
          }
        }
        return sucess(content);
      },
    );
  });
};

module.exports = {
  parseTemplate,
};

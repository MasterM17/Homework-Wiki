//? Servis koj kje obrabotuva ruti od sledniot tip
//? /ime/bojan
//? /ime/pero
//? /ime/Aleksandar
//? /ime/marija
//? /ime/marija
//? /ime/risto
//? /ime/sashko

//? -> parno: da, karakteri: 5, soglaski: 2, samoglaski:3

const http = require("http");

const handler = (req, res) => {
  const url = req.url;
  if (url.startsWith("/ime/")) {
    const [_, op, a] = url.split("/");
    if (a) {
      const name = a.charAt(0).toUpperCase() + a.slice(1).toLowerCase();
      const karakteri = name.length;
      const eParno = karakteri % 2 === 0 ? "da" : "ne";
      const samoglaskiNiza = ["a", "e", "i", "o", "u"];
      const samoglaskiCount = name
        .toLowerCase()
        .split("")
        .filter((char) => samoglaskiNiza.includes(char).length);
      const soglaskiCount = karakteri - samoglaskiCount;

      res.end(
        `Zdravo, ova e profilot na ${name}. Parno: ${eParno}, Karakteri: ${karakteri}, Soglaski: ${soglaskiCount}, Samoglaski: ${samoglaskiCount}`,
      );
    } else {
      res.end("Ve molam vnesete ime na profilot po kosata crta");
    }
  } else {
    res.end(
      "Ruta ne e pronajdena, ve molam koristete /ime pred  vnesuvanje na profilot",
    );
  }
};

const server = http.createServer(handler);

server.listen(10000, (err) => {
  if (err) {
    return console.log(err.message);
  }
  console.log("Serverot e uspeshno podignat na porta 10000");
});

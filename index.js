const express = require('express');
const server = express();

server.use("/css", express.static(__dirname + "/public/css/"));
server.use("/scripts", express.static(__dirname + "/public/scripts/"));
server.use("/privateScript", express.static(__dirname + "/private/scripts/"));

server.get("/", (req, res) => {
  res.sendFile("index.html", {"root": __dirname+'/public'});
});

server.get("/addrefugio", (req, res) => {
  let user = req.query.user;
  let pass = req.query.password;
  if(user == "ADMIN" && pass == "ADMIN"){
    res.sendFile("agregar.html", {"root": __dirname+'/private'});
  }else{
    res.sendStatus(404);
  }
})

port = process.env.PORT || 8080;
server.listen(port, () => {
  console.log("Server running on port " + port);
})

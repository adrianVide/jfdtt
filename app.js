var express = require("express");
var debug = require('debug')('express-generator-test:server');
var http = require("http");

var app = express();
app.use(express.static(__dirname + "/public"));

app.get("/", function (req, res) {
  res.sendFile("index.html");
});


/**
 * Create HTTP server.
 */

var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(3000);
server.on("error", (error) => console.log('Error' + error));
server.on("listening", () => console.log('Listening'));


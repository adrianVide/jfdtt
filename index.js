var express = require("express");
var http = require("http");
const hbs = require("hbs");
const fetch = require("node-fetch");

// Public dir
var app = express();
app.use(express.static(__dirname + "/public"));

// HandleBars Setup
app.set("view engine", "hbs");
app.set("views", __dirname + "/views");
app.use(express.static(__dirname + "/public"));
hbs.registerPartials(__dirname + "/views/partials");

// Routes
// Index
app.get("/", function (req, res) {
  res.render("index.hbs");
});

// User fetch
app.get("/githubuser", (req, res, next) => {
  fetch(`https://api.github.com/users/${req.query.user}`)
    .then((response) => response.json())
    .then((data) => {
      // console.log(data);
      let {user} = req.query;
      let publicReposAmount = data.public_repos;
      switch (publicReposAmount) {
        case undefined:
          res.render("404", { user });
          break;
        case 0:
          res.render("no-repo", { user });
          //No repos
          break;

        default:
          fetch(`https://api.github.com/users/${req.query.user}/repos`)
            .then((response) => response.json())
            .then((data) => {
              let publicRepos = data;
              // console.log(data);
              res.render("search-result", { publicRepos, user });
            });
          break;
      }
    });
});

// Create HTTP server
var server = http.createServer(app);

// Listen on provided port
server.listen(3000);
server.on("error", (error) => console.log("Error" + error));
server.on("listening", () => console.log("Listening"));

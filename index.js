var express = require("express");
var http = require("http");
const hbs = require("hbs");

const fetch = require("node-fetch");

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

// User
app.get("/githubuser", (req, res, next) => {
  fetch(`https://api.github.com/users/${req.query.user}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      if (data.public_repos != 0) {
        fetch(`https://api.github.com/users/${req.query.user}/repos`)
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            res.render("search-result", { publicRepos });
          });
      }

      let publicRepos = data.public_repos;
      console.log(data.public_repos);
    });

  // .then((data) => console.log(data));
  // let publicRepos = data.body.public_repos;
  // res.render('search-result', { publicRepos })

  // (data.public_repos != 0)
  // ?
  // fetch(`https://api.github.com/users/${req.query.user}/repos`)
  // res.render("search-result")
  // :

  // if (data.public_repos != null) {
  //   fetch(`https://api.github.com/users/${req.query.user}/repos`)
  //     .then((response) => response.json())
  //     .then((datarepos) => console.log('repos' + datarepos));
  // }
});

// Create HTTP server
var server = http.createServer(app);

// Listen on provided port
server.listen(3000);
server.on("error", (error) => console.log("Error" + error));
server.on("listening", () => console.log("Listening"));

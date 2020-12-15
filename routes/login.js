const express = require("express");
const router = express.Router();
const client = require("./database");
var session = require("express-session");
const crypto = require("crypto");
const secret = "tejasravi";

router.get("/", (req, res) => {
  console.log(req.session);
  res.render("login");
});

router.use(
  session({
    key: "user",
    secret: "tejasRavi",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 600000000,
    },
  })
);

router.post("/", (req, res) => {
  const password = crypto
    .createHmac("sha256", secret)
    .update(req.body.password)
    .digest("hex");
  !client._connected ? client.connect() : null;
  client
    .query("SELECT * FROM users where username=$1 and password=$2", [
      req.body.userName,
      password,
    ])
    .then((result) => {
      if (result.rowCount) {
        req.session.user = req.body.userName;
        res.redirect("/");
      } else {
        res.status(404).send("Username or password incorrect");
      }
    })
    .catch((err) => {
      res.status(404).send(err);
    });
});
module.exports = router;

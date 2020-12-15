const express = require("express");
const router = express.Router();
const client = require("./database");
var session = require("express-session");
const crypto = require("crypto");
const secret = "tejasravi";

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

router.get("/", (req, res) => {
  res.render("signin");
});

router.post("/", (req, res) => {
  const password = crypto
    .createHmac("sha256", secret)
    .update(req.body.password)
    .digest("hex");
  !client._connected ? client.connect() : null;
  client
    .query("INSERT INTO USERS(name,username,password) VALUES($1,$2,$3)", [
      req.body.name,
      req.body.userName,
      password,
    ])
    .then(() => {
      req.session.user = req.body.userName;
      res.redirect("/");
    })
    .catch((err) => {
      res.status(404).send("Error !!!!", err.detail);
    });
});

module.exports = router;

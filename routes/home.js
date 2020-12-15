const express = require("express");
const router = express.Router();
const session = require("express-session");
const client = require("./database");
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
const checkSession = (req, res, next) => {
  !req.session.user ? res.redirect("/login") : next();
};
router.get("/", checkSession, (req, res) => {
  !client._connected ? client.connect() : null;
  client
    .query("SELECT * FROM notes where username=$1", [req.session.user])
    .then((result) => {
      res.render("home", { notes: result.rows });
    })
    .catch((err) => {
      res.status(404).send(err);
    });
});

module.exports = router;

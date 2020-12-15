const express = require("express");
const router = express.Router();
const client = require("./database");

const checkSession = (req, res, next) => {
  !req.session.user ? res.redirect("/login") : next();
};

router.get("/", checkSession, (req, res) => {
  res.render("add");
});

router.post("/", (req, res) => {
  !client._connected ? client.connect() : null;
  client
    .query("INSERT INTO NOTES(username,title,date,data) VALUES($1,$2,$3,$4)", [
      req.session.user,
      req.body.title,
      new Date(),
      req.body.description,
    ])
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => {
      res.status(404).send("Error !!!!", err);
    });
});
module.exports = router;

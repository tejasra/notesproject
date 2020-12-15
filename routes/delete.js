const express = require("express");
const router = express.Router();
const client = require("./database");

const checkSession = (req, res, next) => {
  !req.session.user ? res.redirect("/login") : next();
};
router.get("/", checkSession, (req, res) => {
  res.redirect("/");
});
router.get("/:id", checkSession, (req, res) => {
  !client._connected ? client.connect() : null;
  client
    .query("DELETE  FROM notes where ID=$1", [req.params.id])
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;

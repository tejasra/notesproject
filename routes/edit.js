const express = require("express");
const router = express.Router();
const client = require("./database");

const checkSession = (req, res, next) => {
  !req.session.user ? res.redirect("/login") : next();
};
router.get("/:id", checkSession, (req, res) => {
  !client._connected ? client.connect() : null;
  client
    .query("SELECT * FROM notes where id=$1", [req.params.id])
    .then((result) => {
      res.render("edit", { notes: result.rows });
    })
    .catch((err) => {
      res.status(404).send(err);
    });
});

router.post("/:id", checkSession, (req, res) => {
  !client._connected ? client.connect() : null;
  client
    .query("UPDATE NOTES SET TITLE=$1,DATA=$2,DATE=$3 WHERE ID=$4", [
      req.body.title,
      req.body.data,
      new Date(),
      req.params.id,
    ])
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;

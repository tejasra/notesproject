const express = require("express");
const app = express();
const login = require("./routes/login");
const signIn = require("./routes/signin");
const home = require("./routes/home");
const addNote = require("./routes/add");
const bodyParser = require("body-parser");
const deleteNote = require("./routes/delete");
const editNote = require("./routes/edit");
const logout = require("./routes/logout");
app.use(bodyParser.urlencoded({ extended: true }));
var session = require("express-session");
app.set("view engine", "ejs");

app.use(
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
  req.session.user ? res.redirect("/") : next();
};

app.use("/", home);
app.use("/login", checkSession, login);
app.use("/signin", checkSession, signIn);
app.use("/addnote", addNote);
app.use("/delete", deleteNote);
app.use("/edit", editNote);
app.use("/logout", logout);
app.listen(3000, () => {
  console.log("The server is started at port 3000");
});

const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const passport = require("passport");
const initializePassport = require("./passport.config");

const users = [];

app.use(express.urlencoded({ extended: false }));

app.post("/register", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 8);
    users.push({
      id: Date.now().toString(),
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });
    res.redirect("/login");
  } catch (e) {
    console.log(e);
    res.redirect("/register");
  }
});

// Routes
app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.get("/register", (req, res) => {
  res.render("register.ejs");
});
// End routes

console.log(users);
app.listen(3000);

const express = require("express");
const path = require("path");
const connectDb = require("./config/db.js");
const bookRoutes = require("./routes/bookRoutes.js");
const userRoutes = require("./routes/userRoutes.js");
const app = express();
app.use(express.urlencoded({ extended: true })); ///// input data
app.use(express.json()); ///// json
connectDb();

app.use(express.static(path.join(__dirname, "assets")));

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.redirect("/ourbooks");
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/contact", (req, res) => {
  res.render("contact");
});

// app.get("/ourbooks", (req, res) => {
//   res.render("ourbooks");
// });

app.use("/ourbooks", bookRoutes);
app.use("/", userRoutes);

app.get("/register", (req, res) => {
  res.render("register");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/details", (req, res) => {
  res.render("details");
});

app.listen(3000, () => console.log("server run on port 3000"));

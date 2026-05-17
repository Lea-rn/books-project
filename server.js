const express = require("express");
const path = require("path");
const connectDb = require("./config/db.js");
const bookRoutes = require("./routes/bookRoutes.js");
const userRoutes = require("./routes/userRoutes.js");
const session = require("express-session");
const app = express();
const flash = require("connect-flash");
app.use(express.urlencoded({ extended: true })); ///// input data
app.use(express.json()); ///// json
connectDb();

app.use(express.static(path.join(__dirname, "assets")));

app.set("view engine", "ejs");

app.use(
  session({
    secret: "myscretkey",
    resave: false, ///// performance
    saveUninitialized: false, ///
  }),
);

app.use(flash());

//// req.session = {
// user : {
//   name : "mouna" ,
//   email : ............. ,
// }
//}

app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");

  res.locals.user = req.session.user || null;
  next();
});

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

app.get("/addbooks", (req, res) => {
  res.render("addbooks");
});

app.get("/details", (req, res) => {
  res.render("details");
});

app.listen(3000, () => console.log("server run on port 3000"));

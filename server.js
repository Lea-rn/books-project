const express = require("express");
const path = require("path");
const connectDb = require("./config/db.js");
const bookRoutes = require("./routes/bookRoutes.js");
const userRoutes = require("./routes/userRoutes.js");
const session = require("express-session");
const app = express();
const flash = require("connect-flash");
const Book = require("./models/bookModel.js");
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

app.get("/mybooks", async (req, res) => {
  try {
    const { sort, q, min, max } = req.query;

    let query = {};
    ////// search by title :
    if (q && q.trim()) {
      query.title = { $regex: q.trim(), $options: "i" };
    }

    ///// filter by prices min/max

    const priceFilter = {};
    if (min !== undefined && min !== "") {
      priceFilter.$gte = Number(min);
    }

    if (max !== undefined && max !== "") {
      priceFilter.$lte = Number(max);
    }

    if (Object.keys(priceFilter).length) {
      query.price = priceFilter;
    }

    ////// sort ::
    let sortObj = {};

    switch (sort) {
      case "price_asc":
        sortObj = { price: 1 };
        break;
      case "price_desc":
        sortObj = { price: -1 };
        break;
      case "title_asc":
        sortObj = { title: 1 };
        break;
      case "title_desc":
        sortObj = { title: -1 };
        break;
      case "newest":
        sortObj = { _id: -1 };
        break;
      default:
        sortObj = { _id: -1 };
    }

    const books = await Book.find(query).sort(sortObj);

    res.render("mybooks", {
      books,
      sort: sort || "",
      q: q || "",
      min: min || "",
      max: max || "",
    });
  } catch (err) {
    req.flash("error_msg", "Failed to load books");
    res.redirect("/ourbooks");
  }
});

app.listen(3000, () => console.log("server run on port 3000"));

const Book = require("../models/bookModel");
const flash = require("connect-flash");

///// all books :
exports.getAllBooks = async (req, res) => {
  try {
    const results = await Book.find({});
    // console.log("books :", results);
    res.render("ourbooks", { results });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

////// three books :

exports.getThreeBooks = async (req, res) => {
  try {
    const threeBooks = await Book.find({}).limit(3);
    // console.log("three books : ", threeBooks);
    res.render("index", { threeBooks });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

////// book details ::

exports.getOneBookDetails = async (req, res) => {
  try {
    console.log("ID RECEIVED :", req.params.id);
    const bookDetails = await Book.findById(req.params.id);
    // console.log("details :", bookDetails);

    if (!bookDetails) {
      return res.status(404).send("Book not found");
    }
    res.render("details", { bookDetails });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

//////// add book ::

exports.addBook = async (req, res) => {
  try {
    const { title, description, price, author } = req.body;

    const newBook = new Book({
      title,
      description,
      price,
      author,
      image: req.file.filename,
    });

    await newBook.save();
    req.flash("success_msg", "Book added successfully");
    res.redirect("/addbooks");
  } catch (err) {
    req.flash("error_msg", "upload failed");
    res.redirect("/addbooks");
  }
};

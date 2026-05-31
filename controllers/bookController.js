const Book = require("../models/bookModel");
const flash = require("connect-flash");
const fs = require("fs").promises;
const path = require("path");

///// all books :
exports.getAllBooks = async (req, res) => {
  try {
    const results = await Book.find({});
    console.log("books :", results);
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

////////// delete book ::

exports.deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    await Book.findByIdAndDelete(id);
    req.flash("success_msg", "Book deleted successfully");
    res.redirect("/mybooks");
  } catch (err) {
    req.flash("error_msg", "Delete failed");
    res.redirect("/mybooks");
  }
};

///////// get  edit form ::

exports.getEditBookForm = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      req.flash("error_msg", "Book not found");
      res.redirect("/mybooks");
    }

    res.render("editbook", { book });
  } catch (err) {
    req.flash("error_msg", "Something went wrong");
    res.redirect("/mybooks");
  }
};

//////// update book ::

exports.updateBook = async (req, res) => {
  try {
    const { title, description, price, author } = req.body;
    const book = await Book.findById(req.params.id);
    {
      image: " 17800813755598.jpg";
    }

    if (!book) {
      req.flash("error_msg", "Book not found !! ");
      return res.redirect("/mybooks");
    }

    const oldImage = book.image;

    if (req.file) {
      book.image = req.file.filename;
      if (oldImage) {
        try {
          await fs.unlink(
            path.join(__dirname, "..", "assets", "uploads", oldImage),
          );
        } catch (err) {}
      }
    }

    book.title = title;
    book.description = description;
    book.price = price;
    book.author = author;

    await book.save();
    req.flash("success_msg", "Book Updated successfully");
    res.redirect("/mybooks");
  } catch (err) {
    req.flash("error_msg", "update failed !! ");
  }
};

const Book = require("../models/bookModel");

exports.getAllBooks = async (req, res) => {
  try {
    const results = await Book.find({});
    // console.log("books :", results);
    res.render("ourbooks", { results });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.getThreeBooks = async (req, res) => {
  try {
    const threeBooks = await Book.find({}).limit(3);
    // console.log("three books : ", threeBooks);
    res.render("index", { threeBooks });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

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

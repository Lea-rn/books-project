const Book = require("../models/bookModel");

exports.getAllBooks = async (req, res) => {
  try {
    const results = await Book.find({});
    console.log("books :", results);
    res.render("ourbooks", { results });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

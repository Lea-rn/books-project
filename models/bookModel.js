const mongoose = require("mongoose");

const bookSchema = mongoose.Schema({
  _id: String,
  title: String,
  description: String,
  price: Number,
  author: String,
  image: String,
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;

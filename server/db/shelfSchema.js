const mongoose = require('mongoose');
const User = require('./userSchema');
const Book = require('./bookSchema');

const shelfSchema = new mongoose.Schema({
  owner: {
    type: User.schema,
    required: true
  },
  shelfName: {
    type: String,
    required: true,
    unique: true
  },
  books: {
    type: [Book.schema],
    required: true
  }
});

const Shelf = mongoose.model('shelf', shelfSchema);

module.exports = Shelf;
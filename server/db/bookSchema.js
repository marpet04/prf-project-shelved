const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const bookSchema = new mongoose.Schema({
  bookId: {
    type: String,
    required: true,
    unique: true
  },
  author: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: false,
    default: 'sci-fi',
  },
  publicationYear: {
    type: String,
    required: false
  }
});

bookSchema.pre('save', function(next) {
  this.bookId = uuidv4();
  next();
});

const Book = mongoose.model('book', bookSchema);

module.exports = Book;
const mongoose = require('mongoose');
const Book = mongoose.model('book');

async function ensureBookExists() {
    try {
      const book = await Book.findOne({ genre: 'sci-fi' });
      if (book) {
        console.log('Egy könyv már minimum van az adatbázisban!');
      } else {
        const newBook = new Book({
          bookId: 'jhvjhgvfhjgv',
          author: 'James Dashner',
          title: 'Az útvesztő',
          genre: 'sci-fi',
          publicationYear: '2009',
        });
        await newBook.save();
        console.log('Egy könyv sikeresen hozzáadva az adatbázishoz!');
      }
    } catch (error) {
      console.error('Hiba történt a könyv ellenőrzése vagy létrehozása során: ', error);
    }
  }
module.exports = ensureBookExists;
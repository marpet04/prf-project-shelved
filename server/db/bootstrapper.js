const mongoose = require('mongoose');
const User = mongoose.model('user');
const Book = mongoose.model('book');

async function ensureAdminExists() {
  try {
    const admin = await User.findOne({ accessLevel: 3 });
    if (admin) {
      console.log('Az admin felhasználó már megtalálható az adatbázisban!');
    } else {
      const newAdmin = new User({
        username: 'fakeAdmin',
        password: 'pwadmin',
        accessLevel: 3,
        birthDate: new Date('1995-12-17T03:24:00'),
      });
      await newAdmin.save();
      console.log('Az admin felhasználó sikeresen létrehozva!');
    }
  } catch (error) {
    console.error('Hiba történt az admin ellenőrzése vagy létrehozása során: ', error);
  }
}

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


module.exports = ensureAdminExists;
module.exports = ensureBookExists;
const express = require('express');
const router = express.Router();
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const User = require('./db/userSchema');
const Book = require('./db/bookSchema');

// POST /login - bejelentkezés
router.route('/login').post((req, res, next) => {
  if (req.body.username, req.body.password) {
    passport.authenticate('local', function (error, user) {
      if (error) return res.status(500).send(error);
      req.login(user, function (error) {
        if (error) return res.status(500).send(error);
        return res.status(200).send('Bejelentkezes sikeres');
      })
    }) (req, res, next);
  } else {
    return res.status(400).send('Hibas keres, username es password kell');
  }
});

// POST /logout - kijelentkezés
router.route('/logout').post((req, res, next) => {
  if (req.isAuthenticated()) {
    req.logout((err) => {
      if(err) {
        console.log('Hiba a kijelentkezés során');
        return res.status(500).send(err)
      }
      return res.status(200).send('Kijelentkezes sikeres');
    });
  } else {
    return res.status(403).send('Nem is volt bejelentkezve');
  }
})

//Kezelt modellek CRUD
//USER
// GET /users - összes felhasználó lekérdezése    - READ
router.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


async function getUser(req, res, next) {
  try {
    user = await User.findOne({ username: req.params.username});
    if (user == null) {
      return res.status(404).json({ message: 'A felhasználó nem található' });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  res.user = user;
  next();
}

// GET /users/:username - egy felhasználó lekérdezése a username alapján     --> READ
router.get('/users/:username', getUser, (req, res) => {
  res.json(res.user);
});


// POST /users - új felhasználó létrehozása      --> CREATE
router.post('/users', async (req, res) => {
  const user = new User({
    username: req.body.username,
    password: req.body.password,
    accessLevel: req.body.accessLevel,
    birthDate: req.body.birthDate,
  });

  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PATCH /users/:username - egy felhasználó frissítése a username alapján    --> UPDATE
router.patch('/users/:username', getUser, async (req, res) => {
  if (req.body.username != null) {
    res.user.username = req.body.username;
  }
  if (req.body.password != null) {
    res.user.password = req.body.password;
  }
  if (req.body.accessLevel != null) {
    res.user.accessLevel = req.body.accessLevel;
  }
  if (req.body.birthDate != null) {
    res.user.birthDate = req.body.birthDate;
  }

  try {
    const updatedUser = await res.user.save();
    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


// DELETE /users/:username - egy felhasználó törlése a username alapján    --> DELETE
router.delete('/users/:username', getUser, async (req, res) => {
  try {
    await res.user.remove();
    res.json({ message: 'A felhasználó sikeresen törölve!' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/*
router.post('/book', async (req, res) => {
  const book = new Book({
    bookId: 'null',
    author: req.body.author,
    title: req.body.title
  });

  if (req.body.genre || req.body.publicationYear) {
    book.genre = req.body.genre,
    book.publicationYear = req.body.publicationYear
  }

  try {
    const newBook = await book.save();
    res.status(201).json(newBook);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get('/book', async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/* Ha egy fájl require-el behivatkozza ezt a fájlt, akkor a hivatkozás helyére a module.exports-ban megadott objektum, funkció 
vagy változó fog bekerülni */

module.exports = router;
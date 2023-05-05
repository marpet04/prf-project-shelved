const express = require('express');
const router = express.Router();
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const User = require('./db/userSchema');
const Book = require('./db/bookSchema');

router.route('/example').get((req, res, next) => {
    res.status(202).send('Get example')
}).post((req, res, next) => {
    res.status(202).send('Post example')
}).put((req, res, next) => {
    res.status(202).send('Put example')
}).delete((req, res, next) => {
    res.status(202).send('Delete example')
});

module.exports = router;


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

router.route('/status').get((req, res, next) => {
  if (req.isAuthenticated()) {
    console.log(req.user)
    return res.status(200).send(req.user);
  } else {
    return res.status(403).send('Nem is volt bejelentkezve');
  }
})

// GET /users - összes felhasználó lekérdezése
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


async function getUser(req, res, next) {
  try {
    user = await User.findOne(req.params.username);
    if (user == null) {
      return res.status(404).json({ message: 'A felhasználó nem található' });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  res.user = user; // ettől kezdve a response-ban benne van a db-ből lekért user objektum
  next();
}

// GET /users/:id - egy felhasználó lekérdezése az id alapján
/*router.get('/:username', getUser, (req, res) => { //ez is egy middleware használati módszer, 
  // a getUser middleware ilyenkor le fog futni a kérés feldolgozása előtt 
  res.json(res.user); //egyszerűsített válaszküldés, a megadott objektumot json-re konvertálva küldjük el
});*/


// POST /users - új felhasználó létrehozása
router.post('/user', async (req, res) => {
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

/*
// PATCH /users/:id - egy felhasználó frissítése az id alapján
router.patch('/:id', getUser, async (req, res) => {
  if (req.body.username != null) {
    res.user.username = req.body.username;
  }
  if (req.body.password != null) {
    res.user.password = req.body.password;
  }
  if (req.body.accessLevel != null) {
    res.user.accessLevel = req.body.accessLevel;
  }
  if (req.body.birthdate != null) {
    res.user.birthdate = req.body.birthdate;
  }

  try {
    const updatedUser = await res.user.save();
    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE /users/:id - egy felhasználó törlése az id alapján
router.delete('/:id', getUser, async (req, res) => {
  try {
    await res.user.remove();
    res.json({ message: 'A felhasználó sikeresen törölve!' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/* Ha egy fájl require-el behivatkozza ezt a fájlt, akkor a hivatkozás helyére a module.exports-ban megadott objektum, funkció 
vagy változó fog bekerülni */
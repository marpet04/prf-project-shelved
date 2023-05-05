const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const expressSession = require('express-session');

const app = express();
const port = 3000;

mongoose.connect('mongodb+srv://admin:kiscica@prf-project-cluster.sp9g2fx.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function () {
  console.log('Connected to MongoDB successfully!');
});

const User = require('./db/userSchema');
const Book = require('./db/bookSchema');
const Shelf = require('./db/shelfSchema');
require('./db/bootstrapper')();

/*const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());*/


passport.use('local', new localStrategy(function (username, password, done) {
  User.findOne({ username: username }, function (err, user) {
      if (err) return done('Hiba lekeres soran', null);
      if (!user) return done('Nincs ilyen felhasználónév', null);
      user.comparePasswords(password, function (error, isMatch) {
          if (error) return done(error, false);
          if (!isMatch) return done('Hibas jelszo', false);
          return done(null, user);
      })
  })
}));


passport.serializeUser(function (user, done) {
  if (!user) return done('nincs megadva beléptethető felhasználó', null);
  return done(null, user);
});

passport.deserializeUser(function (user, done) {
  if (!user) return done("nincs user akit kiléptethetnénk", null);
  return done(null, user);
});

app.use(expressSession({ secret: 'prf2021lassananodejsvegereerunk', resave: true }));
app.use(passport.initialize());
app.use(passport.session());

const users = [{ name: 'Laca' }];

const whiteList = ['*'];
const corsOptions = {
    origin: (origin, callback) => {
        if (whiteList.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback('error')
        }
    }
};

app.use(bodyParser.json());
app.use(cors());

app.get('/hello', (req, res) => {
    res.json({ message: 'Hello World!' });
});

app.get('/api/users', (req, res) => {
    res.json(users);
});

app.post('/api/user', (req, res) => {
    console.log(req.body);
    const user = req.body.user;
    users.push(user);
    res.json("user addedd");
});

/* app.get('/', (req, res, next) => {
    next();
}); */

app.use('/', require('./routes'));

/* app.use((req, res, next) => {
    console.log('404');
    res.status(404).send('Error: 404 Page Not Found!');
}); */

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});
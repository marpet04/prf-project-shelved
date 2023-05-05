const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique : true
  },
  password: {
    type: String,
    required: true,
  },
  accessLevel: {
    type: Number,
    required: true,
    default: 1,
  },
  birthDate: {
    type: Date,
    required: true,
  }
});

userSchema.pre('save', function(next) {
  const user = this;
  if(user.isModified('password')) {
      bcrypt.genSalt(10, function(err, salt) {
          if(err) {
              console.log('Error during salt generation');
              return next(error);
          }
          bcrypt.hash(user.password, salt, function(error, hash) {
              if(error) {
                  console.log('Error during hashing');
                  return next(error);
              }
              user.password = hash;
              return next();
          })
      })
  } else {
      return next();
  }
});

userSchema.methods.comparePasswords = function(password, nx) {
  bcrypt.compare(password, this.password, function(err, isMatch) {
      nx(err, isMatch);
  });
};

const User = mongoose.model('user', userSchema);

module.exports = User;
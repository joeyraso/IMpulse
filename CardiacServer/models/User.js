var bcrypt = require('bcrypt');
var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  email: { type: String, unique: true, lowercase: true},
  password: String,
  contacts: []
});

/**
 * Password hashing Mongoose middleware.
 */

userSchema.pre('save', function(next) {
  var user = this;

  if (!user.isModified('password')) { return next(); }
  bcrypt.genSalt(8, function(err, salt) {
    if (err) { return next(err); }
    bcrypt.hash(user.password, salt, function(err, hash) {
      if (err) { return next(err); }
      user.password = hash;
      next();
    });
  });
});

/**
 * Helper method for validationg user's password.
 */

userSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) { return cb(err); }
    cb(null, isMatch);
  });
};

module.exports = mongoose.model('User', userSchema);

var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var userSchema = mongoose.Schema({
  local: {
    email: String,
    password: String
  },
  facebook: {
    id: String,
    token: String,
    email: String,
    name: String
  },
  twitter: {
    id: String,
    token: String,
    displayName: String,
    username: String
  },
  google: {
    id: String,
    token: String,
    email: String,
    name: String
  }
});

// Methods

userSchema.methods.generateHash = function(password) {
  var salt = bcrypt.genSaltSync(8);
  return bcrypt.hashSync(password, salt, null);
};

userSchema.methods.validPassword = function(password) {
  var localPassword = this.local.password;
  return bcrypt.compareSync(password, localPassword);
};

// compile the model and expose
module.exports = mongoose.model('User', userSchema);

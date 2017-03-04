// CRUD Mongoose model required to create records in the MongoDB database.

var mongoose = require('mongoose');

// define the model
module.exports = mongoose.model('Nerd', {
  name: { type: String, default: '' }
});

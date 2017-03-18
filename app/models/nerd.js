// CRUD Mongoose model required to create records in the MongoDB database.

var mongoose = require('mongoose');

// define the schema: MongoDB will automatically generate an _id for each
var nerdSchema = mongoose.Schema({
  name: { type: String, default: '' }
});

// add methods to the schema before compiling it
nerdSchema.methods.speak = function() {
  console.log(`Hello, I am {this.name}`);
};

// compile the model and expose
module.exports = mongoose.model('Nerd', nerdSchema);

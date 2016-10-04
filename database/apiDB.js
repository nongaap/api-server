var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/apiDB');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to API DB.');
});


module.exports = db;

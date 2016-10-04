var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var sandboxKey = new Schema({
  apiKey: {type: String, required: true},
  secretKey: {type: String, required: true}
});


var sandboxSchema = new Schema({
  sandbox: { type: String, required: true },
  api: sandboxKey
});


module.exports = {
  Sandbox: mongoose.model('Sandbox', sandboxSchema),
  Api: mongoose.model('Api', sandboxKey)
};

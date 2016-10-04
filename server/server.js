var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var api = require('./routes/api');
var create = require('./routes/create');

var port = 3000;

var app = express();

var server = app.listen(port, function() {
  console.log('listening on port 3000');
});

app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(bodyParser.json());

app.use('/api', api);

app.use('/create', create);

app.get('/', function (req, res) {
	res.status(200).send('Hi. Homepage');
});

app.all('*', function (req, res) {
  res.status(404).send('Nothing There');
});

module.exports = server;

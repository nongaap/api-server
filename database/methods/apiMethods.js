var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var uuid = require('node-uuid');
var Model = require('../model/apiModel');

//Create an API key using UUID v4 which generates from random (or pseudo-random) id. 
function generateKey(){
  return uuid.v4();
}

// adds new sandbox to the database
function addSandbox(req, res, next) {
  var newSandbox = {
    sandbox: req.body.sandbox,
    api: {
      apiKey: generateKey(),
      secretKey: generateKey()
    }
  };

  Model.Sandbox.create(newSandbox, function (error, result) {
    if (error) {
      res.status(500).send('Server Error');
    } else {
      res.status(200).send(result);
    }
  });
}

//Parse keys from req.headers.authorization
function parseKey(req, res, next) {
  if(!req.headers.authorization){
    res.json({ error: 'Credentials missing' });
  } else {
    var encoded = req.headers.authorization.split(' ')[1];
    var decoded = new Buffer(encoded, 'base64').toString('utf8');
    res.locals.apikey = {
      key: decoded.split(':')[0],
      access: decoded.split(':')[1]
    }
    next();
  }
}

//Query database to confirm api key and secret/client key match id route
function keyCheck(req, res, next) {
  Model.Sandbox.findById(req.params.id, function (err, result) {
    if(result === null) {
      res.status(400).send('Invalid ID');
    } else if(result.api.apiKey === res.locals.apikey.key && result.api.secretKey === res.locals.apikey.access) {
      next();
    } else {
      res.status(400).send('Invalid Key');
    }
  })
}

function getItem(req, res) {
  Model.Sandbox.findById(req.params.id, function (error, result) {
    if(error) {
      res.status(500).send('Server Error');
    } else {
      res.status(200).send(result.sandbox);
    }
  })
}

function postItem(req, res) {
  res.status(200).send('Cannot Post');
}

function putItem(req, res) {
  if(req.body.sandbox === undefined || typeof req.body.sandbox !== 'string') {
    res.status(400).send('Input error. Req.body.sandbox is required in string format')
  } else {
    Model.Sandbox.findByIdAndUpdate(req.params.id, {sandbox : req.body.sandbox}, function (error, result){
      if(error) {
        res.status(500).send('Server Error');
      } else {
        res.status(200).send('updated');
      }
    })
  }
}

function deleteItem(req, res) {
  res.status(200).send('Cannot Delete');
}

module.exports = {
  addSandbox: addSandbox,
  parseKey: parseKey,
  keyCheck: keyCheck,
  getItem: getItem,
  postItem: postItem,
  putItem: putItem,
  deleteItem: deleteItem
};

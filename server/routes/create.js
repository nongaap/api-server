var express = require('express');
var apiMethods = require('../../database/methods/apiMethods');
var db = require('../../database/apiDB');

var router = express.Router()

router.post('/',
  apiMethods.addSandbox
);

module.exports = router;

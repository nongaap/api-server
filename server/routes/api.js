var express = require('express');
var apiMethods = require('../../database/methods/apiMethods');
var db = require('../../database/apiDB');

var router = express.Router()

router.get('/:id', 
  apiMethods.parseKey,
  apiMethods.keyCheck,
  apiMethods.getItem
);

router.post('/:id',
  apiMethods.parseKey,
  apiMethods.keyCheck,
  apiMethods.postItem
);

router.put('/:id',
  apiMethods.parseKey,
  apiMethods.keyCheck,
  apiMethods.putItem
);

router.delete('/:id',
  apiMethods.parseKey,
  apiMethods.keyCheck,
  apiMethods.deleteItem
);

module.exports = router;


'use strict';
var express = require('express');
var router = express.Router();

var controller = require('controller');

/* GET home page. */
router.get('/', function(req, res, next) {
  var profiles = controller.getProfiles();

  res.send( { profiles: profiles });
});

module.exports = router;

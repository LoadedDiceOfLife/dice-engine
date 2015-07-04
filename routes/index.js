'use strict';
var express = require('express');
var router = express.Router();

var controller = require('controller');

/* GET home page. */
router.get('/', function(req, res, next) {

  var regex = /(\d+)&(\d+)/g;
  var locations = [];
  var _locations = regex.exec(req.params.locations);
  locations[0] = _locations[1];
  locations[1] = _locations[2];
  var profiles = controller.getData(locations, controller.getProfile);

  res.send( { profiles: profiles });
});

module.exports = router;

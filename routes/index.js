'use strict';
var express = require('express');
var router = express.Router();

var Controller = require('./controller');
var controller = new Controller();

/* GET home page. */
router.get('/', function(req, res, next) {
  var locations = req.query.locations;
  console.log(controller)
  var profiles = controller.getData(locations, controller.getProfile);

  res.send( { profiles: profiles });
});

module.exports = router;

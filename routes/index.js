'use strict';
var express = require('express');
var router = express.Router();

var Controller = require('./controller');
var controller = new Controller();

/* GET home page. */
router.get('/', function (req, res, next) {
  var locations = req.query.locations;
  console.log(controller)
  return controller.getData(locations)
    .then(function (profiles) {
      res.send({
        profiles: profiles
      });

    });

});

module.exports = router;
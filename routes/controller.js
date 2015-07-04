'use strict';

var MongoClient = require('mongodb').MongoClient

var url = 'mongodb://localhost:27017';

var Controller = function () {};


Controller.prototype.getData = function (locations, callback) {
  MongoClient.connect(url, function (err, db) {


    var collection = db.collection('test_database');
    // Find some documents 
    var docs = []
    collection.find({code: locations[0]}).toArray(function (err, _docs) {
      docs.push(_docs);
    });

    collection.find({code: locations[1]}).toArray(function (err, _docs) {
      docs.push(_docs);
    });

    callback(docs);


    db.close();
  });
};

Controller.prototype.getProfiles = function (data) {

};

module.exports.controller = new Controller();
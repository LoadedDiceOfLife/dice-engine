'use strict';

var Controller = function () {};
var MongoClient = require('mongodb').MongoClient;
var url = 'http://strato.oberkirch.org:27017';



Controller.prototype.getProfile = function (locations) {
  MongoClient.connect(url, function (err, db) {


    var collection = db.collection('documents');
    // Find some documents 
    collection.find({}).toArray(function (err, docs) {
      console.dir(docs);
      callback(docs);
    });



    db.close();
  });
};

module.exports.controller = new Controller();
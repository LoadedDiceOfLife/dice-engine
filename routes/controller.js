'use strict';

var MongoClient = require('mongodb').MongoClient

var url = 'mongodb://127.0.0.1:27017/test_database';

function Controller() {};


Controller.prototype.getData = function (locations, callback) {
  MongoClient.connect(url, function (err, db) {

    var collection = db.collection('area_data');

    // Find some documents 
   // var docs = [];
    var code = parseInt(locations[0]);
    collection.find({code: code}).toArray(function(err, docs) {
      console.log('docs', err, docs)
    });

    console.log(docs)

    // collection.find({code: locations[1]}).toArray(function (err, _docs) {
    // console.log('docs',err);

    //   docs.push(_docs);
    // });
    return this.getProfiles(docs);


    //db.close();
  });
};

Controller.prototype.getProfiles = function (data) {
  console.log(docs)
  return docs;
};

module.exports = Controller;
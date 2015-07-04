'use strict';


var url = 'mongodb://localhost:27017/test_database';

var BBPromise = require('bluebird');
var MongoClient = BBPromise.promisifyAll(require('mongodb')).MongoClient;


function Controller() {}


Controller.prototype.getData = function (locations, callback) {
  var self = this;
  return MongoClient.connectAsync(url).then(function (db) {
    var collection = db.collection('area_data');
    // Find some documents 
    // var docs = [];
    return BBPromise.map(locations, function (location) {
      return collection.findAsync({
        code: parseInt(location)
      }).then(function (docs) {
        return docs.toArrayAsync();
      }).then(function (_docs) {
        return _docs[0];
      });
    }).then(function (_docs) {
      console.log('docs', _docs)
      return _docs;
    });
  });

};

Controller.prototype.getProfiles = function (data) {
  console.log(data)
  return data;
};

Controller.prototype.getRegions = function () {
  return MongoClient.connectAsync(url).then(function (db) {
    var collection = db.collection('area_data');
    // Find some documents 
    // var docs = [];
    return BBPromise.map(locations, function (location) {
      return collection.findAsync({}).then(function (docs) {
        return docs.toArrayAsync();
      }).then(function (_docs) {
        return _docs[0];
      });
    }).then(function (_docs) {
      console.log('docs', _docs)
      return _docs;
    });
  });

};

module.exports = Controller;
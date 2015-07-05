'use strict';


var url = 'mongodb://localhost:27017/test_database';
var alphaUrl = 'mongodb://localhost:27017/test_database_alpha';
var BBPromise = require('bluebird');
var MongoClient = BBPromise.promisifyAll(require('mongodb')).MongoClient;

var _ = BBPromise.promisifyAll(require('lodash'));


function Controller() {}


Controller.prototype.getData = function (locations, callback) {
  var self = this;
  return MongoClient.connectAsync(alphaUrl).then(function (db) {
    var collection = db.collection('area_data');
    // Find some documents 
    // var docs = [];
    // var _fake = ['Mahurangi', 'Norsewood-Herbertville']
    return BBPromise.map(locations, function (location) {
      console.log(location)
      return collection.findAsync({
        au: location
      }).then(function (docs) {
        return docs.toArrayAsync();
      }).then(function (_docs) {
        console.log('docs', _docs)
        return self.getProfiles(_docs[0]);
      });
    }).then(function (_docs) {
      // console.log('docs', _docs)
      // return self.getProfiles(_docs);
      return _docs;
    });
  });

};

Controller.prototype.getProfiles = function (profile) {
  console.log('profile', profile);
  var results = {};
  var educationInfo = [profile.education];
  var _key;
  var count = 0;
  return BBPromise.map(educationInfo, function (obj) {
    // console.log('loop', result,n,key)
    for (var prop in obj) {
      if (!(prop === 'Grand Total' || prop === 'Not elsewhere included' || prop === 'Total people highest qualification')) {
        console.log(_key)
        _key = obj[prop] > count ? prop : _key;
        count = obj[prop] > count ? obj[prop] : count;
      }
    }

    return _key;
  }).then(function () {
    console.log('KEYYYY', _key)
    var likelihood;
    if (!profile.housing) {
      likelihood = 0;
    } else {
      likelihood = profile.housing.houseOwnership;

    }
    var num = Math.random();
    var owns = num < likelihood ? true : false;
    results.displayLocation = profile.name;
    results.aulCode = profile.code;
    results.dc = profile.deprivation;
    results['age-0'] = {
      events: {}
    };
    results['age-1'] = {
      events: {}
    };
    results['age-2'] = {
      events: {}
    };
    results['age-3'] = {
      events: {}
    };
    results['age-4'] = {
      events: {}
    };
    results['age-1'].events.houseOwnership = owns;
    results['age-3'].events.education = _key;
    console.log(results);
    return results;
  });
  // console.log(_key)
  // _.reduce(educationInfo, function(result, n, key) {
  //   console.log('key', key)
  //   if (!(key === 'Grand Total' || key === 'Not elsewhere included' || key === 'Total people highest qualification')) {
  //     console.log('not')
  //     _key = n > result ? key : _key
  //     result = n > result ? n : result;
  //   }

  //   console.log(_key)
  //   return result;
  // }, 0);
  // console.log(_key)

  // var likelihood = profile.housing.houseOwnership;
  // var num = Math.random();
  // var owns = num < likelihood ? true : false;
  // results.displayLocation = profile.name;
  // results.aulCode = profile.code;
  // results.dc = profile.deprivation;
  // results['age-0'] = {events: {}};
  // results['age-1'] = {events: {}};
  // results['age-2'] = {events: {}};
  // results['age-3'] = {events: {}};
  // results['age-4'] = {events: {}};
  // results['age-1'].events.houseOwnership = owns;
  // results['age-3'].events.education = educationInfo[_key];
  // console.log(results);
  // return results;
};

Controller.prototype.getRegions = function () {
  var self = this;
  return MongoClient.connectAsync(url).then(function (db) {
    var areas = db.collection('area_data');
    var regions = db.collection('regions');
    // Find some documents 
    var areaDocs;
    var regionDocs;
    return areas.findAsync({})
      .then(function (docs) {
        return docs.toArrayAsync();
      }).then(function (areas) {
        console.log(areas)
        areaDocs = areas;
        return areaDocs;
      }).then(function () {
        return regions.findAsync({})
          .then(function (docs) {
            return docs.toArrayAsync();
          }).then(function (regions) {
            console.log('reg', regions);
            regionDocs = regions;
            return self.parseRegions({
              regionDocs: regionDocs,
              areaDocs: areaDocs
            });
          });
      });
  });

};

Controller.prototype.parseEducation = function (data) {
  var regions = data.regions[0];
  var auls = data.areaDocs;
  var result = {};

  return BBPromise.map(auls, function (aul) {
    result[aul]
  });

};

module.exports = Controller;
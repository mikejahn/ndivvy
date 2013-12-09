var request = require('request');
var _ = require('underscore');
var sphereKnn = require("sphere-knn");
var nDivvy = {};
nDivvy.url = "http://divvybikes.com/stations/json";

/**
* method to find a station by a given id
* params:  id, callback
*
**/
nDivvy.getStationById = function(id, callback) {
	
	request(nDivvy.url, function (error, response, body) {

		if(response.statusCode === 404) {
      callback(response.statusCode, "404 NOT FOUND");
 		}
    if(response.statusCode === 500) {
      callback(response.statusCode, "500 SERVER ERROR");
    }
  		if (!error && response.statusCode === 200) {

    		var stations = JSON.parse(body).stationBeanList;
    		var foundStation =  _.find(stations, function(station) {
				return station.id === id;
			});

      if(!foundStation){
        foundStation = {};
      }
			
      callback(response.statusCode, foundStation);
 		}
	});

  return this;

};

/**
* method to find nearby stations
* params:  lat (latitude), long (longitude), max_stations, callback
*
**/
nDivvy.nearbyStations = function(lat, long, max_stations, callback) {
	
	request(nDivvy.url, function (error, response, body) {
		if(response.statusCode === 404) {
      callback(response.statusCode, "404 NOT FOUND");
    }
    if(response.statusCode === 500) {
      callback(response.statusCode, "500 SERVER ERROR");
    }
  		if (!error && response.statusCode == 200) {
    		var stations = JSON.parse(body).stationBeanList;
    		var stationsArr = [];
  			_.each(stations, function(station) {
				stationsArr.push({
					latitude: station.latitude,
					longitude: station.longitude,
					station: station
				});

  			});

  		
  			var lookup = sphereKnn(stationsArr);

  			var nearestStations = lookup(lat, long);
  			if(max_stations) {
  				nearestStations = nearestStations.slice(0, max_stations);
  			}
        
  			callback(response.statusCode, nearestStations);
		}

	});
	
  return this;
};

exports.getStationById = nDivvy.getStationById;
exports.nearbyStations = nDivvy.nearbyStations;



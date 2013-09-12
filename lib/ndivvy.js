var request = require('request');
var _ = require('underscore');
var Deferred = require('JQDeferred');
var sphereKnn = require("sphere-knn");
var nDivvy = {};
nDivvy.url = "http://divvybikes.com/stations/json";


/**
* method to find a station by a given id
* params:  id
*
**/
nDivvy.getStationById = function(id) {
	var dfrd = Deferred(); // A Deferred to be resolved/rejected in response to the `request()`.
	
	request(nDivvy.url, function (error, response, body) {
		if(error) {
 			dfrd.reject(error, response);
 		}
  		if (!error && response.statusCode == 200) {

    		var stations = JSON.parse(body).stationBeanList;
    		var foundStation =  _.find(stations, function(station) {
				return station.id === id;
			});
			
			dfrd.resolve(response.statusCode, foundStation);
 		}
	});

	return dfrd.promise();
};


/**
* method to find nearby stations
* params:  lat (latitude), long (longitude), prefer (optional, "bikes" or "docks", will filter results to show open
* bikes or open stations, max_stations (optional, you can declare a max number to return)
*
**/
nDivvy.nearbyStations = function(lat, long, prefer, max_stations) {
	var dfrd = Deferred(); // A Deferred to be resolved/rejected in response to the `request()`.
	
	request(nDivvy.url, function (error, response, body) {
		if(error) {
 			dfrd.reject(error, response);
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

  			if(prefer){
  				if(prefer === "bikes") {
  					stationsArr = _.filter(stationsArr, function(station) {
  						return station.availableBikes > 0;
  					});
  				}
  				else if(prefer === "docks") {
  					stationsArr = _.filter(stationsArr, function(station) {
  						return station.availableDocks > 0;
  					});

  				} else {
  					dfrd.resolve(response.statusCode, "'Prefer' param only accepts 'bikes' or 'docks'");
  					return dfrd.promise();
  				}
  			}


  			var lookup = sphereKnn(stationsArr);


  			var nearestStations = lookup(lat, long);
  			if(max_stations) {
  				nearestStations = nearestStations.slice(0, max_stations);
  			}

  			dfrd.resolve(response.statusCode, nearestStations);
		}

	});
	
	return dfrd.promise();

};



exports.getStationById = nDivvy.getStationById;
exports.nearbyStations = nDivvy.nearbyStations;



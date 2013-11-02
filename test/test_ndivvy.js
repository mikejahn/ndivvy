var assert = require("assert");
var nDivvy = require('../lib/ndivvy.js');
var sinon = require("sinon");
var nock = require('nock');
var _ = require("underscore");


describe('nDivvy', function(){
	describe('getStationById', function(){

	  	var server = nock('http://divvybikes.com')
	                .get('/stations/json')
	                .once()
	                .reply(200, {stationBeanList: [{id: 1, stationName: "State St & Harrison St"},{id: 2, stationName: "test123"}]});

	    it('should return a status code of 200 and a station object when a station is present with given id', function(){
	      nDivvy.getStationById(1, function(statusCode, response){
	      	var id = JSON.parse(response.id);
	      	assert.equal(statusCode, 200);
	      	assert.equal(id, 1);
	      });
	    });

	    var server = nock('http://divvybikes.com')
	                .get('/stations/json')
	                .once()
	                .reply(200, {stationBeanList: [{id: 3, stationName: "State St & Harrison St"},{id: 2, stationName: "test123"}]});

	    it('should return a status code of 200 and an empty object if no station with given id is present', function(){
	      nDivvy.getStationById(1, function(statusCode, response){
	      	assert.equal(statusCode, 200);
	      	assert.equal(true,_.isEmpty(response));
	      });

	    });

	   
	    it('should return a status code of 404 when API not found', function(){
	    	  var server = nock('http://divvybikes.com')
	                .get('/stations/json')
	                .once()
	                .reply(404);
	      nDivvy.getStationById(5, function(statusCode, response){
	      	assert.equal(statusCode, 404);
	      	assert.equal(response, "404 NOT FOUND");
	      });

	    });

	    it('should return a status code of 500 when server error', function(){
	    	  var server = nock('http://divvybikes.com')
	                .get('/stations/json')
	                .once()
	                .reply(500);
	      nDivvy.getStationById(5, function(statusCode, response){
	      	assert.equal(statusCode, 500);
	      	assert.equal(response, "500 SERVER ERROR");
	      });

	    });

  	});

	describe('nearbyStations', function(){


		it('should return a status code of 200 and closest station if max is set to 1', function(){
			  	var server = nock('http://divvybikes.com')
	                .get('/stations/json')
	                .once()
	                .reply(200, {stationBeanList: [
	                	{ //close
							id: 44,
							stationName: "State St & Randolph St",
							availableDocks: 14,
							totalDocks: 27,
							latitude: 41.8847302006,
							longitude: -87.6277335692,
							statusValue: "In Service",
							statusKey: 1,
							availableBikes: 13,
							stAddress1: "State St & Randolph St",
							stAddress2: "",
							city: "",
							postalCode: "",
							location: "",
							altitude: "",
							testStation: false,
							lastCommunicationTime: null,
							landMark: "002"
						},
						{ //close
							id: 195,
							stationName: "Columbus Dr & Randolph St",
							availableDocks: 13,
							totalDocks: 23,
							latitude: 41.8853,
							longitude: -87.62077,
							statusValue: "In Service",
							statusKey: 1,
							availableBikes: 10,
							stAddress1: "Columbus Dr & Randolph St",
							stAddress2: "",
							city: "Chicago",
							postalCode: "",
							location: "",
							altitude: "",
							testStation: false,
							lastCommunicationTime: null,
							landMark: "263"
						},
						{ //far
							id: 337,
							stationName: "Clark St & Chicago Ave",
							availableDocks: 7,
							totalDocks: 19,
							latitude: 41.896544,
							longitude: -87.630931,
							statusValue: "In Service",
							statusKey: 1,
							availableBikes: 12,
							stAddress1: "Clark St & Chicago Ave",
							stAddress2: "",
							city: "Chicago",
							postalCode: "",
							location: "",
							altitude: "",
							testStation: false,
							lastCommunicationTime: null,
							landMark: "303"
						},
	               	]});  //end mock api call
			nDivvy.nearbyStations(41.8849,-87.6233, 1, function(statusCode, response) {
				var id = JSON.parse(response[0].station.id);
		      	assert.equal(statusCode, 200);
		      	assert.equal(id, 195);
			});
		});

 		it('should return a status code of 404 when API not found', function(){
	    	  var server = nock('http://divvybikes.com')
	                .get('/stations/json')
	                .once()
	                .reply(404);
	      nDivvy.nearbyStations(41.8849,-87.6233, 1, function(statusCode, response){
	      	assert.equal(statusCode, 404);
	      	assert.equal(response, "404 NOT FOUND");
	      });

	    });

	    it('should return a status code of 500 when server error', function(){
	    	  var server = nock('http://divvybikes.com')
	                .get('/stations/json')
	                .once()
	                .reply(500);
	      nDivvy.nearbyStations(41.8849,-87.6233, 1, function(statusCode, response){
	      	assert.equal(statusCode, 500);
	      	assert.equal(response, "500 SERVER ERROR");
	      });

	    });


	});

});
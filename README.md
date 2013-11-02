nDivvy - Node Package for Divvy JSON API
===========================

### Install
```
npm install ndivvy
```

### Using


```javascript
var nDivvy = require( "ndivvy" );`
```


# getStationById(id, callback)

Grab a station by given Id
Will return a statusCode and a response.
The response will look something like this:
```
{
id: 336,
stationName: "Cottage Grove Ave & 47th St",
availableDocks: 9,
totalDocks: 15,
latitude: 41.809855,
longitude: -87.606755,
statusValue: "In Service",
statusKey: 1,
availableBikes: 6,
stAddress1: "Cottage Grove Ave & 47th St",
stAddress2: "",
city: "Chicago",
postalCode: "",
location: "",
altitude: "",
testStation: false,
lastCommunicationTime: null,
landMark: "422"
}
```

###Usage
```javascript
nDivvy.getStationById(336, function(statusCode, response) {
  var station = response;
  console.log(station.id);
});
```

# nearbyStations(lat, long, max_stations, callback)

Will find the nearest stations near the given lat/long.
If max stations is defined, will limit to that number.
Will return a statusCode and a response.
The response will look something like this:
```
[ { latitude: 41.8853,
    longitude: -87.62077,
    station: 
     { id: 195,
       stationName: 'Columbus Dr & Randolph St',
       availableDocks: 13,
       totalDocks: 23,
       latitude: 41.8853,
       longitude: -87.62077,
       statusValue: 'In Service',
       statusKey: 1,
       availableBikes: 10,
       stAddress1: 'Columbus Dr & Randolph St',
       stAddress2: '',
       city: 'Chicago',
       postalCode: '',
       location: '',
       altitude: '',
       testStation: false,
       lastCommunicationTime: null,
       landMark: '263' } },
  { latitude: 41.8847302006,
    longitude: -87.6277335692,
    station: 
     { id: 44,
       stationName: 'State St & Randolph St',
       availableDocks: 14,
       totalDocks: 27,
       latitude: 41.8847302006,
       longitude: -87.6277335692,
       statusValue: 'In Service',
       statusKey: 1,
       availableBikes: 13,
       stAddress1: 'State St & Randolph St',
       stAddress2: '',
       city: '',
       postalCode: '',
       location: '',
       altitude: '',
       testStation: false,
       lastCommunicationTime: null,
       landMark: '002' } } ]
```

###Usage
```javascript
nDivvy.nearbyStations(41.8849,-87.6233, 1, function(statusCode, response){
  var station = response[0].station.id;
  console.log(id);
});
```




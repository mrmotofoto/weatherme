const request = require('request')

const geoCode = (address, cb) => {
  
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiZGphbmdvbGVzIiwiYSI6ImNqd2UyMHY1eDFja3Mzem82eWd3M3ZtZHcifQ.NlwhtuKge_f9D9xLW9DD4g&limit=1`;

  request({url, json:true}, (error, {body}) => {
    if(error) {
      cb('There was a problem connecting to location services', undefined)
    } else if(body.features.length === 0) {
      cb('Cant find the address you are looking for', undefined);
    } else {
        cb(undefined, {
          latitiude: body.features[0].center[1],
          longitude: body.features[0].center[0],
          location: body.features[0].place_name
        });
    }
  })
}


module.exports = geoCode;

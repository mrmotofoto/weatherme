const request = require('request');

const forecast = (lat, long, cb) => {
  const url = `https://api.darksky.net/forecast/ac20602f9c86cb655adff240a7f8ec83/${encodeURIComponent(lat)},${encodeURIComponent(long)}`

  request({url, json:true}, (err, {body}) => {
    if(err) {
      cb('There was a problem connecting to service', undefined)
    } else if(body.error) {
      cb('Cant find what you are looking for', undefined)
    } else {
      cb(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degress out. There is a ' + body.currently.precipProbability + '% chance of rain.')
    }
  })
}

module.exports = forecast;
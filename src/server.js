const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geoCode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

// DEFINE PATHS
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// SETUP HANDLEBARS ENGINE AND VIEWS LOCATION
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// SETUP PUBLIC DIRECTORY
app.use(express.static(publicDirectoryPath))


// ROUTES
app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'RJS'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Page!!!',
    name: 'RJS'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help Page!!!',
    name: 'RJS',
    msg: `This is a help message`,
    name: 'RJS'
  })
})

app.get('/weather', (req, res) => {
  if(!req.query.address) {
    return res.send({
      error: 'You must provide a vaild address!!!'
    })
  }
  const address = req.query.address
  geoCode(address, (error, {latitiude, longitude, location} = {}) => {
    if(error) {
      return res.send({error})
    } 
    forecast(latitiude, longitude, (error, forecastData) => {
      if(error) {
        return res.send({error})
      }
      res.send({
        forecast: forecastData,
        location,
        address
      })
    })
  })
})

app.get('/products', (req, res) => {
  if(!req.query.search) {
    return res.send({
      error: 'You must provide a search term'
    })
  }
  console.log(req.query.search)
  res.send({
    products: []
  })
})

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'RJS',
    msg: 'Page Not Found'
  })
 })

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'RJS',
    msg: 'Page Not Found'
  })
})

app.listen(port, () => {
  console.log('SERVER RUNNING PORT ' + port);
})
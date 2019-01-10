const express = require('express')
const app = express()
const bodyParser = require("body-parser")
const request = require("request")
const apiKey = process.env.apiKey;

app.set("view engine","ejs"); // look in views directory for ejs files
app.use(express.static('public')); // access static css sheets
app.use(bodyParser.urlencoded({ extended: true })); //grab info from form

app.get('/', function (req, res) {
  res.render("index");
})

app.post('/', function (req, res) {
  var city = req.body.city;
  var url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;
  request(url, function(err,response, body) {
    if (err) {
      res.render("index", {weather: null, error: "Please try again"})
    } else {
      var weather = JSON.parse(body);
      console.log(body);
      if (weather.main == undefined) {
        res.render("index", {weather: null, error: "Please try again"})
      } else {
        var weatherText = `It's ${weather.main.temp} degrees in ${weather.name}`
        res.render("index", {weather:weatherText, error: null})
      }
    }
  })
})

app.listen(process.env.PORT,process.env.IP, function () {
  console.log('Server has started')
})
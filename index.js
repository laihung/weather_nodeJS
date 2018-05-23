const request = require('request')
const express = require('express')
const cors = require('cors');
const app = express()

let apiKey = 'bbac8196ba4da7c8f1bc517385505607';

app.use(cors());
app.use('/v1/demo', express.static('html'));
app.get("/weather/:lon/:lat", function (req, res) {
  let lon = req.params.lon;
  let lat = req.params.lat;

  let url = `http://api.openweathermap.org/data/2.5/find?lat=${lat}&lon=${lon}&cnt=1&units=metric&appid=${apiKey}`;
  request.get(url, function (err, response, body) {
    if (err) {
      res.send(error);
    } else {
      let result = [];
      let weather = JSON.parse(body)

      for (let i = 0; i < weather.list.length; i++) {
        let list = weather.list[i];

        //Format the returned JSON
        let obj = {
          'city': list.name,
          'temp': Math.round(list.main.temp),
          'dateTime': list.dt,
          'icon' : `http://openweathermap.org/img/w/${list.weather[0].icon}.png`

        };
        result.push(obj);
      }
      res.send(result);
    }
  });
});

// Constants
const PORT = 3000;
const HOST = '0.0.0.0';

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);

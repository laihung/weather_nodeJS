const Weather = require('./weather.model')
const request = require('request')
const express = require('express')
const cors = require('cors');
const app = express()
require('dotenv').config();

app.use(cors());
app.use('/weather', express.static('html'));

app.get("/weather/:lon/:lat", function (req, res) {

    //Replace with API Key
    const apiKey = process.env.API_KEY || '';

    //API key missing
    if (!apiKey) {
        res.status(500).json({
            code: 500,
            error: 'Missing API Key'
        });
        return;
    }

    //Get from query string
    let lon = req.params.lon;
    let lat = req.params.lat;

    let url = `http://api.openweathermap.org/data/2.5/find?lat=${lat}&lon=${lon}&cnt=1&units=metric&appid=${apiKey}`;

    request.get(url, function (err, response, body) {
        let weather = JSON.parse(body)
        
        if (err) {
            res.status(500).json({
                code: 500,
                error: 'API temporary unavailable'
            });
            return;
        }

        if (weather.cod != 200) {
            res.status(500).json({
                code: 500,
                error: 'There is an error on the returned API'
            });
            return;
        }

        let result = [];
        
        //Using for-loop, in case in future there will be more than 1 data needed
        for (let i = 0; i < weather.list.length; i++) {
            let list = weather.list[i];
            result.push(new Weather(list.name, list.main.temp, list.dt, list.weather[0].icon));
        }
        res.json(result);

    });
});

module.exports = app;
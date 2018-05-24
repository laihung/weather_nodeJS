const icon_url = 'http://openweathermap.org/img/w/{ICON}.png'; 

let Weather = function (city, temp, dateTime, icon) {
    this.city = city;
    this.temp = Math.round(temp);
    this.dateTime = dateTime;
    this.icon = icon_url.replace('{ICON}', icon);
}

module.exports = Weather;
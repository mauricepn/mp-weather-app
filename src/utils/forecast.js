const request = require("request");
require("dotenv").config();

const forecast = (latitude, longitude, callback) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.WEATHER_API_KEY}&units=imperial`;

  request({ url, json: true }, (error, resposne) => {
    if (error) {
      return callback("Cannot connect to weather server!");
    } else if (resposne.body.error || resposne.body.cod !== 200) {
      return callback("Location not found on weather server!");
    } else {
      const currentMain = resposne.body.main;
      const weatherDetail = resposne.body.weather[0];

      callback(
        undefined,
        ` it is currently ${currentMain.temp} degrees out. Today's high will be ${currentMain.temp_max} with a low of ${currentMain.temp_min}. it will be ${weatherDetail.description} outside `,
      );
    }
  });
};

module.exports = forecast;

const request = require("postman-request");

const locationWeather = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=7683c2bd8cc0267b1d5215f44b094d4d&query=${latitude},${longitude}`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather services", undefined);
    } else if (body.error) {
      callback("Unable to find the location", undefined);
    } else {
      const { current } = body;
      callback(
        undefined,
        `${current.weather_descriptions[0]} weather. It is currently ${current.temperature} degree out. It feels like ${current.feelslike} degree.`
      );
    }
  });
};

module.exports = locationWeather;

const request = require("postman-request");

const geoCode = (place, callBack) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json?access_token=pk.eyJ1IjoiZ2lsbHByZWV0IiwiYSI6ImNrenQwa3QwMDBhdW4ydW1ocGFvcGxnZXcifQ.x9Vz1EoMguvkfCAgD0nTgA&limit=1`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callBack("Unable to connect to the location services", undefined);
    } else if (body.features.length === 0) {
      callBack("Unable to find the location. Try another location", undefined);
    } else {
      callBack(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name,
      });
    }
  });
};

module.exports = geoCode;

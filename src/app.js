const express = require("express");
const path = require("path");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");
const { error } = require("console");

const app = express();
const publicDirectoryPath = path.join(__dirname, "../public");

app.use(express.static(publicDirectoryPath));

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({ error: "Please provide and address!" });
  } else {
    geocode(
      req.query.address,
      (error, { latitude, longitude, location } = {}) => {
        if (error) {
          return res.send({ error });
        }
        forecast(latitude, longitude, (error, forecastData) => {
          if (error) {
            return res.send({ error: error });
          }
          res.send({
            location,
            forecast: forecastData,
            address: req.query.address,
          });
        });
      },
    );
  }
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});

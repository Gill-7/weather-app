const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geoCode = require("./utils/geoCode");
const locationWeather = require("./utils/locationWeather");

const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express config
const publicPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Gillpreet",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    name: "Gillpreet",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    message: "this is a help page",
    title: "Help",
    name: "Gillpreet",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Must provide the address!",
    });
  }

  geoCode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }
      locationWeather(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }
        res.send({
          forecast: forecastData,
          location,
          address: req.query.address,
        });
      });
    }
  );
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({ error: "You must provide search term" });
  }
  console.log(req.query);
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    errorText: "Help article not found!",
    title: "404",
    name: "Gillpreet",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    errorText: "Page not found!",
    title: "404",
    name: "Gillpreet",
  });
});

app.listen(port, () => {
  console.log("Server running at port: " + port);
});

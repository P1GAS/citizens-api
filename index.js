const fs = require("fs");

require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

const City = require("./models/city");
const Citizen = require("./models/citizen");

const citiesMockData = JSON.parse(fs.readFileSync("./mocks/cities.json"));
const citizensMockData = JSON.parse(fs.readFileSync("./mocks/citizens.json"));

const cityRoute = require("./routes/city");
const citizenRoute = require("./routes/citizen");

app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

app.use("/api/cities", cityRoute);
app.use("/api/citizens", citizenRoute);

mongoose.connect(
  process.env.MONGO_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) {
      return console.log("Mongoose error is " + err);
    }
    app.listen(process.env.API_PORT, () => {
      console.log("Server is running");

      (async () => {
        const cities = await City.count();

        if (!cities) {
          City.insertMany(citiesMockData);
        }

        const citizens = await Citizen.count();

        if (!citizens) {
          Citizen.insertMany(citizensMockData);
        }
      })();
    });
  }
);

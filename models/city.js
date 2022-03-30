const { Schema, model } = require("mongoose");

const CitySchema = new Schema({
  _id: Number,
  name: String,
  data: Number,
});

module.exports = model("City", CitySchema);

const { Schema, model } = require("mongoose");

const CitizenSchema = new Schema({
  name: String,
  city_id: Number,
  groups: [
    {
      $type: String,
      name: String,
    },
  ],
});

module.exports = model("Citizen", CitizenSchema);

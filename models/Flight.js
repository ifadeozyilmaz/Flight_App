const mongoose = require("mongoose");

const FlightSchema = new mongoose.Schema({
  flightDirection: String,
  prefixIATA: String,
  prefixICAO: String,
  scheduleDateTime: Date,
  actualLandingTime: Date,
  price: Number,
  duration: Number,
});

const Flight = mongoose.model("Flight", FlightSchema);

module.exports = Flight;

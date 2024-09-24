const express = require("express");
const morgan = require("morgan");
const https = require("https");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const Flight = require("./models/Flight");

const app = express();
const PORT = process.env.PORT || 8080;

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Failed to connect to MongoDB", err));

// HTTP logger
app.use(morgan("tiny"));

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(express.json()); //Middleware

// Flight data request
app.get("/flights", (req, res) => {
  const options = {
    method: "GET",
    hostname: "api.schiphol.nl",
    path: "/public-flights/flights",
    headers: {
      resourceversion: "v4",
      app_id: process.env.SCHIPHOL_APP_ID,
      app_key: process.env.SCHIPHOL_APP_KEY,
    },
  };

  const flightReq = https.request(options, (flightRes) => {
    let chunks = [];

    flightRes.on("data", (chunk) => {
      chunks.push(chunk);
    });

    flightRes.on("end", () => {
      const body = Buffer.concat(chunks);
      try {
        const json = JSON.parse(body.toString());
        res.json(json); // Send JSON response to frontend
      } catch (err) {
        console.error("Error parsing response from API:", err.message);
        res.status(500).send("Error parsing response from API");
      }
    });
  });

  flightReq.on("error", (error) => {
    console.error("Error making request to external API:", error);
    res.status(500).send("API request failed");
  });

  flightReq.end();
});

// Save flight to MongoDB
app.post("/book-flight", async (req, res) => {
  try {
    const { flight } = req.body;
    const newFlight = new Flight(flight);
    await newFlight.save(); // Save flight to MongoDB
    res
      .status(201)
      .json({ message: "Flight booked successfully", flight: newFlight });
  } catch (err) {
    console.error("Failed to save flight:", err);
    res.status(500).json({ message: "Failed to book flight" });
  }
});

// Fetch all saved flights from MongoDB
app.get("/my-flights", async (req, res) => {
  try {
    const flights = await Flight.find();
    res.status(200).json(flights);
  } catch (err) {
    console.error("Failed to fetch flights:", err);
    res.status(500).json({ message: "Failed to fetch saved flights" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log("Server is running on PORT " + PORT);
});

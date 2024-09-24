import React from "react";
import { Card, CardContent, Grid, Typography, Button } from "@mui/material";
import { FlightTakeoff } from "@mui/icons-material";
import dayjs from "dayjs";
import axios from "axios";

const FlightCard = ({ flight }) => {
  if (!flight) {
    return null;
  }

  const {
    scheduleDateTime,
    actualLandingTime,
    flightDirection,
    prefixIATA,
    prefixICAO,
  } = flight;
  const departureTime = dayjs(scheduleDateTime).format("HH:mm A");
  const arrivalTime = dayjs(actualLandingTime).format("HH:mm A");
  const flightDuration = dayjs(actualLandingTime).diff(
    dayjs(scheduleDateTime),
    "minute"
  );

  //Add selected flight to mongodb
  const handleBookFlight = async () => {
    try {
      const response = await axios.post("http://localhost:8080/book-flight", {
        flight,
      });
      console.log(response.data.message);
    } catch (error) {
      console.error("Failed to book flight:", error);
    }
  };
  return (
    <Card sx={{ marginTop: "2rem", borderRadius: "1rem" }}>
      <CardContent>
        <Typography
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            fontWeight: "bold",
          }}
        >
          {flightDirection}
        </Typography>
        <Grid container alignItems="center">
          <Grid item xs={4}>
            <Typography variant="subtitle1" color="textSecondary">
              Departure
            </Typography>
            <Typography variant="h6">{departureTime}</Typography>
            <Typography variant="body2" color="textSecondary">
              Airport: {prefixIATA}
            </Typography>
          </Grid>

          <Grid item xs={4} container direction="column" alignItems="center">
            <FlightTakeoff fontSize="large" sx={{ color: "#4a0096" }} />
            <Typography variant="body2">
              {Math.floor(flightDuration / 60)} h {flightDuration % 60} m
              (Nonstop)
            </Typography>
          </Grid>

          <Grid item xs={4}>
            <Typography variant="subtitle1" color="textSecondary">
              Arrival
            </Typography>
            <Typography variant="h6">{arrivalTime}</Typography>
            <Typography variant="body2" color="textSecondary">
              Airport: {prefixICAO}
            </Typography>
          </Grid>
        </Grid>

        <Grid container alignItems="flex-start" mt={3}>
          <Grid item>
            <Typography variant="h6" color="#4a0096" fontWeight="bold">
              Price: $200
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Round Trip
            </Typography>
          </Grid>
          <Grid item container justifyContent="flex-end">
            <Button
              variant="contained"
              color="primary"
              onClick={handleBookFlight}
              sx={{
                width: "10rem",
                height: "4rem",
                backgroundColor: "#4a0096",
              }}
            >
              Book Flight
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default FlightCard;

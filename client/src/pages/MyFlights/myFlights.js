import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { CardContent, Typography, Card, Grid } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import axios from "axios";

export default function MyFlights() {
  const [savedFlights, setSavedFlights] = useState([]);

  useEffect(() => {
    const fetchSavedFlights = async () => {
      try {
        const response = await axios.get("http://localhost:8080/my-flights");
        setSavedFlights(response.data);
      } catch (error) {
        console.error("Failed to fetch saved flights:", error);
      }
    };

    fetchSavedFlights();
  }, []);

  const ButtonStyles = {
    color: "#000",
    border: "0.5px solid gray",
    margin: "1rem",
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" elevation={0} sx={{ backgroundColor: "white" }}>
        <Toolbar>
          <Button sx={ButtonStyles}>Times</Button>
          <Button sx={ButtonStyles}>Stops</Button>
          <Button sx={ButtonStyles}>Airlines</Button>
          <Button sx={ButtonStyles}>Airports</Button>
          <Button sx={ButtonStyles}>Amenities</Button>
          <Button sx={{ color: "#3498db", marginLeft: "1rem" }}>
            Edit Search <KeyboardArrowDownIcon />
          </Button>
        </Toolbar>
      </AppBar>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          margin: "2rem",
        }}
      >
        <Typography sx={{ display: "flex", flexDirection: "row" }}>
          Sort by: Recommended <KeyboardArrowDownIcon />
        </Typography>
        <Typography sx={{ display: "flex", flexDirection: "row" }}>
          <ErrorOutlineIcon sx={{ color: "#3498db", marginRight: "0.5rem" }} />{" "}
          Avg Fare: $225
        </Typography>
      </Box>
      {savedFlights.length > 0 ? (
        savedFlights.map((flight, index) => (
          <Grid item xs={12} key={index}>
            <Card sx={{ margin: "2rem", borderRadius: "1rem" }}>
              <CardContent
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                  margin: "2rem",
                }}
              >
                <Typography>
                  Flight from {flight.prefixIATA} to {flight.prefixICAO}
                </Typography>
                <Typography>
                  Departure:{" "}
                  {new Date(flight.scheduleDateTime).toLocaleString()}
                </Typography>
                <Typography>
                  Arrival: {new Date(flight.actualLandingTime).toLocaleString()}
                </Typography>
                <Typography>Price: ${flight.price}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))
      ) : (
        <Typography sx={{ margin: "2rem" }}>No saved flights found.</Typography>
      )}
    </Box>
  );
}

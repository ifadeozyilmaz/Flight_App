import React, { useState } from "react";
import Header from "../../components/Header/header";
import FlightSearch from "../../components/Flight/flightSearch";
import { Box, Grid } from "@mui/material";
import FlightCard from "../../components/Flight/flightCard";
import Sidebar from "../../components/Sidebar/sidebar";
import ImageLinks from "../../components/ImagesBox/images";

export default function Home() {
  const [flights, setFlights] = useState([]);

  const handleFlightsFound = (fetchedFlights) => {
    setFlights(fetchedFlights);
  };

  return (
    <Box sx={{ flexGrow: 1, marginInline: "2rem" }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Header />
        </Grid>

        <Grid container item xs={12} spacing={2}>
          <Grid item xs={12} md={9}>
            <Grid container direction="column" spacing={2}>
              <Grid item xs={12}>
                <FlightSearch onFlightsFound={handleFlightsFound} />
              </Grid>

              <Grid container item spacing={2}>
                <Grid item xs={9} md={9}>
                  {flights.length > 0 ? (
                    flights.map((flight, index) => (
                      <FlightCard key={index} flight={flight} />
                    ))
                  ) : (
                    <p>Please Select Flight.</p>
                  )}
                </Grid>
                <Grid item xs={3} md={3}>
                  <Sidebar />
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} md={3}>
            <ImageLinks />
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

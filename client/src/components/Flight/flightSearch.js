import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  ToggleButtonGroup,
  ToggleButton,
  InputAdornment,
} from "@mui/material";
import { FlightTakeoff, FlightLand, Flight } from "@mui/icons-material";
import EventIcon from "@mui/icons-material/Event";
import axios from "axios";

export default function FlightSearch({ onFlightsFound }) {
  const [tripType, setTripType] = useState("round");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleTripType = (event, newTripType) => {
    setTripType(newTripType);
  };

  const handleShowFlights = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get("http://localhost:8080/flights", {
        params: {
          from,
          to,
          departureDate,
          returnDate: tripType === "round" ? returnDate : undefined,
        },
      });

      const fetchedFlights = response.data.flights;
      console.log(fetchedFlights);
      onFlightsFound(fetchedFlights);
    } catch (error) {
      setError("Failed to fetch flight data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: "white",
        borderRadius: "1rem",
        padding: "1.5rem",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        display="flex"
        width="100%"
        justifyContent="space-between"
        alignItems="center"
      >
        <Box fontWeight="bold" display="flex" alignItems="center">
          <Flight sx={{ transform: "rotate(90deg)", margin: "0.3rem" }} /> BOOK
          YOUR FLIGHT
        </Box>

        <ToggleButtonGroup
          value={tripType}
          exclusive
          onChange={handleTripType}
          aria-label="trip type"
          sx={{ backgroundColor: "#f1eef6", borderRadius: "2rem" }}
        >
          <ToggleButton
            value="round"
            sx={{
              borderRadius: "1.5rem",
              color: tripType === "round" ? "white" : "#4a0096",
              backgroundColor: tripType === "round" ? "#4a0096" : "transparent",
              textTransform: "none",
              "&.Mui-selected": {
                backgroundColor: "#4a0096",
                color: "#FFFF",
              },
            }}
          >
            Round trip
          </ToggleButton>

          <ToggleButton
            value="one-way"
            sx={{
              borderRadius: "1.5rem",
              color: tripType === "one-way" ? "white" : "#4a0096",
              backgroundColor:
                tripType === "one-way" ? "#4a0096" : "transparent",
              textTransform: "none",
              "&.Mui-selected": {
                backgroundColor: "#4a0096",
                color: "#FFFF",
              },
            }}
          >
            One way
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>

      <Box display="flex" gap={1} mt={2} justifyContent="center">
        <TextField
          label=""
          placeholder="From"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <FlightTakeoff sx={{ color: "#4a0096" }} />
              </InputAdornment>
            ),
          }}
          sx={{
            width: "25%",
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderRadius: "1.5rem 0 0 1.5rem",
              },
            },
          }}
        />

        <TextField
          label=""
          placeholder="To"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <FlightLand sx={{ color: "#4a0096" }} />
              </InputAdornment>
            ),
          }}
          sx={{
            width: "25%",
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderRadius: "0 1.5rem 1.5rem 0",
              },
            },
          }}
        />

        <TextField
          type="date"
          value={departureDate}
          onChange={(e) => setDepartureDate(e.target.value)}
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EventIcon sx={{ color: "#4a0096" }} />
              </InputAdornment>
            ),
          }}
          sx={{
            width: "25%",
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderRadius: "1.5rem 0 0 1.5rem",
              },
            },
          }}
        />

        {tripType === "round" && (
          <TextField
            type="date"
            value={returnDate}
            onChange={(e) => setReturnDate(e.target.value)}
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EventIcon sx={{ color: "#4a0096" }} />
                </InputAdornment>
              ),
            }}
            sx={{
              width: "25%",
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderRadius: "0 1.5rem 1.5rem 0",
                },
              },
            }}
          />
        )}
      </Box>

      <Button
        sx={{
          backgroundColor: "#4a0096",
          textTransform: "none",
          color: "white",
          width: "10rem",
          height: "3.5rem",
          borderRadius: "0.7rem",
          marginTop: "1.5rem",
          "&:hover": {
            backgroundColor: "#38006b",
          },
        }}
        onClick={handleShowFlights}
        disabled={loading}
      >
        {loading ? "Searching..." : "Show Flights"}
      </Button>
      {error && <Box color="red">{error}</Box>}
    </Box>
  );
}

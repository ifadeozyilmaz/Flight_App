import React from "react";
import {
  Box,
  Typography,
  FormControl,
  Select,
  MenuItem,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";

const Sidebar = () => {
  const radioStyles = {
    color: "#4a0096",
    "&.Mui-checked": { color: "#4a0096" },
  };

  return (
    <Box p={2}>
      <Typography variant="h6">Sort by:</Typography>
      <FormControl fullWidth>
        <Select
          defaultValue="lowestPrice"
          sx={{
            backgroundColor: "white",
            borderRadius: "1rem",
            "& fieldset": { border: "none" },
          }}
        >
          <MenuItem value="lowestPrice">Lowest Price</MenuItem>
          <MenuItem value="highestPrice">Highest Price</MenuItem>
        </Select>
      </FormControl>

      <Box
        mt={2}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
        }}
      >
        <Typography variant="h6">Arrival Time:</Typography>
        <FormControl component="fieldset">
          <RadioGroup defaultValue="morning">
            <FormControlLabel
              value="morning"
              control={<Radio sx={radioStyles} />}
              label="5:00 AM - 11:59 AM"
            />
            <FormControlLabel
              value="afternoon"
              control={<Radio sx={radioStyles} />}
              label="12:00 PM - 5:59 PM"
            />
          </RadioGroup>
        </FormControl>
      </Box>

      <Box
        mt={2}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
        }}
      >
        <Typography variant="h6">Stops:</Typography>
        <FormControl component="fieldset">
          <RadioGroup defaultValue="nonstop">
            <FormControlLabel
              value="nonstop"
              control={<Radio sx={radioStyles} />}
              label="Nonstop"
            />
            <FormControlLabel
              value="1stop"
              control={<Radio sx={radioStyles} />}
              label="1 Stop"
            />
            <FormControlLabel
              value="2+stops"
              control={<Radio sx={radioStyles} />}
              label="2+ Stops"
            />
          </RadioGroup>
        </FormControl>
      </Box>

      <Box
        mt={2}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
        }}
      >
        <Typography variant="h6">Airlines Included:</Typography>
        <FormControl component="fieldset">
          <RadioGroup defaultValue="Alitalia">
            <FormControlLabel
              value="Alitalia"
              control={<Radio sx={radioStyles} />}
              label="Alitalia"
            />
            <FormControlLabel
              value="Lufthansa"
              control={<Radio sx={radioStyles} />}
              label="Lufthansa"
            />
            <FormControlLabel
              value="Air France"
              control={<Radio sx={radioStyles} />}
              label="Air France"
            />
            <FormControlLabel
              value="Brussels Airlines"
              control={<Radio sx={radioStyles} />}
              label="Brussels Airlines"
            />
          </RadioGroup>
        </FormControl>
      </Box>
    </Box>
  );
};

export default Sidebar;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AirplanemodeActiveIcon from "@mui/icons-material/AirplanemodeActive";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import PublicIcon from "@mui/icons-material/Public";
import {
  AppBar,
  Toolbar,
  Typography,
  Avatar,
  Box,
  Button,
  Menu,
  MenuItem,
} from "@mui/material";
import avatarImage from "../../assets/images/avatar.png";

export default function Header() {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMyFlightsClick = () => {
    handleMenuClose();
    navigate("/my-flights"); // Redirect to the My Flights page
  };

  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <AirplanemodeActiveIcon
            sx={{
              mr: 1,
              transform: "rotate(90deg)",
              backgroundColor: "#4a0096",
              color: "white",
              borderRadius: "50%",
              padding: "0.2rem",
            }}
          />
          <Typography variant="h6" color="#353535" fontWeight="bold">
            PLANE SCAPE
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <Button
            startIcon={<LocalOfferIcon />}
            sx={{ textTransform: "none", color: "#4a0096" }}
          >
            <Typography color="#353535">Deals</Typography>
          </Button>
          <Button
            startIcon={<PublicIcon />}
            sx={{ textTransform: "none", color: "#4a0096" }}
          >
            <Typography color="#353535">Discover</Typography>
          </Button>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "0.3rem",
              cursor: "pointer",
            }}
            onClick={handleMenuOpen}
          >
            <Avatar alt="Joane Smith" src={avatarImage} />
            <Typography color="#353535">Joane Smith</Typography>
          </Box>

          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            sx={{ marginTop: "2.5rem" }}
          >
            <MenuItem onClick={handleMenuClose}>
              <Typography color="#353535">Profile</Typography>
            </MenuItem>
            <MenuItem onClick={handleMyFlightsClick}>
              <Typography color="#353535">My Flights</Typography>
            </MenuItem>
            <MenuItem onClick={handleMenuClose}>
              <Typography color="#353535">Logout</Typography>
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

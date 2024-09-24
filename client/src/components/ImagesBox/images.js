import React from "react";
import { Box, Card, CardMedia, CardContent, Typography } from "@mui/material";
import carRentalsImg from "../../assets/images/car.jpg";
import hotelsImg from "../../assets/images/hotels.jpg";
import travelPackagesImg from "../../assets/images/travel.jpg";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import ApartmentIcon from "@mui/icons-material/Apartment";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";

const ImageLinks = () => {
  const imageLinks = [
    {
      title: "CAR RENTALS",
      img: carRentalsImg,
      link: "/car-rentals",
      icon: <DirectionsCarIcon sx={{ fontSize: "3rem" }} />,
      overlayColor: "rgba(255, 165, 0, 0.5)",
    },
    {
      title: "HOTELS",
      img: hotelsImg,
      link: "/hotels",
      icon: <ApartmentIcon sx={{ fontSize: "3rem" }} />,
      overlayColor: "rgba(133, 193, 233)",
    },
    {
      title: "TRAVEL PACKAGES",
      img: travelPackagesImg,
      link: "/travel-packages",
      icon: <BeachAccessIcon sx={{ fontSize: "3rem" }} />,
      overlayColor: "rgba(130, 224, 170)",
    },
  ];

  return (
    <Box mt={2}>
      {imageLinks.map((item) => (
        <Card
          key={item.title}
          sx={{ mb: 2, borderRadius: "1rem", position: "relative" }}
          elevation={0}
        >
          <CardMedia
            component="img"
            height="250"
            image={item.img}
            alt={item.title}
            sx={{ position: "relative" }}
          />
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: item.overlayColor,
              mixBlendMode: "multiply",
              borderRadius: "1rem",
              zIndex: 1,
            }}
          />
          <CardContent
            sx={{
              position: "absolute",
              bottom: 0,
              left: 0,
              p: 1,
              color: "white",
              display: "flex",
              alignItems: "start",
              flexDirection: "column",
              zIndex: 2,
            }}
          >
            {item.icon}
            <Typography sx={{ mt: 1, fontSize: "1.5rem", fontWeight: "bold" }}>
              {item.title}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default ImageLinks;

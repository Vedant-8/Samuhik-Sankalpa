import React from "react";
import { useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Box, IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";
import InstagramIcon from "@mui/icons-material/Instagram";
import XIcon from "@mui/icons-material/X";
import YouTubeIcon from "@mui/icons-material/YouTube";

const Navbar = () => {
  const navigate = useNavigate();

  // Styled Navigation Button
  const NavButton = styled("button")(({ theme }) => ({
    backgroundColor: "#ffffff", // White background
    color: "#007f3f", // Green text
    cursor: "pointer",
    fontSize: "1.2rem",
    fontWeight: "500",
    padding: "0.1rem 1.5rem",
    borderRadius: "0.5rem",
    transition: "all 0.3s ease-in-out",
    textTransform: "capitalize",
  }));

  return (
    <AppBar
      position="static"
      style={{
        backgroundColor: "#ffffff", // White background
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)", // Light shadow
      }}
    >
      <Toolbar className="flex justify-between items-center">
        {/* Website Name */}
        <Box
          className="cursor-pointer"
          onClick={() => navigate("/")}
          style={{
            fontFamily: "'Roboto', sans-serif",
            fontSize: "1.5rem",
            fontWeight: "bold",
            color: "#007f3f", // Green color for the website name
            marginLeft: "2rem", // Added margin to the left side
            flex: 1, // Make sure it centers the content
            transition: "color 0.3s ease-in-out", // Smooth transition for color on hover
          }}
          // Hover effect for the website name
          onMouseEnter={(e) => (e.target.style.color = "#005f2f")} // Darker green on hover
          onMouseLeave={(e) => (e.target.style.color = "#007f3f")} // Return to original green
        >
          Samuhik Sankalpa
        </Box>

        {/* Social Media Icons */}
        <Box className="flex gap-4">
          <IconButton onClick={() => window.open("https://www.instagram.com", "_blank")} style={{ color: "#006400" }}>
            <InstagramIcon />
          </IconButton>
          <IconButton onClick={() => window.open("https://www.x.com", "_blank")} style={{ color: "#006400" }}>
            <XIcon />
          </IconButton>
          <IconButton onClick={() => window.open("https://www.youtube.com", "_blank")} style={{ color: "#006400" }}>
            <YouTubeIcon />
          </IconButton>
        </Box>

        {/* Signup and Login Buttons */}
        <Box className="flex gap-2">
          <NavButton onClick={() => navigate("/login")}>Login</NavButton>
          <NavButton onClick={() => navigate("/signup")}>Signup</NavButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

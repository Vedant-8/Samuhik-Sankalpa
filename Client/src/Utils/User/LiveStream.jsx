import React from "react";
import { Box, Typography, Card, CardMedia } from "@mui/material";
import Carousel from "react-material-ui-carousel";
import { styled } from "@mui/material/styles";
import liveStreams from "../../assets/LiveStreams.json"; // Adjust the path as per your project structure

const StyledCard = styled(Card)(({ theme }) => ({
  backgroundColor: "#e8f5e9",
  borderRadius: "12px",
  overflow: "hidden",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
  margin: "16px",
  textAlign: "center",
  maxWidth: "900px",
  marginLeft: "auto",
  marginRight: "auto",
  "&:hover": {
    transform: "scale(1.02)",
    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.2)",
  },
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
}));

const LiveStream = () => {
  return (
    <Box sx={{ py: 4, px: 2 }}>
      <Typography
        variant="h5"
        sx={{ textAlign: "center", fontWeight: "bold", mb: 4, color: "green" }}
      >
        Events
      </Typography>
      <Carousel
        indicators
        autoPlay
        animation="slide"
        navButtonsAlwaysVisible
        navButtonsProps={{
          style: {
            backgroundColor: "green",
            color: "white",
          },
        }}
      >
        {liveStreams.map((stream) => (
          <StyledCard key={stream.id}>
            <Typography variant="h6" sx={{ mt: 2, mb: 1, color: "green" }}>
              {stream.title}
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: "gray", px: 2, mb: 2, fontStyle: "italic" }}
            >
              {stream.description}
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                overflow: "hidden",
              }}
            >
              {stream.category === "video" ? (
                <CardMedia
                  component="iframe"
                  src={stream.link}
                  title={stream.title}
                  sx={{
                    height: "400px",
                    width: "100%",
                    maxWidth: "800px",
                    border: "none",
                    borderRadius: "12px",
                  }}
                />
              ) : (
                <CardMedia
                  component="img"
                  src={stream.link}
                  alt={stream.title}
                  sx={{
                    height: "400px",
                    width: "100%",
                    maxWidth: "800px",
                    borderRadius: "12px",
                  }}
                />
              )}
            </Box>
          </StyledCard>
        ))}
      </Carousel>
    </Box>
  );
};

export default LiveStream;

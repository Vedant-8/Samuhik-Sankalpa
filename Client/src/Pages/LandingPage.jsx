import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { Typography, Grid, Card, CardContent, Tooltip } from "@mui/material";
import FlipNumbers from "react-flip-numbers";
import { useNavigate } from "react-router-dom"; // Importing useNavigate hook

const LandingPage = () => {
  const navigate = useNavigate(); // Initializing navigate function
  const [orgsConnected, setOrgsConnected] = useState(500);
  const [moneyRaised, setMoneyRaised] = useState(1000000);

  useEffect(() => {
    const interval = setInterval(() => {
      setMoneyRaised((prev) => prev + Math.floor(Math.random() * 100 + 1));
      setOrgsConnected((prev) => prev + Math.floor(Math.random() * 5 + 1));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Navbar />
      <div className="flex flex-col min-h-screen">
        {/* Section 1: Statistics */}
        <section className="relative flex flex-col items-center justify-center h-screen bg-gradient-to-r from-green-50 to-white overflow-hidden">
          {/* Moving Objects in Background */}
          <div className="absolute inset-0">
            <div className="animate-float w-20 h-20 bg-green-200 rounded-full absolute top-10 left-20"></div>
            <div className="animate-float w-16 h-16 bg-green-300 rounded-full absolute bottom-20 right-16"></div>
            <div className="animate-float w-24 h-24 bg-green-100 rounded-full absolute top-40 right-40"></div>
          </div>

          <Typography variant="h3" className="text-green-700 font-bold mb-8 z-10">
            Welcome to GreenCampaigns
          </Typography>
          <div className="flex flex-col items-center justify-center space-y-16 z-10">
            {/* Organizations Connected */}
            <div className="text-center">
              <Typography variant="h4" className="text-green-600 font-semibold">
                Organizations Connected
              </Typography>
              <FlipNumbers
                height={40}
                width={30}
                color="green"
                background="transparent"
                play
                perspective={700}
                numbers={orgsConnected.toString()}
              />
            </div>

            {/* Total Money Raised */}
            <div className="text-center">
              <Typography variant="h4" className="text-green-600 font-semibold">
                Total Money Raised
              </Typography>
              <FlipNumbers
                height={40}
                width={30}
                color="green"
                background="transparent"
                play
                perspective={700}
                numbers={`$${moneyRaised.toLocaleString()}`}
              />
            </div>
          </div>
        </section>

        {/* Section 2: Features */}
        <section className="py-16 bg-[#f7fff7] flex justify-center items-center h-screen">
          <div className="text-center max-w-6xl w-full">
            <Typography
              variant="h4"
              className="font-bold text-3xl text-green-700 mb-12"
            >
              Platform Features
            </Typography>
            <br />
            <br />
            <Grid container spacing={6} justifyContent="center" className="px-4">
              {[ 
                {
                  title: "Campaign Management",
                  description: "Easily create, manage, and track your eco-friendly campaigns.",
                },
                {
                  title: "Donation Tracking",
                  description: "Keep track of all donations made, ensuring transparency and accountability.",
                },
                {
                  title: "Gamification",
                  description: "Engage users with fun challenges and rewards to drive participation.",
                },
                {
                  title: "Eco-Friendly Rewards",
                  description: "Redeem points for sustainable products and exclusive discounts.",
                },
                {
                  title: "Real-Time Analytics",
                  description: "Access insights on campaign performance and environmental impact.",
                },
                {
                  title: "Secure & Scalable",
                  description: "Built with security and scalability in mind to handle all your needs.",
                },
              ].map((feature, index) => (
                <Grid key={index} item xs={12} sm={6} md={4}>
                  <Tooltip title="Coming Soon" placement="top" arrow>
                    <Card
                      elevation={6}
                      className="hover:scale-105 hover:shadow-lg transition-transform duration-300 rounded-lg"
                      style={{
                        backgroundColor: "#e6f9e6",
                        borderRadius: "12px",
                        padding: "20px",
                      }}
                    >
                      <CardContent>
                        <Typography
                          variant="h5"
                          className="text-green-800 font-semibold text-center"
                        >
                          {feature.title}
                        </Typography>
                        <Typography
                          variant="body2"
                          className="text-green-600 mt-2 text-center"
                        >
                          {feature.description}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Tooltip>
                </Grid>
              ))}
            </Grid>
          </div>
        </section>

        {/* Section 3: Call to Action */}
        <section className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-green-150 to-green-100">
          <Typography variant="h4" className="font-bold text-3xl text-green-700">
            Join Us Today!
          </Typography>
          <Typography variant="body1" className="mt-4 text-lg text-green-600">
            Become a part of the change. Sign up and make a difference!
          </Typography>
          <button
            onClick={() => navigate("/signup")} // Use navigate to route to signup
            className="mt-8 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300"
          >
            Sign Up Now
          </button>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default LandingPage;

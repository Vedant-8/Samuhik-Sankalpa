import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { Typography, Grid, Card, CardContent, Tooltip } from "@mui/material";
import FlipNumbers from "react-flip-numbers";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Home = () => {
  const navigate = useNavigate();
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
        <section
          className="relative flex flex-col items-center justify-center h-screen bg-cover bg-center"
          style={{
            backgroundImage: `url("./src/assets/texture.png")`, // Ensure this path matches where the image is saved
          }}
        >
          {/* Content */}
          <Typography
            variant="h3"
            className="text-[#333333] font-bold mb-8 z-10 font-[EB Garamond]"
          >
            Welcome to GreenCampaigns
          </Typography>
          <div className="flex flex-col items-center justify-center space-y-16 z-10">
            {/* Organizations Connected */}
            <div className="text-center">
              <Typography
                variant="h4"
                className="text-[#0a361e] font-semibold font-[Montserrat]"
              >
                Organizations Connected
              </Typography>
              <FlipNumbers
                height={40}
                width={30}
                color="#0a361e"
                background="transparent"
                play
                perspective={700}
                numbers={orgsConnected.toString()}
              />
            </div>

            {/* Total Money Raised */}
            <div className="text-center">
              <Typography
                variant="h4"
                className="text-[#0a361e] font-semibold font-[Montserrat]"
              >
                Total Money Raised
              </Typography>
              <FlipNumbers
                height={40}
                width={30}
                color="#0a361e"
                background="transparent"
                play
                perspective={700}
                numbers={`$${moneyRaised.toLocaleString()}`}
              />
            </div>
          </div>
        </section>

        {/* Section 2: Features */}
        <section className="py-16 bg-[#f7fff7] flex justify-center items-center">
          <div className="text-center max-w-6xl w-full">
          {/* <motion.div
    initial={{ opacity: 0, x: 100 }} // Start off-screen to the right
    whileInView={{ opacity: 1, x: 0 }} // Slide in to its position
    viewport={{ once: true }} // Trigger only once when it comes into view
    transition={{ duration: 0.8, ease: "easeOut" }} // Smooth transition
  > */}
            <Typography
              variant="h4"
              className="font-bold text-3xl text-[#333333] mb-12 font-[EB Garamond]"
            >
              Platform Features
            </Typography>
            <Grid container spacing={6} justifyContent="center" className="px-4">
              {[
                {
                  title: "Campaign Management",
                  description:
                    "Easily create, manage, and track your eco-friendly campaigns.",
                },
                {
                  title: "Donation Tracking",
                  description:
                    "Keep track of all donations made, ensuring transparency and accountability.",
                },
                {
                  title: "Gamification",
                  description:
                    "Engage users with fun challenges and rewards to drive participation.",
                },
                {
                  title: "Eco-Friendly Rewards",
                  description:
                    "Redeem points for sustainable products and exclusive discounts.",
                },
                {
                  title: "Real-Time Analytics",
                  description:
                    "Access insights on campaign performance and environmental impact.",
                },
                {
                  title: "Secure & Scalable",
                  description:
                    "Built with security and scalability in mind to handle all your needs.",
                },
              ].map((feature, index) => (
                <Grid key={index} item xs={12} sm={6} md={4}>
                  <Tooltip title="Coming Soon" placement="top" arrow>
                    <Card
                      elevation={6}
                      className="hover:scale-105 transition-transform duration-300 rounded-lg"
                      style={{
                        backgroundColor: "#e8e4d1",
                        padding: "20px",
                        border: "1px solid #0a361e",
                      }}
                    >
                      <CardContent>
                        <Typography
                          variant="h5"
                          className="text-[#0a361e] font-semibold text-center font-[EB Garamond]"
                        >
                          {feature.title}
                        </Typography>
                        <Typography
                          variant="body2"
                          className="text-[#333333] mt-2 text-center font-[Montserrat]"
                        >
                          {feature.description}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Tooltip>
                </Grid>
              ))}
            </Grid>
            {/* </motion.div> */}
          </div>
        </section>

        {/* Section 3: Call to Action */}
        <section className="flex flex-col items-center justify-center h-screen bg-[#e8e4d1]">
          <Typography
            variant="h4"
            className="font-bold text-3xl text-[#333333] font-[EB Garamond]"
          >
            Join Us Today!
          </Typography>
          <Typography
            variant="body1"
            className="mt-4 text-lg text-[#0a361e] font-[Montserrat]"
          >
            Become a part of the change. Sign up and make a difference!
          </Typography>
          <button
            onClick={() => navigate("/signup")}
            className="mt-8 px-6 py-3 bg-[#0a361e] text-[#e8e4d1] rounded-lg hover:bg-[#084117] transition duration-300"
          >
            Sign Up Now
          </button>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default Home;

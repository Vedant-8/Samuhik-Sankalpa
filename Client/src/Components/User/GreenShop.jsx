import React, { useEffect, useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Card, CardContent, Typography, CircularProgress, Grid, Link } from "@mui/material";
import Navbar from "../../Components/User/Navbar";
import Footer from "../../Components/Footer";

const GreenShop = () => {
  const [latestProduct, setLatestProduct] = useState(null);
  const [alternatives, setAlternatives] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch the latest product from the database
    const fetchLatestProduct = async () => {
      try {
        const response = await fetch("http://localhost:8080/products");
        const data = await response.json();
        if (data.products && data.products.length > 0) {
          setLatestProduct(data.products[data.products.length - 1]); // Get the latest entry
        }
      } catch (error) {
        console.error("Error fetching latest product:", error);
      }
    };

    fetchLatestProduct();
  }, []);

  const fetchGreenAlternatives = async () => {
    if (!latestProduct) {
      alert("No product found to suggest alternatives for.");
      return;
    }

    try {
      setLoading(true);

      // Initialize the Gemini API client
      const genAI = new GoogleGenerativeAI("AIzaSyBeaivuBDufjfqWN5I75qO1HcDDfv-v-Eg");
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      // Generate the prompt for green alternatives
      const prompt = `
        The user wants sustainable alternatives for the following product:
        Name: ${latestProduct.name}
        Description: ${latestProduct.description}
        Price: ₹${latestProduct.price}

        Provide 3 green or sustainable alternatives that have a price not much higher than ₹${latestProduct.price}. 
        Include the product name, a short description, and the price for each alternative.
      `;

      // Fetch response from Gemini
      const result = await model.generateContent(prompt);
      const responseText = await result.response.text();

      // Parse the AI response into a usable format
      const parsedAlternatives = responseText
        .split("\n")
        .map((line) => line.trim())
        .filter((line) => line)
        .map((line, index) => {
          const parts = line.split(": ");
          return {
            id: index,
            name: parts[0] || `Alternative ${index + 1}`,
            description: parts[1] || "No description provided.",
            price: parts[2] || "Price not specified.",
            link: parts[3] || "#", // Assuming link is provided, else fallback to "#"
          };
        });

      setAlternatives(parsedAlternatives);
    } catch (error) {
      console.error("Error fetching green alternatives:", error);
      alert("Failed to fetch alternatives. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="p-6 flex justify-center items-center bg-gray-50 min-h-screen">
        <div className="w-full max-w-4xl bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-center text-2xl font-semibold text-green-700 mb-6">
            Green Alternatives Finder
          </h2>

          {latestProduct ? (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-green-700 mb-2">Latest Product:</h3>
              <table className="min-w-full border-separate border-spacing-4">
                <tbody>
                  <tr>
                    <td className="text-green-700"><strong>Name:</strong></td>
                    <td className="text-green-600">{latestProduct.name}</td>
                  </tr>
                  <tr>
                    <td className="text-green-700"><strong>Description:</strong></td>
                    <td className="text-green-600">{latestProduct.description}</td>
                  </tr>
                  <tr>
                    <td className="text-green-700"><strong>Price:</strong></td>
                    <td className="text-green-600">₹{latestProduct.price}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-600 mb-6">Fetching the latest product...</p>
          )}

          <button
            onClick={fetchGreenAlternatives}
            disabled={loading || !latestProduct}
            className="w-full p-4 rounded-xl bg-green-600 text-white font-semibold hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 mb-6"
          >
            {loading ? "Fetching Alternatives..." : "Find Green Alternatives"}
          </button>

          {loading && (
            <div className="flex justify-center items-center">
              <CircularProgress />
            </div>
          )}

          {alternatives.length > 0 && (
            <div>
              <h3 className="text-center text-xl font-semibold text-green-600 mb-4">
                Suggested Green Alternatives:
              </h3>

              <Grid container spacing={4}>
                {alternatives.slice(0, 3).map((alternative) => (
                  <Grid item xs={12} sm={6} md={4} key={alternative.id}>
                    <Card className="transition-transform duration-300 ease-in-out hover:scale-105 shadow-lg">
                      <CardContent className="text-center">
                        <Typography variant="h6" component="div" className="text-green-800 mb-2">
                          {alternative.name}
                        </Typography>
                        <Typography variant="body2" className="text-gray-600 mb-4">
                          {alternative.description}
                        </Typography>
                        <Typography variant="subtitle1" className="text-green-700 font-semibold">
                          Price: {alternative.price}
                        </Typography>
                        <Link href={alternative.link} target="_blank" className="text-green-600 mt-4 inline-block">
                          View Product
                        </Link>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default GreenShop;

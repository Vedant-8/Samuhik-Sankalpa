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

    // const prompt = `
    //   The user wants sustainable alternatives for the following product:
    //   Name: ${latestProduct.name}
    //   Description: ${latestProduct.description}
    //   Price: ₹${latestProduct.price}

    //   Provide 3 green or sustainable alternatives that have a price not much higher than ₹${latestProduct.price}. 
    //   Include the product name, a short description, and the price for each alternative.
    //   Your output should strictly follow this JSON format:
    //   [
    //     {
    //       "id": 0,
    //       "name": "Alternative Product 1",
    //       "description": "Short description of alternative product 1",
    //       "price": 1234,
    //       "link": "#"
    //     },
    //     {
    //       "id": 1,
    //       "name": "Alternative Product 2",
    //       "description": "Short description of alternative product 2",
    //       "price": 5678,
    //       "link": "#"
    //     },
    //     {
    //       "id": 2,
    //       "name": "Alternative Product 3",
    //       "description": "Short description of alternative product 3",
    //       "price": 91011,
    //       "link": "#"
    //     }
    //   ]

    //   DO NOT INCLUDE ANY TEXT OUTSIDE THE JSON FORMAT. RETURN STRICTLY JSON ONLY.
    // `;

    const prompt = `

    DO NOT INCLUDE ANY TEXT OUTSIDE THE JSON FORMAT. RETURN STRICTLY JSON ONLY.

    FOLLOW THESE RULES STRICTLY:
    1. Follow given schema for json object
    2. Link should be an actual amazon product link and not a fake one
    3. No unreal data should be included


      The user wants sustainable alternatives for the following product:
      Name: ${latestProduct.name}
      Description: ${latestProduct.description}
      Price: ₹${latestProduct.price}

      Provide 3 green or sustainable alternatives that have a price not much higher than ₹${latestProduct.price} in the given JSON format

        Schema for JSON Object: 
        {
      id: {
        type: Number,
        required: true,
        unique: true,
        min: 0,
        description: "Unique identifier for the alternative product",
      },
      name: {
        type: String,
        required: true,
        description: "Name of the alternative product",
      },
      description: {
        type: String,
        required: true,
        description: "Short description of the alternative product",
      },
      price: {
        type: Number,
        required: true,
        min: 0,
        description: "Price of the alternative product",
      },
      link: {
        type: String,
        required: true,
        description: "URL link to the alternative product",
        validate: {
          validator: function (v) {
            return /^(https?:\/\/|#).*/.test(v); // Ensures a valid URL of a product of similar price range
          },
          
        },
      },
    }
        
        `;

    const retryLimit = 3; // Maximum number of retries
    let retryCount = 0;

    try {
      setLoading(true);

      const genAI = new GoogleGenerativeAI("AIzaSyBeaivuBDufjfqWN5I75qO1HcDDfv-v-Eg");
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      // const generationConfig = {
      //   temperature: 0.7, // Adjust this value as needed
      //   // Other parameters like maxOutputTokens, topP, topK can also be set here
      // };
      
      // const model = googleAI.getGenerativeModel({
      //   model: "gemini-1.5-flash", // Or another Gemini model
      //   generationConfig,
      // });
      

      let responseText = "";
let parsedAlternatives = null;

while (retryCount < retryLimit) {
  console.log(`Attempt ${retryCount + 1} to fetch alternatives...`);
  const result = await model.generateContent(prompt);
  responseText = await result.response.text();

  console.log("Raw AI Response:", responseText); // Log raw response for debugging

  // Clean the response by removing backticks
  responseText = responseText.replace(/```/g, "").replace(/`/g, "").replace("json", "").trim();

  // Modify response on retries
  if (retryCount > 0) {
    console.log(`Modifying response for retry attempt ${retryCount + 1}`);
    const lines = responseText.split("\n");
    responseText = lines.slice(1, -1).join("\n"); // Remove first and last lines
    console.log("Modified Response:", responseText);
  }

  // Try parsing the response as JSON
  try {
    parsedAlternatives = JSON.parse(responseText);
    if (Array.isArray(parsedAlternatives) && parsedAlternatives.length > 0) {
      break; // Valid JSON response, exit the retry loop
    } else {
      throw new Error("Parsed JSON is not a valid array.");
    }
  } catch (jsonError) {
    console.error(`JSON parsing failed on attempt ${retryCount + 1}:`, jsonError);
    retryCount++;
  }
} 

      if (!parsedAlternatives) {
        alert("Failed to fetch valid JSON response after multiple attempts.");
        return;
      }

      // Update the state with parsed alternatives
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
                    <td className="text-green-600">{latestProduct.price}</td>
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
            className="w-full p-4 rounded-xl bg-green-500 text-white font-semibold hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 mb-6"
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
                {alternatives.map((alternative) => (
                  <Grid item xs={12} sm={6} md={4} key={alternative.id}>
                    <Card
                      className="transition-transform duration-300 ease-in-out hover:scale-105 shadow-lg hover:shadow-xl mt-4"
                      style={{
                        height: "100%", // Ensures cards stretch to fill the available space
                        display: "flex", // Enables flexbox for consistent alignment
                        flexDirection: "column", // Ensures proper vertical layout of card content
                      }}
                    >
                      <CardContent
                        className="text-center"
                        style={{
                          flexGrow: 1, // Allows content to grow to fill available space
                          display: "flex", // Align content properly
                          flexDirection: "column", // Stack elements vertically
                          justifyContent: "space-between", // Spread content vertically
                        }}
                      >
                        <Typography variant="h6" className="text-green-800 mb-2">
                          {alternative.name}
                        </Typography>
                        <Typography variant="body2" className="text-gray-600 mb-4">
                          {alternative.description}
                        </Typography>
                        <Typography variant="subtitle1" className="text-green-700 font-semibold">
                          Price: ₹{alternative.price}
                        </Typography>
                        <Link
                          href={alternative.link}
                          target="_blank"
                          className="text-green-600 mt-4 inline-block"
                        >
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

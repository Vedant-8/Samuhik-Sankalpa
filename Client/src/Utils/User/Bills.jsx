import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useGeolocated } from "react-geolocated";
import Navbar from "../../Components/User/Navbar";
import Footer from "../../Components/Footer";

const Bills = () => {
  const [familyMembers, setFamilyMembers] = useState("");
  const [squareFeet, setSquareFeet] = useState("");
  const [applianceQuantities, setApplianceQuantities] = useState({});
  const [powerConsumption, setPowerConsumption] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const applianceOptions = [
    "AC",
    "Refrigerator",
    "Washing Machine",
    "TV",
    "Heater",
    "Microwave",
  ];

  const { coords, isGeolocationAvailable, isGeolocationEnabled } = useGeolocated({
    positionOptions: {
      enableHighAccuracy: true,
    },
    userDecisionTimeout: 5000,
  });

  const updateApplianceQuantity = (appliance, increment) => {
    setApplianceQuantities((prev) => ({
      ...prev,
      [appliance]: Math.max(0, (prev[appliance] || 0) + (increment ? 1 : -1)),
    }));
  };

  const fetchOptimalConsumption = async () => {
    if (!familyMembers || !squareFeet || !powerConsumption) {
      alert("Please fill in all required fields.");
      return;
    }

    const city = coords ? `Latitude: ${coords.latitude}, Longitude: ${coords.longitude}` : "unknown";

    try {
      setLoading(true);

      const genAI = new GoogleGenerativeAI("");
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const prompt = `
        A household in ${city} has ${familyMembers} family members, an area of ${squareFeet} square feet, 
        and the following appliances and quantities: ${Object.entries(applianceQuantities)
          .map(([appliance, quantity]) => `${appliance}: ${quantity}`)
          .join(", ") || "none"}. 
        The household's current power consumption is ${powerConsumption} kWh.

        Please:
        1. Provide an **optimal power consumption** (in kWh) based on this information. 
        2. If the current consumption exceeds the optimal value, suggest **concise and actionable steps** to reduce it. 
           Recommendations should be clear and actionable.

        Always provide an optimal number based on the given information.

        Format the response concisely as:
        Optimal Consumption: [Value in kWh]
        Steps to Reduce Consumption (if necessary): 
        - Step 1
        - Step 2
        - Step 3
      `;

      const result = await model.generateContent(prompt);
      const responseText = await result.response.text();
      setAiResponse(responseText);
    } catch (error) {
      console.error("Error generating suggestions:", error);
      alert("Failed to generate optimal consumption. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="p-6 flex justify-center items-center bg-white min-h-screen">
        <div className="w-full max-w-4xl bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-center text-2xl font-semibold text-green-800 mb-6">
            Power Consumption Optimizer
          </h2>

          <input
            type="number"
            placeholder="Number of family members"
            value={familyMembers}
            onChange={(e) => setFamilyMembers(e.target.value)}
            className="w-full p-4 rounded-xl border border-gray-300 placeholder-green-600 focus:ring-2 focus:ring-green-600 mb-4"
          />

          <input
            type="number"
            placeholder="House area in square feet"
            value={squareFeet}
            onChange={(e) => setSquareFeet(e.target.value)}
            className="w-full p-4 rounded-xl border border-gray-300 placeholder-green-600 focus:ring-2 focus:ring-green-600 mb-4"
          />

          <div className="mb-6">
            <h3 className="text-lg font-semibold text-green-700 mb-4">Appliances and Quantities:</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {applianceOptions.map((appliance) => (
                <div
                  key={appliance}
                  className="bg-green-200 p-4 rounded-lg shadow-md flex flex-col items-center"
                >
                  <p className="text-green-900 font-medium">{appliance}</p>
                  <div className="flex items-center gap-3 mt-3">
                    <button
                      onClick={() => updateApplianceQuantity(appliance, false)}
                      className="p-2 rounded-lg bg-green-200 text-black shadow hover:bg-green-600"
                    >
                      -
                    </button>
                    <p className="text-green-900 font-semibold">
                      {applianceQuantities[appliance] || 0}
                    </p>
                    <button
                      onClick={() => updateApplianceQuantity(appliance, true)}
                      className="p-2 rounded-lg bg-green-200 text-black shadow hover:bg-green-600"
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <input
            type="number"
            placeholder="Current power consumption (kWh)"
            value={powerConsumption}
            onChange={(e) => setPowerConsumption(e.target.value)}
            className="w-full p-4 rounded-xl border border-gray-300 placeholder-green-600 focus:ring-2 focus:ring-green-600 mb-6"
          />

          <button
            onClick={fetchOptimalConsumption}
            disabled={loading}
            className="w-full p-4 rounded-xl bg-green-800 text-white font-semibold hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            {loading ? "Fetching Optimal Consumption..." : "Get Suggestions"}
          </button>

          {aiResponse && (
            <div className="mt-8 p-6 bg-green-50 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-green-700 mb-4">AI Response:</h3>
              <p className="text-green-900">{aiResponse}</p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Bills;

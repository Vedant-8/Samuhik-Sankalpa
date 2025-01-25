import React, { useState } from "react";
import projectsData from "../../assets/projects.json";
import { GoogleGenerativeAI } from "@google/generative-ai";
import Navbar from "../../Components/User/Navbar";
import Footer from "../../Components/Footer";

const Suggestion = () => {
  const [budget, setBudget] = useState("");
  const [specification, setSpecification] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState("");

  const fetchSuggestions = async () => {
    if (!budget || isNaN(budget) || budget <= 0) {
      alert("Please enter a valid donation budget.");
      return;
    }

    try {
      setLoading(true);

      // Initialize the Gemini API client
      const genAI = new GoogleGenerativeAI("AIzaSyBeaivuBDufjfqWN5I75qO1HcDDfv-v-Eg");
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      // Generate the prompt dynamically based on the user's budget, specifications, and projects data
      const prompt = `
        I have a donation budget of ₹${budget}. The user has the following specifications: "${specification}". 
        Based on this, please recommend which projects from the following list are most suitable for this budget and the user's expectations. 
        Also, provide how much the user should donate to each project based on their budget and the project's needs (consider funding goals, current funding, and impact areas like CO2 reduction, water saved, etc.):

        ${projectsData
          .map(
            (project) =>
              `- ${project.name}: ${project.short_description} (Goal: ₹${project.funding_goal}, Received: ₹${project.funding_received})`
          )
          .join("\n")}
      `;

      // Log the generated prompt for debugging
      console.log("Generated prompt:", prompt);

      // Get the response from the model
      const result = await model.generateContent(prompt);

      // Log the raw AI response for debugging
      const responseText = await result.response.text();
      console.log("AI Response:", responseText);

      // Set the AI response to display
      setAiResponse(responseText);

      // Parse the response to get the suggested project names and donation amounts
      const suggestedProjectDetails = responseText
        .split("\n")
        .map((line) => line.trim())
        .filter((line) => line);

      // Now we need to filter out the projects from the list based on the AI's response
      const filteredProjects = projectsData.filter((project) =>
        suggestedProjectDetails.some((suggestion) =>
          suggestion.includes(project.name)
        )
      );

      setSuggestions(filteredProjects);
    } catch (error) {
      console.error("Error generating suggestions:", error);
      alert("Failed to generate suggestions. Please try again.");
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
            Donation Suggestion Bot
          </h2>

          <input
            type="number"
            placeholder="Enter your donation budget (₹)"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            className="w-full p-4 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-600 mb-4"
          />

          <input
            type="text"
            placeholder="Enter any additional specifications (optional)"
            value={specification}
            onChange={(e) => setSpecification(e.target.value)}
            maxLength={100}
            className="w-full p-4 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-600 mb-6"
          />

          <button
            onClick={fetchSuggestions}
            disabled={loading}
            className="w-full p-4 rounded-xl bg-green-600 text-white font-semibold hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            {loading ? "Generating Suggestions..." : "Generate Suggestions"}
          </button>

          {aiResponse && (
            <div className="mt-8 p-6 bg-gray-100 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-green-600 mb-4">
                AI Response:
              </h3>
              <p className="text-gray-700">{aiResponse}</p>
            </div>
          )}

          {suggestions.length > 0 && (
            <div className="mt-8">
              <h3 className="text-center text-xl font-semibold text-green-600 mb-4">
                Suggested Projects to Donate:
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {suggestions.map((project) => (
                  <div
                    key={project.id}
                    className="bg-green-50 p-6 rounded-xl shadow-lg transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-xl cursor-pointer flex flex-col"
                  >
                    <h4 className="text-center text-lg font-semibold text-green-800 mb-2">
                      {project.name}
                    </h4>
                    <p className="text-center text-gray-600 mb-4">
                      {project.short_description}
                    </p>
                    <div className="flex justify-between items-center">
                      <p className="text-green-600 font-semibold">
                        Goal: ₹{project.funding_goal}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Suggestion;

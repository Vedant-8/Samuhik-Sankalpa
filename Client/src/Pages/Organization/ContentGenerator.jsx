import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import Navbar from "../../Components/Organization/Navbar";
import Footer from "../../Components/Footer";

// Initialize the GoogleGenerativeAI with the API key from environment variables
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

const ContentGenerator = () => {
  const [basicInfo, setBasicInfo] = useState("");
  const [generatedContent, setGeneratedContent] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const generateContent = async () => {
    setIsLoading(true);
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const prompt = `Generate social media content based on the following information: ${basicInfo}
      Please provide:
      1. An Instagram caption (including relevant hashtags)
      2. A Twitter post (including relevant hashtags)
      3. A detailed prompt for image generation. This prompt should be very descriptive and specific, designed to generate a high-quality, relevant image. Include details about style, mood, colors, composition, and any specific elements that should be in the image.
      
      Format the response as a JSON object with keys: instagramCaption, twitterCaption, imagePrompt`;

      const result = await model.generateContent(prompt);
      const response = result.response;
      const text = response.text();

      const content = parseResponse(text);
      const imageUrl = await generateImage(content.imagePrompt);
      content.imageUrl = imageUrl;
      delete content.imagePrompt;
      setGeneratedContent(content);
    } catch (error) {
      console.error("Error generating content:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const generateImage = async (prompt) => {
    const response = await fetch(
      "https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/text-to-image",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_STABILITY_API_KEY}`,
        },
        body: JSON.stringify({
          text_prompts: [{ text: prompt }],
          cfg_scale: 7,
          height: 1024,
          width: 1024,
          steps: 30,
          samples: 1,
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`Non-200 response: ${await response.text()}`);
    }

    const responseJSON = await response.json();
    return `data:image/png;base64,${responseJSON.artifacts[0].base64}`;
  };

  const parseResponse = (text) => {
    const jsonStr = text.replace(/```json\n|\n```/g, "").trim();
    try {
      return JSON.parse(jsonStr);
    } catch (error) {
      console.error("Error parsing JSON:", error);
      const instagramCaption = extractContent(text, "Instagram caption");
      const twitterCaption = extractContent(text, "Twitter post");
      const imagePrompt = extractContent(text, "prompt for image generation");
      return { instagramCaption, twitterCaption, imagePrompt };
    }
  };

  const extractContent = (text, key) => {
    const regex = new RegExp(`${key}[:\\s]+(.*?)(?=\\n\\d\\.|\n$)`, "is");
    const match = text.match(regex);
    return match ? match[1].trim() : "";
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
  };

  const downloadImage = (imageUrl) => {
    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = "generated-image.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center max-w-3xl mx-auto m-5 p-8 bg-white rounded-xl shadow-lg">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6">
          Content Generator
        </h1>

        <textarea
          value={basicInfo}
          onChange={(e) => setBasicInfo(e.target.value)}
          placeholder="Enter basic info about your post..."
          className="w-full p-4 mb-6 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          rows={4}
        />

        <button
          onClick={generateContent}
          disabled={isLoading}
          className={`w-full py-3 text-white font-semibold rounded-lg ${
            isLoading ? "bg-gray-400" : "bg-green-500"
          } ${isLoading ? "cursor-not-allowed" : "hover:bg-green-600"}`}
        >
          {isLoading ? "Generating..." : "Generate Content"}
        </button>

        {generatedContent && (
          <div className="w-full mt-8">
            <div className="bg-gray-50 p-6 rounded-lg mb-6 shadow-md">
              <h2 className="text-xl font-semibold text-gray-700 mb-3">
                Instagram Caption
              </h2>
              <p className="text-gray-800">
                {generatedContent.instagramCaption}
              </p>
              <button
                onClick={() =>
                  copyToClipboard(generatedContent.instagramCaption)
                }
                className="mt-4 w-full py-2 bg-green-400 text-white font-semibold rounded-lg hover:bg-green-500"
              >
                Copy Instagram Caption
              </button>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg mb-6 shadow-md">
              <h2 className="text-xl font-semibold text-gray-700 mb-3">
                Twitter Caption
              </h2>
              <p className="text-gray-800">{generatedContent.twitterCaption}</p>
              <button
                onClick={() => copyToClipboard(generatedContent.twitterCaption)}
                className="mt-4 w-full py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700"
              >
                Copy Twitter Caption
              </button>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-gray-700 mb-3">
                Generated Image
              </h2>
              {generatedContent.imageUrl && (
                <>
                  <div className="mb-4">
                    <img
                      src={generatedContent.imageUrl}
                      alt="Generated content"
                      className="w-full h-auto rounded-lg shadow-lg"
                    />
                  </div>
                  <button
                    onClick={() => downloadImage(generatedContent.imageUrl)}
                    className="w-full py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700"
                  >
                    Download Image
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default ContentGenerator;

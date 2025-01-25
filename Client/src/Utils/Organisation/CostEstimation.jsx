import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import Navbar from "../../Components/Organization/Navbar";
import Footer from "../../Components/Footer";
import { Button, TextField, Typography, Card } from "@mui/material";
import { marked } from "marked"; // Markdown parser
import DOMPurify from "dompurify"; // To sanitize HTML
import { styled } from "@mui/material/styles";


const CostEstimation = () => {
  const [formData, setFormData] = useState({
    projectName: "",
    projectScope: "",
    duration: "",
    targetAudience: "",
    additionalNotes: "",
  });

  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const truncateText = (text, wordLimit = 500) => {
    const words = text.split(" ");
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + "...";
    }
    return text;
  };

  const fetchEstimation = async () => {
    const {
      projectName,
      projectScope,
      duration,
      targetAudience,
      additionalNotes,
    } = formData;

    if (!projectName || !projectScope || !duration || !targetAudience) {
      alert("Please fill out all required fields.");
      return;
    }

    try {
      setLoading(true);

      // Initialize the Gemini API client
      const genAI = new GoogleGenerativeAI(
        "AIzaSyBeaivuBDufjfqWN5I75qO1HcDDfv-v-Eg"
      );
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      // Generate the prompt dynamically based on user input
      const prompt = `
        Provide a potential budget value in Indian rupees which is affordable and will not exceed 5 lakh rupees, followed by a concise summary of the following project in 200 words:
        - Project Name: ${projectName}
        - Scope: ${projectScope}
        - Expected Duration: ${duration}
        - Target Audience: ${targetAudience}
        ${additionalNotes ? `- Additional Notes: ${additionalNotes}` : ""}
        Summarize key cost elements such as:
        - Infrastructure costs
        - Operational costs
        - Resource requirements
        - Miscellaneous expenses
        NOTE : your output should be in the following format:
        1) first thing should be  - "potential budget(in bold) : [value in numbers]"
        2)  second thing - provide a table of category | estimated costs for each category in well formatted markdown manner. ( no paragraph before table )
        3) the table should be evident and main features of the response. 
        4) Lastly Test should be less and just enough to justify the costings below the table in short
        FORMAT WELL WITH PROPER MARKDOWN AND SPACES
      `;

      console.log("Generated prompt:", prompt);

      // Get the response from the AI model
      const result = await model.generateContent(prompt);
      const responseText = await result.response.text();

      console.log("AI Response:", responseText);

      // Truncate the response to 500 words
      setResponse(truncateText(responseText, 500));
    } catch (error) {
      console.error("Error generating estimation:", error);
      alert("Failed to generate estimation. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // MarkdownRenderer Component
  const MarkdownRenderer = ({ markdownText }) => {
    const sanitizedHTML = DOMPurify.sanitize(marked(markdownText.trim())); // Parse and sanitize markdown
    return (
      <div
        className="markdown-body"
        dangerouslySetInnerHTML={{ __html: sanitizedHTML }} // Render sanitized HTML
      />
    );
  };
  

  return (
    <>
      <Navbar />
      <div className="p-6 flex justify-center items-center bg-gray-50 min-h-screen">
        <div className="w-full max-w-3xl bg-white rounded-lg shadow-lg p-8">
          <Typography
            variant="h5"
            className="text-center text-2xl font-semibold text-gray-800 mb-6"
          >
            Cost Estimation AI Bot
          </Typography>

          <form className="space-y-4">
            <CustomTextField
              fullWidth
              label="Project Name"
              name="projectName"
              value={formData.projectName}
              onChange={handleInputChange}
              required
              margin="normal"
              variant="outlined"
            />
            <CustomTextField
              fullWidth
              label="Project Scope"
              name="projectScope"
              value={formData.projectScope}
              onChange={handleInputChange}
              required
              margin="normal"
              variant="outlined"
            />
            <CustomTextField
              fullWidth
              label="Expected Duration (e.g., 6 months)"
              name="duration"
              value={formData.duration}
              onChange={handleInputChange}
              required
              margin="normal"
              variant="outlined"
            />
            <CustomTextField
              fullWidth
              label="Target Audience (e.g., 500 students)"
              name="targetAudience"
              value={formData.targetAudience}
              onChange={handleInputChange}
              required
              margin="normal"
              variant="outlined"
            />
            <CustomTextField
              fullWidth
              label="Additional Notes (Optional)"
              name="additionalNotes"
              value={formData.additionalNotes}
              onChange={handleInputChange}
              margin="normal"
              variant="outlined"
              multiline
              rows={3}
            />
          </form>
          <div className="mt-6">
            <Button
              onClick={fetchEstimation}
              disabled={loading}
              fullWidth
              sx={{
                backgroundColor: "#22c55e", // Green shade for bg-green-500
                "&:hover": {
                  backgroundColor: "#16a34a", // Green shade for hover:bg-green-600
                },
                color: "white", // Text color
                fontWeight: "600", // Semi-bold font
                borderRadius: "0.5rem", // Rounded-lg
                marginTop: "1rem", // Margin-top: mt-4
                paddingY: "0.75rem", // Padding for height: py-3
              }}
            >
              {loading ? "Generating Estimation..." : "Get Cost Estimation"}
            </Button>
          </div>


          {response && (
            <div className="mt-8">
              <Card className="bg-green-50 p-6 rounded-lg shadow-md">
                <Typography
                  variant="h6"
                  className="text-center text-green-600 mb-4"
                >
                  Cost Estimation:
                </Typography>
                {/* Render the response as markdown */}
                <MarkdownRenderer markdownText={response} />
              </Card>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CostEstimation;


const CustomTextField = styled(TextField)({
  "& .MuiFormLabel-root": {
    color: "gray", // Default label color
  },
  "& .MuiFormLabel-root.Mui-focused": {
    color: "#22c55e", // Custom green color for focused label
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "gray", // Default border color
    },
    "&:hover fieldset": {
      borderColor: "#22c55e", // Custom green color on hover
    },
    "&.Mui-focused fieldset": {
      borderColor: "#22c55e", // Custom green color when focused
    },
  },
});
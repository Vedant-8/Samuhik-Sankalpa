import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Bar, Pie, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
} from "chart.js";
import Navbar from "../../Components/Organization/Navbar";
import Footer from "../../Components/Footer";
import projectData from "../../assets/projects.json"; // Import the JSON directly

// Register Chart.js components
ChartJS.register(
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale
);

const IndividualProjectPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [updates, setUpdates] = useState([]);
  const [volunteers, setVolunteers] = useState([]);
  const [donors, setDonors] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newUpdate, setNewUpdate] = useState({
    image: "",
    video: "",
    description: "",
  });

  // Helper function to generate random donors with Indian names
  // Helper function to generate random donors with Indian names
  const generateRandomDonors = () => {
    const randomNames = [
      "Amit Sharma",
      "Priya Singh",
      "Ravi Kumar",
      "Anjali Patel",
      "Sandeep Reddy",
      "Neha Gupta",
      "Vikas Yadav",
      "Ritu Sharma",
      "Manoj Verma",
      "Shalini Agarwal",
      "Arun Joshi",
      "Kavita Desai",
      "Rajesh Mehta",
      "Sushma Rao",
      "Vikram Bhatia",
    ];

    return Array.from({ length: 3 }, () => ({
      name: randomNames[Math.floor(Math.random() * randomNames.length)],
      // Generating a random integer donation between ₹100 and ₹1000
      donation: Math.floor(Math.random() * (1000 - 100 + 1)) + 100,
    }));
  };

  useEffect(() => {
    // Load project data from imported JSON
    const selectedProject = projectData.find((project) => project.id === id);
    if (selectedProject) {
      setProject(selectedProject);
      setUpdates(selectedProject.updates || []);
      setVolunteers(
        selectedProject.volunteers
          ? selectedProject.volunteers.map((name, index) => ({
              id: index + 1,
              name,
              role: "Volunteer",
            }))
          : []
      );
      // If donors are not available, generate random donors
      setDonors(selectedProject.donors || generateRandomDonors());
    } else {
      console.error("Project not found");
    }
  }, [id]);

  const handleAddUpdate = () => {
    const updatedUpdate = {
      ...newUpdate,
      id: updates.length + 1,
    };
    setUpdates([updatedUpdate, ...updates]);
    setShowModal(false);
    setNewUpdate({ image: "", video: "", description: "" });
  };

  if (!project) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500 text-lg">Loading...</p>
      </div>
    );
  }

  // Chart Data: Funding Progress (Bar Chart)
  const fundingData = {
    labels: ["Funding Goal", "Funding Received"],
    datasets: [
      {
        label: "Funding (₹)",
        data: [project.funding_goal, project.funding_received],
        backgroundColor: ["#4caf50", "#2196f3"],
        borderColor: ["#388e3c", "#1976d2"],
        borderWidth: 1,
      },
    ],
  };

  // Chart Data: Impact Metrics (Pie Chart)
  const impactData = {
    labels: ["CO2 Reduction", "Trees Planted", "Water Saved"],
    datasets: [
      {
        data: [
          project.co2_reduction,
          project.trees_planted,
          project.water_saved,
        ],
        backgroundColor: ["#2196f3", "#4caf50", "#ff9800"],
        borderColor: ["#1976d2", "#388e3c", "#f57c00"],
        borderWidth: 1,
      },
    ],
  };

  // Chart Data: Funding Percentage (Doughnut Chart)
  const fundingPercentage =
    (project.funding_received / project.funding_goal) * 100;
  const fundingProgressData = {
    labels: ["Funding Used", "Funding Remaining"],
    datasets: [
      {
        data: [fundingPercentage, 100 - fundingPercentage],
        backgroundColor: ["#4caf50", "#e0e0e0"],
        borderColor: ["#388e3c", "#c2c2c2"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      <Navbar />
      <div className="p-6 bg-gray-100 min-h-screen">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="bg-blue-500 text-white px-6 py-2 rounded-md mb-6 shadow-md hover:bg-blue-600 transition duration-300"
        >
          Back to Projects
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-8">
            {/* Project Details */}
            <section className="bg-white p-8 rounded-lg shadow-md">
              <h1 className="text-3xl font-bold text-gray-800">
                {project.name}
              </h1>
              <p className="mt-4 text-gray-600">{project.description}</p>
              <div className="mt-6 text-gray-700">
                <p>
                  <span className="font-semibold">Location:</span>{" "}
                  {project.location}
                </p>
                <p>
                  <span className="font-semibold">Funding:</span> ₹{" "}
                  {project.funding_received} / ₹ {project.funding_goal}
                </p>
              </div>
            </section>

            {/* Expanded Stats Section */}
            <section className="bg-white p-8 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold text-gray-800">
                Project Stats
              </h2>
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Funding Progress */}
                <div>
                  <h3 className="text-lg font-bold text-gray-700 mb-4">
                    Funding Progress (%)
                  </h3>
                  <Doughnut data={fundingProgressData} />
                </div>

                {/* Impact Metrics */}
                <div>
                  <h3 className="text-lg font-bold text-gray-700 mb-4">
                    Impact Metrics
                  </h3>
                  <Pie data={impactData} />
                </div>
              </div>

              <div className="mt-8 text-gray-700">
                <p>
                  <span className="font-semibold">CO2 Reduction:</span>{" "}
                  {project.co2_reduction} kg
                </p>
                <p>
                  <span className="font-semibold">Trees Planted:</span>{" "}
                  {project.trees_planted}
                </p>
                <p>
                  <span className="font-semibold">Water Saved:</span>{" "}
                  {project.water_saved} liters
                </p>
                <p>
                  <span className="font-semibold">Volunteers:</span>{" "}
                  {volunteers.length}
                </p>
              </div>
            </section>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Updates Section */}
            <section className="bg-white p-8 rounded-lg shadow-md">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-gray-800">
                  Updates
                </h2>
                <button
                  onClick={() => setShowModal(true)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600 transition duration-300"
                >
                  Add Update
                </button>
              </div>
              <div className="space-y-6">
                {updates.map((update, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300"
                  >
                    <p className="text-sm text-gray-500">{update.date}</p>
                    <p className="mt-4 text-gray-700">{update.description}</p>
                    {update.image && (
                      <img
                        src={update.image}
                        alt="Update"
                        className="w-full h-40 object-cover rounded-lg mt-4"
                      />
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* Donors Section */}
            <section className="bg-white p-8 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold text-gray-800">Donors</h2>
              <div className="space-y-4 mt-6">
                {donors.map((donor, index) => (
                  <div
                    key={index}
                    className="bg-gray-100 p-4 rounded-lg shadow-sm hover:shadow-md transition duration-300"
                  >
                    <h3 className="text-lg font-bold text-gray-800">
                      {donor.name}
                    </h3>
                    <p className="text-gray-600">₹ {donor.donation}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Volunteers Section */}
            <section className="bg-white p-8 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold text-gray-800">
                Volunteers
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                {volunteers.map((volunteer) => (
                  <div
                    key={volunteer.id}
                    className="bg-gray-100 p-4 rounded-lg shadow-sm hover:shadow-md transition duration-300"
                  >
                    <h3 className="text-lg font-bold text-gray-800">
                      {volunteer.name}
                    </h3>
                    <p className="text-gray-600">{volunteer.role}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default IndividualProjectPage;

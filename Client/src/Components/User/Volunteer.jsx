import React, { useState, useEffect } from "react";
import projectsData from "../../assets/projects.json";
import Navbar from "./Navbar";
import Footer from "../Footer";
import { motion } from "framer-motion";

const Volunteer = () => {
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [volunteerForm, setVolunteerForm] = useState({
    name: "",
    email: "",
    phone: "",
    hoursAvailable: "",
  });
  const [snackbarMessage, setSnackbarMessage] = useState("");

  useEffect(() => {
    const calculateFundingPercentage = (projects) => {
      return projects.map((project) => ({
        ...project,
        funding_received_percentage: Math.min(
          (project.funding_received / project.funding_goal) * 100,
          100
        ),
      }));
    };

    setFilteredProjects(calculateFundingPercentage(projectsData));
  }, []);

  useEffect(() => {
    const calculateFundingPercentage = (projects) => {
      return projects.map((project) => ({
        ...project,
        funding_received_percentage: Math.min(
          (project.funding_received / project.funding_goal) * 100,
          100
        ),
      }));
    };

    if (searchTerm.trim() === "") {
      setFilteredProjects(calculateFundingPercentage(projectsData));
    } else {
      setFilteredProjects(
        calculateFundingPercentage(
          projectsData.filter((project) =>
            project.name.toLowerCase().includes(searchTerm.toLowerCase())
          )
        )
      );
    }
  }, [searchTerm]);

  const handleVolunteerClick = (project) => {
    setSelectedProject(project);
    setShowForm(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setVolunteerForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    setSnackbarMessage(`Your volunteer form for ${selectedProject.name} is submitted!`);
    setShowForm(false);
    setVolunteerForm({ name: "", email: "", phone: "", hoursAvailable: "" });
  
    // Clear the snackbar message after 2 seconds
    setTimeout(() => {
      setSnackbarMessage("");
    }, 2000);
  };
  

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-r from-[#e8f5e9] to-white">
        <motion.div className="max-w-7xl mx-auto px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}>
          <motion.div className="flex justify-center mb-12">
            <input
              type="text"
              placeholder="Search Projects"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full mt-8 max-w-lg bg-white rounded-lg shadow-lg px-6 py-3 text-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-300"
            />
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            {filteredProjects.map(
              (project) =>
                project.volunteer_requirement && (
                  <div
                    key={project.id}
                    className="bg-green-50 rounded-lg shadow-xl hover:shadow-2xl transition-all transform duration-300 p-6 cursor-pointer"
                  >
                    <p className="text-right text-gray-500 text-sm mb-2 flex items-center">
                      <span className="material-icons text-gray-400 mr-1">📍</span>
                      {project.location}
                    </p>
                    <h3 className="text-xl font-semibold text-center text-green-600 mb-2">
                      {project.name}
                    </h3>
                    <p className="text-gray-600 text-center mb-4">{project.short_description}</p>
                    <div className="flex justify-center">
                      <button
                        onClick={() => handleVolunteerClick(project)}
                        className="bg-green-600 text-white py-2 px-6 rounded-lg shadow-lg hover:bg-green-700 transition duration-300"
                      >
                        Volunteer Now
                      </button>
                    </div>
                  </div>
                )
            )}
          </div>
        </motion.div>

        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-8 rounded-lg shadow-2xl max-w-lg w-full">
              <h3 className="text-2xl font-semibold mb-6">
                Volunteer for {selectedProject.name}
              </h3>
              <form onSubmit={handleSubmitForm} className="space-y-4">
                <input
                  type="text"
                  name="name"
                  value={volunteerForm.name}
                  onChange={handleInputChange}
                  placeholder="Your Name"
                  className="w-full p-4 border border-gray-300 rounded-lg shadow-md"
                  required
                />
                <input
                  type="email"
                  name="email"
                  value={volunteerForm.email}
                  onChange={handleInputChange}
                  placeholder="Your Email"
                  className="w-full p-4 border border-gray-300 rounded-lg shadow-md"
                  required
                />
                <input
                  type="text"
                  name="phone"
                  value={volunteerForm.phone}
                  onChange={handleInputChange}
                  placeholder="Your Phone"
                  className="w-full p-4 border border-gray-300 rounded-lg shadow-md"
                  required
                />
                <input
                  type="number"
                  name="hoursAvailable"
                  value={volunteerForm.hoursAvailable}
                  onChange={handleInputChange}
                  placeholder="Hours Available per week"
                  className="w-full p-4 border border-gray-300 rounded-lg shadow-md"
                  required
                />
                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="bg-red-500 text-white py-2 px-6 rounded-lg hover:bg-red-600 transition duration-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-green-600 text-white py-2 px-6 rounded-lg hover:bg-green-700 transition duration-300"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {snackbarMessage && (
          <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-green-200 text-green-800 py-2 px-6 rounded-lg shadow-lg">
            {snackbarMessage}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Volunteer;

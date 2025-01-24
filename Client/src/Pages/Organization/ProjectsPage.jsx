import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AddProjectModal from "../../Components/Organization/AddProjectModal";
import Navbar from "../../Components/Organization/Navbar";
import Footer from "../../Components/Footer";
import projectsData from "../../assets/projects.json"; // Import JSON data

const ProjectsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const [projects, setProjects] = useState([]); // Initialize with empty array
  const navigate = useNavigate(); // Initialize navigate function

  // Use the imported projects data instead of fetching
  useEffect(() => {
    const transformedProjects = projectsData.map((project) => ({
      _id: project.id,
      title: project.name,
      description: project.description,
      funding_goal: project.funding_goal,
      current_funding: project.funding_received,
      status:
        project.funding_received >= project.funding_goal
          ? "completed"
          : "active",
      impact_metrics: {
        co2_reduction: project.co2_reduction,
        trees_planted: project.trees_planted,
        water_saved: project.water_saved,
      },
    }));

    setProjects(transformedProjects); // Set the transformed projects
  }, []); // Empty dependency array means this runs once after initial render

  const handleSearch = (e) => setSearchQuery(e.target.value);
  const handleFilterChange = (e) => setFilter(e.target.value);

  const filteredProjects = projects.filter((project) => {
    return (
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (filter === "all" || project.status === filter)
    );
  });

  const handleAddProject = (newProject) => {
    setProjects((prevProjects) => [...prevProjects, newProject]); // Add new project
    setIsModalOpen(false); // Close the modal after adding
  };

  return (
    <>
    <Navbar />
    <div className="p-6">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={handleSearch}
            className="border p-2 rounded-lg w-80"
          />
          <select
            value={filter}
            onChange={handleFilterChange}
            className="border p-2 rounded-lg w-40"
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        {/* Add Project Button */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Add Project
        </button>
      </div>

      {/* Project Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <div
            key={project._id}
            className="cursor-pointer transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl rounded-lg border p-5 bg-white shadow-md hover:bg-gray-50"
            onClick={() => navigate(`/organisation/projects/${project._id}`)} // Navigate on click
          >
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold text-gray-800">{project.title}</h3>
              <span
                className={`text-xs font-semibold px-3 py-1 rounded-full ${
                  project.status === "active"
                    ? "bg-green-100 text-green-800"
                    : "bg-gray-200 text-gray-800"
                }`}
              >
                {project.status}
              </span>
            </div>

            <p className="text-sm text-gray-600 mt-2">{project.description}</p>

            <div className="mt-4">
              <p className="text-sm text-gray-500">
                <strong>Funding:</strong> ₹ {project.current_funding} / ₹{" "}
                {project.funding_goal}
              </p>

              <div className="w-full bg-gray-300 rounded-full h-2 mt-2">
                <div
                  className="bg-green-500 h-2 rounded-full"
                  style={{
                    width: `${
                      (project.current_funding / project.funding_goal) * 100
                    }%`,
                  }}
                ></div>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-lg font-bold text-green-600">
                  {project.impact_metrics.co2_reduction || 0}
                </p>
                <p className="text-xs text-gray-500">CO2 Reduced</p>
              </div>
              <div>
                <p className="text-lg font-bold text-green-600">
                  {project.impact_metrics.trees_planted || 0}
                </p>
                <p className="text-xs text-gray-500">Trees Planted</p>
              </div>
              <div>
                <p className="text-lg font-bold text-green-600">
                  {project.impact_metrics.water_saved || 0}
                </p>
                <p className="text-xs text-gray-500">Water Saved</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Project Modal */}
      <AddProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddProject={handleAddProject}
      />
    </div>
    <Footer />
    </>
  );
};

export default ProjectsPage;

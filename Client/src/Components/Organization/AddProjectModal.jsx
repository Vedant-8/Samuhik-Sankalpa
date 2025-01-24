import React, { useState } from "react";

const AddProjectModal = ({ isOpen, onClose, onAddProject }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    funding_goal: "",
    current_funding: 0,
    images: [],
    videos: [],
    impact_metrics: {
      co2_reduction: "",
      trees_planted: "",
      water_saved: "",
    },
    volunteer_roles: [],
    status: "active",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImpactMetricChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      impact_metrics: {
        ...prev.impact_metrics,
        [name]: value,
      },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("New Project Data:", formData);
    onAddProject(formData); // Callback to add project
    onClose(); // Close the modal
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-green-900 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-1/2 p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Add New Project</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800"
          >
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Title */}
          <div className="mb-4">
            <label className="block font-medium text-left">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
              className="border w-full p-2 rounded"
            />
          </div>

          {/* Description */}
          <div className="mb-4">
            <label className="block font-medium text-left">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
              className="border w-full p-2 rounded"
            ></textarea>
          </div>

          {/* Funding Goal */}
          <div className="mb-4">
            <label className="block font-medium text-left">Funding Goal (₹)</label>
            <input
              type="number"
              name="funding_goal"
              value={formData.funding_goal}
              onChange={handleInputChange}
              required
              className="border w-full p-2 rounded"
            />
          </div>

          {/* Images */}
          <div className="mb-4">
            <label className="block font-medium text-left">Images (URLs)</label>
            <input
              type="text"
              name="images"
              placeholder="Comma-separated URLs"
              value={formData.images}
              onChange={(e) =>
                setFormData({ ...formData, images: e.target.value.split(",") })
              }
              className="border w-full p-2 rounded"
            />
          </div>

          {/* Videos */}
          <div className="mb-4">
            <label className="block font-medium text-left">Videos (URLs)</label>
            <input
              type="text"
              name="videos"
              placeholder="Comma-separated URLs"
              value={formData.videos}
              onChange={(e) =>
                setFormData({ ...formData, videos: e.target.value.split(",") })
              }
              className="border w-full p-2 rounded"
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
            >
              Add Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProjectModal;

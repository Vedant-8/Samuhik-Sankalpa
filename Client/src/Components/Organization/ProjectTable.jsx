import React from "react";

const ProjectTable = () => {
  const projects = [
    { name: "Solar Panels", status: "Active", raised: "15,000", goal: "75%" },
    { name: "Community Garden", status: "Completed", raised: "8,000", goal: "100%" },
    { name: "Recycling Program", status: "Active", raised: "5,000", goal: "50%" },
    { name: "Urban Farming", status: "Active", raised: "3,500", goal: "60%" },
    { name: "Water Conservation", status: "Completed", raised: "7,000", goal: "100%" },
    { name: "Green Energy", status: "Active", raised: "4,500", goal: "40%" },
    { name: "Waste Reduction", status: "Active", raised: "2,000", goal: "30%" },
    { name: "Reforestation", status: "Completed", raised: "6,000", goal: "100%" },
    { name: "Sustainable Housing", status: "Active", raised: "8,500", goal: "65%" },
    { name: "Clean Water Initiative", status: "Active", raised: "10,000", goal: "70%" },
];

  return (
    <div className="bg-white shadow rounded-lg p-4 max-h-80 overflow-y-auto">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">Projects</h2>
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="p-2 border">Project Name</th>
            <th className="p-2 border">Status</th>
            <th className="p-2 border">Funds Raised</th>
            <th className="p-2 border">Goal Progress</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project, index) => (
            <tr key={index} className="hover:bg-gray-100 ">
              <td className="p-2 border">{project.name}</td>
              <td className="p-2 border">{project.status}</td>
              <td className="p-2 border">₹ {project.raised}</td>
              <td className="p-2 border">₹ {project.goal}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectTable;

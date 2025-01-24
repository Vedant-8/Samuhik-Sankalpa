import React, { useState, useEffect } from "react";
import { FaMapMarkerAlt, FaClock, FaProjectDiagram } from "react-icons/fa";
import Navbar from "../../Components/Organization/Navbar";
import Footer from "../../Components/Footer";
import volunteerData from "../../assets/volunteers.json"; // Import the JSON directly

const VolunteersPage = () => {
  const [volunteers, setVolunteers] = useState(volunteerData); // Use imported data directly

  // You can still use an effect in case you want to handle any other data processing or updates
  useEffect(() => {
    // Normally, you'd fetch the data here, but since it's already imported, you can skip that step.
  }, []);

  return (
    <>
      <Navbar />
      <div className="bg-gray-100 min-h-screen py-8 px-4">
        <div className="container mx-auto">
          {/* Header */}
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Volunteers
          </h1>

          {/* Stats Section */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-700">
                Total Volunteers
              </h2>
              <p className="text-4xl font-bold text-green-500 mt-4">
                {volunteers.length}
              </p>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-700">
                Total Hours Worked
              </h2>
              <p className="text-4xl font-bold text-blue-500 mt-4">
                {volunteers.reduce((total, vol) => total + vol.hoursWorked, 0)}
              </p>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-700">
                Projects Supported
              </h2>
              <p className="text-4xl font-bold text-purple-500 mt-4">
                {[...new Set(volunteers.map((vol) => vol.project))].length}
              </p>
            </div>
          </div>

          {/* Volunteers Table */}
          <div className="bg-white shadow-lg rounded-lg p-6 overflow-x-auto">
            <table className="table-auto w-full border-collapse border border-gray-200">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    Name
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    <div className="flex items-center space-x-2">
                      <FaMapMarkerAlt className="text-green-500" />
                      <span>Location</span>
                    </div>
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    <div className="flex items-center space-x-2">
                      <FaClock className="text-blue-500" />
                      <span>Hours Worked</span>
                    </div>
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    <div className="flex items-center space-x-2">
                      <FaProjectDiagram className="text-purple-500" />
                      <span>Project</span>
                    </div>
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    Details
                  </th>
                </tr>
              </thead>

              <tbody>
                {volunteers.map((volunteer, index) => (
                  <tr
                    key={volunteer.id}
                    className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                  >
                    <td className="border border-gray-300 px-4 py-2">
                      {volunteer.name}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {volunteer.location}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {volunteer.hoursWorked}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {volunteer.project}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {volunteer.details}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default VolunteersPage;

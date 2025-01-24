import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import organizationsData from "../../assets/orgs.json";

const DashCompo = () => {
  const [showModal, setShowModal] = useState(false);
  const [organizations, setOrganizations] = useState(
    organizationsData.organizations
  );
  const [reviewOrganizations, setReviewOrganizations] = useState([
    {
      name: "EcoSprout Foundation",
      email: "contact@ecosprout.org",
      description:
        "Dedicated to promoting sustainable agriculture and reforestation efforts worldwide.",
    },
    {
      name: "AquaVibe Initiative",
      email: "info@aquavibe.org",
      description:
        "A non-profit organization focused on conserving water resources and promoting efficient water use in urban areas.",
    },
  ]);

  // Fetch organizations from the JSON file (simulated here)
  useEffect(() => {
    fetch("/path/to/orgs.json")
      .then((response) => response.json())
      .then((data) => {
        const approvedOrgs = data.organizations.filter(
          (org) => org.status === "Approved"
        );
        setOrganizations(approvedOrgs);
      });
  }, []);

  return (
    <div className="p-8 space-y-6">
      {/* General Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <div className="p-6 bg-blue-500 text-white rounded-lg shadow">
          <h2 className="text-xl font-bold">Orgs</h2>
          <p className="text-3xl">10</p>
        </div>
        <div className="p-6 bg-green-500 text-white rounded-lg shadow">
          <h2 className="text-xl font-bold">Users</h2>
          <p className="text-3xl">150</p>
        </div>
        <div className="p-6 bg-yellow-500 text-white rounded-lg shadow">
          <h2 className="text-xl font-bold">Shop Revenue</h2>
          <p className="text-3xl">₹ 5,00,000</p>
        </div>
      </div>

      {/* Review New Orgs Button */}
      <button
        onClick={() => setShowModal(true)}
        className="px-6 py-3 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 mb-4"
      >
        Review New Orgs
      </button>

      {/* Organizations Table */}
      <div className="bg-white shadow rounded-lg overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">S/N</th>
              <th className="px-4 py-2 text-left">Organization Name</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Contact</th>
            </tr>
          </thead>
          <tbody>
            {organizations.map((org, idx) => (
              <tr key={idx} className="border-t">
                <td className="px-4 py-2">{idx + 1}</td>
                <td className="px-4 py-2">
                  <Link
                    to={`/admin/${org.id}`}
                    className="text-blue-500 hover:underline"
                  >
                    {org.name}
                  </Link>
                </td>
                <td className="px-4 py-2">
                  {org.email || "dummy@example.com"}
                </td>
                <td className="px-4 py-2">{org.contact || "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full sm:w-2/3 lg:w-1/2 space-y-4">
            <h3 className="text-lg font-bold">Review New Organizations</h3>
            <div className="space-y-4">
              {reviewOrganizations.map((org, idx) => (
                <div key={idx} className="border p-4 rounded-lg">
                  <h4 className="font-semibold">{org.name}</h4>
                  <p className="text-sm">Email: {org.email}</p>
                  <p className="text-sm">Description: {org.description}</p>
                  <div className="flex space-x-2 mt-2">
                    <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
                      Accept
                    </button>
                    <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
                      Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={() => setShowModal(false)}
              className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 mt-4"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashCompo;

import React from "react";

const RecentDonars = () => {
  const Donations = [
    { user: "Faiz Shinde", amount: "500", project: "Solar Panels", date: "2025-01-20" },
    { user: "Priya Sharma", amount: "300", project: "Community Garden", date: "2025-01-20" },
    { user: "Ananya Gupta", amount: "700", project: "Recycling Program", date: "2025-01-19" },
    { user: "Amit Verma", amount: "250", project: "Water Conservation", date: "2025-01-18" },
    { user: "Neha Patel", amount: "450", project: "Urban Farming", date: "2025-01-18" },
    { user: "Sanjay Reddy", amount: "600", project: "Solar Panels", date: "2025-01-18" },
    { user: "Maya Desai", amount: "550", project: "Community Garden", date: "2025-01-17" },
    { user: "Vikram Yadav", amount: "800", project: "Recycling Program", date: "2025-01-14" },
    { user: "Sanya Mehta", amount: "700", project: "Green Energy", date: "2025-01-16" },
    { user: "Rajesh Kumar", amount: "300", project: "Reforestation", date: "2025-01-12" },
    { user: "Shruti Iyer", amount: "450", project: "Waste Reduction", date: "2025-01-10" },
    { user: "Karan Singh", amount: "600", project: "Community Garden", date: "2025-01-11" },
    { user: "Simran Kaur", amount: "550", project: "Solar Panels", date: "2025-01-13" },
    { user: "Arjun Verma", amount: "400", project: "Water Conservation", date: "2025-01-09" },
    { user: "Aishwarya Rao", amount: "650", project: "Urban Farming", date: "2025-01-23" }
];


  return (
    <div className="bg-white shadow rounded-lg p-4 max-h-80 overflow-y-auto">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">Recent Donors</h2>
      <table className="min-w-full table-auto border-collapse">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b text-left text-sm font-semibold text-gray-600">User</th>
            <th className="py-2 px-4 border-b text-left text-sm font-semibold text-gray-600">Amount</th>
            <th className="py-2 px-4 border-b text-left text-sm font-semibold text-gray-600">Project</th>
            <th className="py-2 px-4 border-b text-left text-sm font-semibold text-gray-600">Date</th>
          </tr>
        </thead>
        <tbody>
          {Donations.map((Donation, index) => (
            <tr key={index}>
              <td className="py-2 px-4 border-b text-sm text-gray-600">{Donation.user}</td>
              <td className="py-2 px-4 border-b text-sm text-green-600 font-bold">₹ {Donation.amount}</td>
              <td className="py-2 px-4 border-b text-sm text-blue-500 italic">{Donation.project}</td>
              <td className="py-2 px-4 border-b text-sm text-gray-600">{Donation.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecentDonars;

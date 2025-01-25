import React from "react";

const StatsCard = ({ title, value }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
      <h3 className="text-lg font-semibold text-gray-700 mb-2">{title}</h3>
      <p className="text-2xl font-bold text-green-600">{value}</p>
    </div>
  );
};

export default StatsCard;

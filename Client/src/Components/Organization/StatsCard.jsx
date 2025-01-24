import React from "react";

const StatsCard = ({ title, value }) => {
  return (
    <div className="bg-white shadow rounded-lg p-4 text-center">
      <h2 className="text-lg font-semibold text-gray-700">{title}</h2>
      <p className="text-2xl font-bold text-green-600 mt-2">{value}</p>
    </div>
  );
};

export default StatsCard;

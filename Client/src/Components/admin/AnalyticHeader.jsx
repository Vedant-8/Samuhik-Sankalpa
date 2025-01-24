import React from 'react';

const AnalyticHeader = ({ organizations }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
      {/* Total CO2 Reduced */}
      <div className="bg-blue-100 p-6 rounded-lg shadow-lg flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <span className="text-3xl font-semibold text-blue-600">🌍</span>
          <div>
            <h3 className="text-lg font-medium">Total CO2 Reduced</h3>
            <p className="text-2xl font-bold text-gray-800">
              {organizations.reduce((total, org) => total + org.co2_reduction, 0)} tons
            </p>
          </div>
        </div>
      </div>

      {/* Total Trees Planted */}
      <div className="bg-green-100 p-6 rounded-lg shadow-lg flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <span className="text-3xl font-semibold text-green-600">🌱</span>
          <div>
            <h3 className="text-lg font-medium">Total Trees Planted</h3>
            <p className="text-2xl font-bold text-gray-800">
              {organizations.reduce((total, org) => total + org.trees_planted, 0)}
            </p>
          </div>
        </div>
      </div>

      {/* Total Water Saved */}
      <div className="bg-yellow-100 p-6 rounded-lg shadow-lg flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <span className="text-3xl font-semibold text-yellow-600">💧</span>
          <div>
            <h3 className="text-lg font-medium">Total Water Saved</h3>
            <p className="text-2xl font-bold text-gray-800">
              {organizations.reduce((total, org) => total + org.water_saved, 0)} liters
            </p>
          </div>
        </div>
      </div>

      {/* Total Volunteers */}
      <div className="bg-purple-100 p-6 rounded-lg shadow-lg flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <span className="text-3xl font-semibold text-purple-600">💵</span>
          <div>
            <h3 className="text-lg font-medium">Total Revenue in current FY (in ₹)</h3>
            <p className="text-2xl font-bold text-gray-800">
              {/* {organizations.reduce((total, org) => total + org.volunteers_count, 0)} */}
              5,00,000
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticHeader;

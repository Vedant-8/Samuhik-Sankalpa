import React from 'react';

const LeaderboardTable = ({ sortedOrganizations }) => {
  return (
    <div className="overflow-x-auto">
      <table className="table-auto w-full border-collapse border border-gray-200">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">Rank</th>
            <th className="border border-gray-300 p-2">Organization</th>
            <th className="border border-gray-300 p-2">CO2 Reduction</th>
            <th className="border border-gray-300 p-2">Trees Planted</th>
            <th className="border border-gray-300 p-2">Water Saved</th>
            <th className="border border-gray-300 p-2">Volunteers</th>
          </tr>
        </thead>
        <tbody>
          {sortedOrganizations.slice(0, 10).map((org, index) => (
            <tr key={index}>
              <td className="border border-gray-300 p-2">{index + 1}</td>
              <td className="border border-gray-300 p-2">{org.name}</td>
              <td className="border border-gray-300 p-2">{org.co2_reduction} tons</td>
              <td className="border border-gray-300 p-2">{org.trees_planted}</td>
              <td className="border border-gray-300 p-2">{org.water_saved} liters</td>
              <td className="border border-gray-300 p-2">{org.volunteers_count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeaderboardTable;

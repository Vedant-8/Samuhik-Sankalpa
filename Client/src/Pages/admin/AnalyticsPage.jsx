import React, { useState, useEffect } from "react";
import AnalyticHeader from "../../Components/admin/AnalyticHeader";
import LeaderboardTable from "../../Components/admin/LeaderboardTable";
import ProjectList from "../../Components/admin/ProjectList";
import Navbar from "../../Components/admin/Navbar";
import Footer from "../../Components/Footer";
import organizationsData from "../../assets/orgs.json";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const AnalyticsPage = () => {
  const [organizations, setOrganizations] = useState(
    organizationsData.organizations
  );

  // Fetch the organizations data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/orgs.json"); // Fetching from public folder
        const data = await response.json();
        setOrganizations(data.organizations);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Sorting organizations based on total impact (CO2 + Trees + Water Saved)
  const sortedOrganizations = organizations.sort((a, b) => {
    const totalImpactA = a.co2_reduction + a.trees_planted + a.water_saved;
    const totalImpactB = b.co2_reduction + b.trees_planted + b.water_saved;
    return totalImpactB - totalImpactA; // Sorting in descending order
  });

  // Mock data for monthly impact metrics (you can replace it with real data)
  const monthlyStats = {
    co2_reduction: {
      labels: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      data: [
        1000, 1200, 1100, 900, 950, 1000, 1100, 1150, 1050, 1200, 1300, 1400,
      ], // Replace with real data
    },
    water_saved: {
      labels: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      data: [
        2000, 2500, 2400, 2200, 2300, 2500, 2700, 2800, 2600, 2700, 2900, 3000,
      ], // Replace with real data
    },
    trees_planted: {
      labels: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      data: [500, 600, 550, 700, 650, 600, 700, 750, 800, 850, 900, 1000], // Replace with real data
    },
  };

  // Mock data for monthly revenue generation (you can replace it with real data)
  const revenueData = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Revenue ($)",
        data: [
          5000, 6000, 7000, 8000, 7500, 8500, 9000, 9500, 10000, 11000, 12000,
          13000,
        ], // Replace with real data
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  return (
    <>
      <Navbar />
      <div className="p-8 bg-gray-50">
        {/* Analytics Header */}
        <AnalyticHeader organizations={organizations} />

        {/* Graphs Section */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Section for Graphs */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">
              Impact Generation (Month Wise)
            </h3>

            {/* CO2 Reduction Graph */}
            <div className="mb-8">
              <h4 className="text-lg font-semibold text-gray-700 mb-2">
                CO2 Reduction (kg)
              </h4>
              <Line
                data={{
                  labels: monthlyStats.co2_reduction.labels,
                  datasets: [
                    {
                      label: "CO2 Reduction (kg)",
                      data: monthlyStats.co2_reduction.data,
                      borderColor: "rgba(75, 192, 192, 1)",
                      backgroundColor: "rgba(75, 192, 192, 0.2)",
                      fill: true,
                      tension: 0.4,
                    },
                  ],
                }}
              />
            </div>

            {/* Water Saved Graph */}
            <div>
              <h4 className="text-lg font-semibold text-gray-700 mb-2">
                Water Saved (liters)
              </h4>
              <Line
                data={{
                  labels: monthlyStats.water_saved.labels,
                  datasets: [
                    {
                      label: "Water Saved (liters)",
                      data: monthlyStats.water_saved.data,
                      borderColor: "rgba(54, 162, 235, 1)",
                      backgroundColor: "rgba(54, 162, 235, 0.2)",
                      fill: true,
                      tension: 0.4,
                    },
                  ],
                }}
              />
            </div>
          </div>

          {/* Right Section for Graphs */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">
              Impact Generation (Month Wise)
            </h3>

            {/* Trees Planted Graph */}
            <div className="mb-8">
              <h4 className="text-lg font-semibold text-gray-700 mb-2">
                Trees Planted
              </h4>
              <Line
                data={{
                  labels: monthlyStats.trees_planted.labels,
                  datasets: [
                    {
                      label: "Trees Planted",
                      data: monthlyStats.trees_planted.data,
                      borderColor: "rgba(255, 159, 64, 1)",
                      backgroundColor: "rgba(255, 159, 64, 0.2)",
                      fill: true,
                      tension: 0.4,
                    },
                  ],
                }}
              />
            </div>

            {/* Revenue Generation Graph */}
            <div>
              <h4 className="text-lg font-semibold text-gray-700 mb-2">
                Revenue Generation
              </h4>
              <Line data={revenueData} />
            </div>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Section (Project List) */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Projects
            </h2>
            <ProjectList organizations={organizations} />
          </div>

          {/* Middle Section (Leaderboard Table) */}
          <div className="col-span-2 bg-white shadow-lg rounded-lg p-6">
            <LeaderboardTable sortedOrganizations={sortedOrganizations} />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AnalyticsPage;

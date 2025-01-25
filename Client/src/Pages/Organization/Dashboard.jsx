import React from "react";
import Header from "../../Components/Organization/Header";
import StatsCard from "../../Components/Organization/StatsCard";
import ProjectTable from "../../Components/Organization/ProjectTable";
import RecentDonars from "../../Components/Organization/RecentDonars";
import Navbar from "../../Components/Organization/Navbar";
import Footer from "../../Components/Footer";

const Dashboard = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-[80vh] bg-gray-100">
        <Header />
        <div className="p-6 space-y-6">
          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <StatsCard title="Total Funds Raised (in '₹')" value="50,000" />
            <StatsCard title="Active Projects" value="7" />
            <StatsCard title="Volunteer Count" value="18" />
            <StatsCard title="Total Donors" value="129" />
          </div>
  
          {/* Projects and Investments */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ProjectTable />
            <RecentDonars />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
  
};

export default Dashboard;

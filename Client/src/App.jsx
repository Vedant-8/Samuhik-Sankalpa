import { useState, createContext, useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import ScrollToTop from "./ScrollToTop";
import UDashboard from "./Components/User/UDashboard";
import ProjectDetail from "./Components/User/ProjectDetail";
import Dashboard from "./Pages/Organization/Dashboard";
import ContactUs from "./Pages/Organization/ContactUs";
import ProjectsPage from "./Pages/Organization/ProjectsPage";
import IndividualProjectPage from "./Pages/Organization/IndividualProjectPage";
import VolunteersPage from "./Pages/Organization/VolunteersPage";
import Leaderboard from "./Pages/Organization/Leaderboard";
import LandingPage from "./Pages/LandingPage";
import Rewards from "./Components/User/Rewards";
import Volunteer from "./Components/User/Volunteer";
import Shop from "./Components/User/Shop";
import Blog from "./Components/User/Blog";
import Suggestion from "./Utils/User/Suggestion";
import AnalyticsPage from "./Pages/Admin/AnalyticsPage";
import ADashboard from "./Pages/Admin/ADashboard";
import CostEstimation from "./Utils/Organisation/CostEstimation";
import AdminShopPage from "./Pages/Admin/AdminShopPage";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Game from "./Utils/User/Games/Game";
import Bills from "./Utils/User/Bills";
import Recycle from "./Components/User/Recycle";
import UploadPage from "./Components/User/HandlePhone";

import ContentGenerator from "./Pages/Organization/ContentGenerator";

import Home from "./Pages/Home";
import GreenShop from "./Components/User/GreenShop";

// Create a context for authentication
export const AuthContext = createContext();

function App() {
  const [userRole, setUserRole] = useState(null); // Stores user role ("User", "Organisation", or "Admin")

  return (
    <AuthContext.Provider value={{ userRole, setUserRole }}>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* User Routes */}
          <Route path="/user" element={<UDashboard />} />
          <Route path="/user/project/:id" element={<ProjectDetail />} />
          <Route path="/user/volunteer" element={<Volunteer />} />
          <Route path="/user/rewards" element={<Rewards />} />
          <Route path="/user/shop" element={<Shop />} />
          <Route path="/user/educational" element={<Blog />} />
          <Route path="/user/suggestion" element={<Suggestion />} />
          <Route path="/user/games" element={<Game />} />
          <Route path="/user/bills" element={<Bills />} />
          <Route path="/user/recycle" element={<Recycle />} />
          <Route path="/user/upload" element={<UploadPage />} />
          <Route path="/user/greenShop" element={<GreenShop />} />

          {/* Organization Routes */}
          <Route path="/organisation" element={<Dashboard />} />
          <Route path="/organisation/contact" element={<ContactUs />} />
          <Route path="/organisation/projects" element={<ProjectsPage />} />
          <Route path="/organisation/projects/:id" element={<IndividualProjectPage />} />
          <Route path="/organisation/volunteers" element={<VolunteersPage />} />
          <Route path="/organisation/leaderboard" element={<Leaderboard />} />
          <Route path="/organisation/costEstimation" element={<CostEstimation />} />
          <Route path="/organisation/contentgenerator" element={<ContentGenerator />} />

          {/* Admin Routes */}
          <Route path="/admin" element={<ADashboard />} />
          <Route path="/admin/analytics" element={<AnalyticsPage />} />
          <Route path="/admin/shop" element={<AdminShopPage />} />
        </Routes>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;

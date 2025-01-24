import React, { useState, useContext } from "react";
import axios from "axios";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../App"; // Import AuthContext

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

  const { setUserRole } = useContext(AuthContext); // Access setUserRole from AuthContext

  const handleLogin = async (e) => {
    e.preventDefault();

    console.log("Attempting login with:", { email, password });

    try {
      const response = await axios.post("http://localhost:8888/login", {
        email,
        password,
      });

      console.log("Login API response:", response);

      if (response.status === 200) {
        const { role } = response.data; // Extract role from response

        setUserRole(role); // Save the role in the context
        setSuccess("Login successful!");
        setError("");

        console.log(`Login successful as ${role}, redirecting...`);

        // Navigate based on role
        if (role === "User") {
          navigate("/user"); // Navigate to User Dashboard
        } else if (role === "Organisation") {
          navigate("/organisation"); // Navigate to Organisation Dashboard
        } else if (role === "Admin") {
          navigate("/admin"); // Navigate to Admin Dashboard
        }
      }
    } catch (err) {
      console.error("Login error:", err);
      console.error("Error response data:", err.response?.data);
      setError(err.response?.data?.msg || "Login failed");
      setSuccess("");
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-r from-emerald-400 to-teal-500 flex justify-center items-center">
        <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
          <h2 className="text-2xl font-bold text-center text-teal-800 mb-6">
            Welcome Back
          </h2>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label
                className="block text-teal-800 font-semibold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-emerald-400"
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-teal-800 font-semibold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-emerald-400"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-teal-600 text-white p-3 rounded-lg hover:bg-teal-700 transition"
            >
              Login
            </button>
          </form>
          {error && <p className="text-center text-red-600 mt-4">{error}</p>}
          {success && (
            <p className="text-center text-green-600 mt-4">{success}</p>
          )}
          <p className="text-center text-teal-600 mt-4">
            Don't have an account?{" "}
            <a href="/signup" className="text-emerald-700 font-semibold">
              Sign up
            </a>
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;

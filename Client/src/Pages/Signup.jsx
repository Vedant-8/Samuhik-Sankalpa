import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phno: "",
    role: "User", // Default to "User"
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate(); // Initialize useNavigate

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  // Handle form submission
  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    console.log("Form data submitted:", formData);

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8888/register", {
        name: formData.name,
        email: formData.email,
        phno: formData.phno,
        role: formData.role,
        password: formData.password,
        confirm_password: formData.confirmPassword,
      });

      console.log("Signup API response:", response);

      if (response.status === 200 && response.data.msg === "created") {
        setSuccess("Account created successfully! Redirecting to login...");
        setFormData({
          name: "",
          email: "",
          phno: "",
          role: "User",
          password: "",
          confirmPassword: "",
        });

        // Redirect to login after 2 seconds
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        setError("Failed to create an account. Please try again.");
      }
    } catch (err) {
      console.error("Signup error:", err);
      console.error("Error response data:", err.response?.data);
      setError(
        err.response?.data?.message || "Signup failed. Please try again."
      );
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-r from-emerald-400 to-green-500 flex justify-center items-center">
        <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-lg m-3">
          <h2 className="text-2xl font-bold text-emerald-800 mb-6 text-center">
            Create an Account
          </h2>

          <form onSubmit={handleSignup}>
            <div className="mb-4">
              <label
                className="block text-emerald-800 font-semibold mb-2 text-left"
                htmlFor="name"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-green-400"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-emerald-800 font-semibold mb-2 text-left"
                htmlFor="email"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-green-400"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-emerald-800 font-semibold mb-2 text-left"
                htmlFor="phno"
              >
                Phone Number
              </label>
              <input
                type="tel"
                id="phno"
                placeholder="Enter your phone number"
                value={formData.phno}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-green-400"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-emerald-800 font-semibold mb-2 text-left"
                htmlFor="role"
              >
                Role
              </label>
              <select
                id="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-green-400"
              >
                <option value="User">User</option>
                <option value="Organisation">Organisation</option>
              </select>
            </div>
            <div className="mb-4">
              <label
                className="block text-emerald-800 font-semibold mb-2 text-left"
                htmlFor="password"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-green-400"
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-emerald-800 font-semibold mb-2 text-left"
                htmlFor="confirmPassword"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-green-400"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-emerald-600 text-white p-3 rounded-lg hover:bg-emerald-700 transition"
            >
              Sign Up
            </button>
          </form>

          {error && <p className="text-center text-red-600 mt-4">{error}</p>}
          {success && (
            <p className="text-center text-green-600 mt-4">{success}</p>
          )}
          <p className="text-center text-emerald-600 mt-4">
            Already have an account?{" "}
            <a href="/login" className="text-teal-700 font-semibold">
              Login
            </a>
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Signup;

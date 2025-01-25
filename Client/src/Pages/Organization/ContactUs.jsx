import React, { useState } from "react";
import Navbar from "../../Components/Organization/Navbar";
import Footer from "../../Components/Footer";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccessMessage("Thank you for reaching out! We'll get back to you soon.");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setSuccessMessage("Something went wrong. Please try again later.");
      }
    } catch (error) {
      setSuccessMessage("An error occurred. Please try again later.");
    }
  };

  return (
    <>
    <Navbar />
    <div className="min-h-[90vh] flex flex-col items-center justify-center bg-gradient-to-br from-green-100 to-green-300 py-6">
      <h1 className="text-4xl font-bold text-gray-800 mb-4 text-center mt-6">
        Get in Touch
      </h1>
      <p className="text-lg text-gray-700 mb-10 text-center">
        Have questions or need support? Drop us a message, and we’ll get back to you!
      </p>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-lg"
      >
        <div className="mb-6">
          <label
            htmlFor="name"
            className="block text-gray-700 font-semibold mb-2"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Enter your full name"
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="email"
            className="block text-gray-700 font-semibold mb-2"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Enter your email address"
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="message"
            className="block text-gray-700 font-semibold mb-2"
          >
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows="4"
            className="w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Write your message here"
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
        >
          Send Message
        </button>
      </form>
      {successMessage && (
        <p className="mt-6 text-green-700 font-medium text-center">
          {successMessage}
        </p>
      )}
    </div>
    <Footer />
    </>
  );
};

export default ContactUs;

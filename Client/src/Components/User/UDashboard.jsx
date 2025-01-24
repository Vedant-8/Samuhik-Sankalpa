import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import projectsData from "../../assets/projects.json";
import Navbar from "./Navbar";
import Footer from "../Footer";

const UDashboard = () => {
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentSlide, setCurrentSlide] = useState(0); // State to track the current slide
  const [showModal, setShowModal] = useState(false); // Modal visibility state
  const [selectedEvent, setSelectedEvent] = useState(null); // Store the selected event
  const [rsvpSubmitted, setRsvpSubmitted] = useState(false); // State to track RSVP submission
  const [carouselPaused, setCarouselPaused] = useState(false); // Pause the carousel when register button is clicked
  const [notification, setNotification] = useState(""); // Store the notification message
  const navigate = useNavigate();

  const events = [
    {
      title: "Online Workshop on Sustainable Living",
      date: "January 30, 2025",
      description: "Join us for a free online workshop on sustainability.",
      image: "https://images.pexels.com/photos/531880/pexels-photo-531880.jpeg?cs=srgb&dl=pexels-pixabay-531880.jpg&fm=jpg",
      link: "/register",
    },
    {
      title: "Annual Community Meetup",
      date: "February 15, 2025",
      description: "Meet the like minded people and have a good time.",
      image: "https://images.pexels.com/photos/531880/pexels-photo-531880.jpeg?cs=srgb&dl=pexels-pixabay-531880.jpg&fm=jpg",
      link: "/register",
    },
    {
      title: "Water Conservation Webinar",
      date: "March 5, 2025",
      description: "Learn techniques to conserve water at home.",
      image: "https://images.pexels.com/photos/531880/pexels-photo-531880.jpeg?cs=srgb&dl=pexels-pixabay-531880.jpg&fm=jpg",
      link: "/register",
    },
  ];

  // Carousel auto-slide effect (with control to pause)
  useEffect(() => {
    if (!carouselPaused) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % events.length);
      }, 8000); // Change slide every 8 seconds
      return () => clearInterval(interval);
    }
  }, [carouselPaused, events.length]);

  useEffect(() => {
    const calculateFundingPercentage = (projects) => {
      return projects.map((project) => ({
        ...project,
        funding_received_percentage: Math.min(
          (project.funding_received / project.funding_goal) * 100,
          100
        ),
      }));
    };

    setFilteredProjects(calculateFundingPercentage(projectsData));
  }, []);

  useEffect(() => {
    const calculateFundingPercentage = (projects) => {
      return projects.map((project) => ({
        ...project,
        funding_received_percentage: Math.min(
          (project.funding_received / project.funding_goal) * 100,
          100
        ),
      }));
    };

    if (searchTerm.trim() === "") {
      setFilteredProjects(calculateFundingPercentage(projectsData));
    } else {
      setFilteredProjects(
        calculateFundingPercentage(
          projectsData.filter((project) =>
            project.name.toLowerCase().includes(searchTerm.toLowerCase())
          )
        )
      );
    }
  }, [searchTerm]);

  const handleCardClick = (id) => {
    navigate(`/user/project/${id}`); // Navigate to the project detail page with the project ID
  };

  // Handle Register Now button click
  const handleRegisterClick = (event) => {
    setSelectedEvent(event); // Set selected event details
    setShowModal(true); // Open the modal
    setCarouselPaused(true); // Stop the carousel motion
  };

  // Handle RSVP button click
  const handleRsvpClick = async () => {
    // Close the modal immediately
    setShowModal(false);
  
    // Show notification for RSVP confirmation
    setNotification("Further details will be shared soon to your email!");
  
    // Call the backend to send an email
    try {
      const response = await fetch("http://localhost:8888/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          eventDetails: selectedEvent, // Pass selected event details
        }),
      });
  
      if (response.ok) {
        console.log("Email sent successfully");
      } else {
        console.error("Error sending email");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  
    // Hide the notification after 2 seconds
    setTimeout(() => {
      setNotification("");
    }, 2000);
  };
  

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-r from-[#e8f5e9] to-white">
        {/* Carousel Section */}
        <div className="w-full h-[350px] relative overflow-hidden bg-gray-100 flex items-center justify-center">
          {events.map((event, index) => (
            <div
              key={index}
              className={`absolute w-full h-full transition-transform duration-700 ${
                index === currentSlide ? "translate-x-0" : "translate-x-full"
              }`}
              style={{
                transform: `translateX(${100 * (index - currentSlide)}%)`,
              }}
            >
              <div
                className="w-full h-full bg-cover bg-center flex flex-col justify-center items-center text-white px-4 md:px-8"
                style={{
                  backgroundImage: `url(${event.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="bg-black/60 p-4 md:p-6 rounded-lg text-center">
                  <h2 className="text-2xl md:text-4xl font-bold mb-2">
                    {event.title}
                  </h2>
                  <p className="text-sm md:text-base mb-2">{event.date}</p>
                  <p className="text-sm md:text-base mb-4">
                    {event.description}
                  </p>
                  <button
                    onClick={() => handleRegisterClick(event)}
                    className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg text-sm md:text-base transition-all duration-200"
                  >
                    Register Now
                  </button>
                </div>
              </div>
            </div>
          ))}
          {/* Carousel Controls */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {events.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full ${
                  currentSlide === index
                    ? "bg-green-500 scale-110"
                    : "bg-gray-300"
                }`}
              ></button>
            ))}
          </div>
        </div>

        {/* Modal for Event Registration */}
        {showModal && (
          <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-lg w-full">
              <h2 className="text-3xl font-bold mb-4">{selectedEvent.title}</h2>
              <p className="text-lg mb-4">{selectedEvent.description}</p>
              <p className="text-sm text-gray-600 mb-6">{selectedEvent.date}</p>
              <button
                onClick={handleRsvpClick}
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg text-sm md:text-base transition-all duration-200"
              >
                RSVP
              </button>
              {rsvpSubmitted && (
                <p className="mt-4 text-green-600">RSVP confirmed!</p>
              )}
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-2 right-2 text-gray-500"
              >
                X
              </button>
            </div>
          </div>
        )}

        {/* RSVP Confirmation Notification */}
        {notification && (
          <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-full text-center z-40">
            {notification}
          </div>
        )}

        {/* Search Bar Section */}
        <div className="flex flex-col items-center py-6 md:py-8">
          <div className="flex flex-col md:flex-row items-center space-y-3 md:space-y-0 md:space-x-4">
            <input
              type="text"
              placeholder="Search Projects"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="p-3 rounded-2xl shadow-md w-72 md:w-96 text-lg font-medium placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <Link
              to="/user/suggestion"
              className="bg-transparent border border-green-500 text-green-600 px-4 py-2 rounded-2xl text-sm font-medium hover:bg-green-500 hover:text-white transition-all duration-200"
            >
              Confused? Get AI help!
            </Link>
          </div>
        </div>

        {/* Project Cards */}
        <div className="flex justify-center px-4 pb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-7xl w-full">
            {/* Show message if no projects are found */}
            {filteredProjects.length === 0 ? (
              <div className="col-span-full text-center text-xl text-gray-600">
                No such projects exist
              </div>
            ) : (
              filteredProjects.map((project) => (
                <div key={project.id} className="cursor-pointer">
                  <div
                    onClick={() => handleCardClick(project.id)}
                    className="bg-[#f5fbf4] rounded-2xl p-6 h-[350px] flex flex-col justify-between transition-all transform hover:scale-105 hover:shadow-2xl hover:shadow-green-300 border border-[#e0f2e0]"
                  >
                    {/* Location with Icon */}
                    <div className="flex items-center justify-end mb-3">
                      <LocationOnIcon className="text-[#388e3c] mr-2 text-xl" />
                      <span className="text-right text-gray-600 text-sm">
                        {project.location}
                      </span>
                    </div>
                    <h3 className="font-semibold text-center text-2xl text-[#333333] mb-3">
                      {project.name}
                    </h3>
                    <p className="text-gray-600 text-center mb-3 text-sm">
                      {project.short_description}
                    </p>
                    <div className="flex justify-between items-center mb-4">
                      <span className="font-semibold text-green-600 text-lg">
                        Goal: ₹{project.funding_goal}
                      </span>
                      <span className="text-gray-500 text-right text-sm">
                        {`${project.funding_received_percentage.toFixed(
                          0
                        )}% completed`}
                      </span>
                    </div>
                    {/* Funding Progress Bar */}
                    <div className="h-2 bg-[#e0e0e0] rounded-full overflow-hidden mb-4">
                      <div
                        className="h-full bg-[#388e3c]"
                        style={{
                          width: `${project.funding_received_percentage}%`,
                        }}
                      ></div>
                    </div>
                    <div className="text-center">
                      <button className="bg-[#388e3c] text-white py-3 px-6 rounded-lg hover:bg-[#4CAF50] transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-green-500">
                        Donate
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default UDashboard;

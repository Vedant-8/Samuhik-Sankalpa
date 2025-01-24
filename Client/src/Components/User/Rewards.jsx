import React from "react";
import { Leaf, Droplets, Wind, Sprout, TrendingUp, Users, Award, Lock } from "lucide-react";
import Navbar from "./Navbar";
import Footer from "../Footer";
import { motion } from "framer-motion";


const Rewards = () => {
  // User achievements data
  const achievements = [
    {
      id: 1,
      title: "Carbon Footprint Reducer",
      description: "Reduced carbon emissions through sustainable practices.",
      progress: "75%",
      achieved: true,
      impact: "Saved 250kg of CO2",
      icon: <Leaf className="w-6 h-6 text-green-600" />,
    },
    {
      id: 2,
      title: "Water Conservation Champion",
      description: "Adopted water-saving techniques.",
      progress: "60%",
      achieved: true,
      impact: "Saved 1,000 liters of water",
      icon: <Droplets className="w-6 h-6 text-blue-600" />,
    },
    {
      id: 3,
      title: "Renewable Energy Adopter",
      description: "Started transitioning to renewable energy sources.",
      progress: "40%",
      achieved: false,
      impact: "On track to save 500kWh",
      icon: <Wind className="w-6 h-6 text-teal-600" />,
    },
    {
      id: 4,
      title: "Green Garden Guardian",
      description: "Maintained a sustainable garden with native plants.",
      progress: "90%",
      achieved: true,
      impact: "Created habitat for 12 species",
      icon: <Sprout className="w-6 h-6 text-green-600" />,
    },
  ];

  // Total 12 badges (5 unlocked and 7 locked)
  const badges = [
    { id: 1, title: "Eco Warrior", icon: <Award className="w-6 h-6 text-teal-600" />, unlocked: true },
    { id: 2, title: "Green Thumb", icon: <Sprout className="w-6 h-6 text-green-600" />, unlocked: true },
    { id: 3, title: "Water Saver", icon: <Droplets className="w-6 h-6 text-blue-600" />, unlocked: true },
    { id: 4, title: "Climate Champion", icon: <Leaf className="w-6 h-6 text-green-600" />, unlocked: true },
    { id: 5, title: "Eco Innovator", icon: <Award className="w-6 h-6 text-teal-600" />, unlocked: true },
    { id: 6, title: "Zero Waste Hero", icon: <Award className="w-6 h-6 text-teal-600" />, unlocked: false },
    { id: 7, title: "Carbon Neutral Pioneer", icon: <Droplets className="w-6 h-6 text-blue-600" />, unlocked: false },
    { id: 8, title: "Green Tech Leader", icon: <Wind className="w-6 h-6 text-teal-600" />, unlocked: false },
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 50 }, // Start below and invisible
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5, // Slower animation for each card
        delay: 0.3, // Add a delay before all animations start
        ease: "easeInOut", // Smooth easing
      },
    },
  };
  
  const containerVariants = {
    visible: {
      transition: {
         // Longer delay between child animations
      },
    },
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-6">
        {/* Page Header */}
        <motion.div
          className="w-full max-w-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Your Rewards</h1>
            <p className="text-gray-600">Track your progress and achievements.</p>
          </div>
        </motion.div>
  
        {/* Main Stats */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8"
          initial="hidden" // All cards start hidden
          animate="visible" // Trigger visible animation
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.2, // Stagger animation of each stat
              },
            },
          }}
        >
          <motion.div
            className="bg-gray-100 p-4 rounded-lg text-center"
            variants={{
              hidden: { opacity: 0, y: 50 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 1, ease: "easeInOut" }}
          >
            <TrendingUp className="w-8 h-8 text-teal-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-800">2,500+</div>
            <p className="text-gray-600">Total Points</p>
          </motion.div>
          <motion.div
            className="bg-gray-100 p-4 rounded-lg text-center"
            variants={{
              hidden: { opacity: 0, y: 50 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 1, ease: "easeInOut" }}
          >
            <Users className="w-8 h-8 text-teal-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-800">30</div>
            <p className="text-gray-600">Day Streak</p>
          </motion.div>
          <motion.div
            className="bg-gray-100 p-4 rounded-lg text-center"
            variants={{
              hidden: { opacity: 0, y: 50 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 1, ease: "easeInOut" }}
          >
            <Award className="w-8 h-8 text-teal-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-800">5</div>
            <p className="text-gray-600">Badges Earned</p>
          </motion.div>
          <motion.div
            className="bg-gray-100 p-4 rounded-lg text-center"
            variants={{
              hidden: { opacity: 0, y: 50 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 1, ease: "easeInOut" }}
          >
            <Sprout className="w-8 h-8 text-teal-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-800">10</div>
            <p className="text-gray-600">Initiatives Completed</p>
          </motion.div>
        </motion.div>
  
        {/* Achievements and Badges Section */}
        <div className="flex flex-wrap gap-8">
          {/* Left Section: Achievements */}
          <motion.div
            className="bg-white shadow-lg rounded-lg p-6 flex-1"
            initial={{ opacity: 0, x: -100 }} // Start off-screen to the left
            animate={{ opacity: 1, x: 0 }} // Move to its original position
            transition={{
              duration: 1, // Smooth animation over 1 second
              ease: "easeInOut", // Smooth easing for the transition
            }}
          >
            <h2 className="text-xl font-bold text-teal-800 mb-4">Achievements</h2>
            <div className="space-y-4">
              {achievements.map((achievement) => (
                <motion.div
                  key={achievement.id}
                  className={`flex items-start gap-4 p-4 border rounded-lg ${
                    achievement.achieved ? "border-green-200" : "border-gray-200"
                  }`}
                  whileHover={{
                    scale: 1.03, // Slightly increase size
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.15)", // Add shadow
                  }}
                  transition={{ duration: 0.3 }} // Smooth transition for hover
                >
                  <div
                    className={`rounded-full p-3 ${
                      achievement.achieved ? "bg-green-100" : "bg-gray-100"
                    }`}
                  >
                    {achievement.icon}
                  </div>
                  <div className="flex-1">
                    <h3
                      className={`font-bold ${
                        achievement.achieved ? "text-green-700" : "text-gray-700"
                      }`}
                    >
                      {achievement.title}
                    </h3>
                    <p className="text-sm text-gray-600">{achievement.description}</p>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div
                        className={`h-2 rounded-full ${
                          achievement.achieved ? "bg-green-500" : "bg-teal-200"
                        }`}
                        style={{ width: achievement.progress }}
                      ></div>
                    </div>
                    <p className="mt-2 text-sm text-teal-600">{achievement.impact}</p>
                  </div>
                  <span
                    className={`text-sm font-medium px-3 py-1 rounded-full ${
                      achievement.achieved
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {achievement.progress}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
  
          {/* Right Section: Badges */}
          <motion.div
            className="bg-white shadow-lg rounded-lg p-6 flex-1"
            initial={{ opacity: 0, x: 100 }} // Start off-screen to the right
            animate={{ opacity: 1, x: 0 }} // Move to its original position
            transition={{
              duration: 1, // Smooth animation over 1 second
              ease: "easeInOut", // Smooth easing for the transition
            }}
          >
            <h2 className="text-xl font-bold text-teal-800 mb-4">Badges</h2>
  
            {/* Unlocked Badges */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Unlocked Badges
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {badges.slice(0, 5).map((badge) => (
                  <motion.div
                    key={badge.id}
                    className="flex items-center gap-4 p-4 border rounded-lg border-gray-200"
                    whileHover={{
                      scale: 1.05, // Slightly increase size
                      boxShadow: "0px 4px 10px rgba(0, 128, 128, 0.3)", // Add a teal glow
                    }}
                    transition={{ duration: 0.3 }} // Smooth transition for hover
                  >
                    <div className="rounded-full p-3 bg-gray-100">{badge.icon}</div>
                    <div>
                      <h3 className="font-bold text-gray-800">{badge.title}</h3>
                      <p className="text-sm text-gray-600">
                        Earned for completing specific tasks.
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
  
            {/* Locked Badges */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Locked Badges
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {badges.slice(5).map((badge) => (
                  <div
                    key={badge.id}
                    className={`flex items-center gap-4 p-4 border rounded-lg ${
                      badge.unlocked ? "border-gray-200" : "border-gray-300"
                    }`}
                  >
                    <div
                      className={`rounded-full p-3 ${
                        badge.unlocked ? "bg-gray-100" : "bg-gray-200"
                      }`}
                    >
                      {badge.unlocked ? (
                        badge.icon
                      ) : (
                        <Lock className="w-6 h-6 text-gray-400" />
                      )}
                    </div>
                    <div>
                      <h3
                        className={`font-bold ${
                          badge.unlocked ? "text-gray-800" : "text-gray-400"
                        }`}
                      >
                        {badge.title}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {badge.unlocked
                          ? "Earned for completing specific tasks."
                          : "Locked"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </>
  );
};  

export default Rewards;

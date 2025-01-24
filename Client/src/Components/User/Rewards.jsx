import React from "react";
import { Leaf, Droplets, Wind, Sprout, TrendingUp, Users, Award, Lock } from "lucide-react";
import Navbar from "./Navbar";
import Footer from "../Footer";

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

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-6">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Your Rewards</h1>
          <p className="text-gray-600">Track your progress and achievements.</p>
        </div>

        {/* Main Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-100 p-4 rounded-lg text-center">
            <TrendingUp className="w-8 h-8 text-teal-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-800">2,500+</div>
            <p className="text-gray-600">Total Points</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg text-center">
            <Users className="w-8 h-8 text-teal-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-800">30</div>
            <p className="text-gray-600">Day Streak</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg text-center">
            <Award className="w-8 h-8 text-teal-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-800">5</div>
            <p className="text-gray-600">Badges Earned</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg text-center">
            <Sprout className="w-8 h-8 text-teal-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-800">10</div>
            <p className="text-gray-600">Initiatives Completed</p>
          </div>
        </div>

        {/* Achievements and Badges Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Section: Achievements */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-bold text-teal-800 mb-4">Achievements</h2>
            <div className="space-y-4">
              {achievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className={`flex items-start gap-4 p-4 border rounded-lg ${
                    achievement.achieved ? "border-green-200" : "border-gray-200"
                  }`}
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
                </div>
              ))}
            </div>
          </div>

          {/* Right Section: Badges */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-bold text-teal-800 mb-4">Badges</h2>
            
            {/* Unlocked Badges */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Unlocked Badges</h3>
              <div className="grid grid-cols-2 gap-4">
                {badges.slice(0, 5).map((badge) => (
                  <div
                    key={badge.id}
                    className="flex items-center gap-4 p-4 border rounded-lg border-gray-200"
                  >
                    <div className="rounded-full p-3 bg-gray-100">{badge.icon}</div>
                    <div>
                      <h3 className="font-bold text-gray-800">{badge.title}</h3>
                      <p className="text-sm text-gray-600">Earned for completing specific tasks.</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Locked Badges */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Locked Badges</h3>
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
                      {badge.unlocked ? badge.icon : <Lock className="w-6 h-6 text-gray-400" />}
                    </div>
                    <div>
                      <h3 className={`font-bold ${badge.unlocked ? "text-gray-800" : "text-gray-400"}`}>
                        {badge.title}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {badge.unlocked ? "Earned for completing specific tasks." : "Locked"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Rewards;

import React, { useState, useEffect } from "react";
import blogsData from "../../assets/blogs.json";
import { Modal, Button } from "@mui/material"; // Retained for Modal and Button components
import Navbar from "./Navbar";
import Footer from "../Footer";
import { motion } from "framer-motion";


// NewsAPI Setup
const NEWS_API_URL = "https://newsapi.org/v2/everything";
const API_KEY = "fec0817602714ce08bcf62b3230b16b5"; // Replace with your NewsAPI key

const Blog = () => {
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [news, setNews] = useState([]);
  const [loadingNews, setLoadingNews] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const newsPerPage = 4;
  const maxNewsToShow = 20;

  // Fetch Green Projects News Related to India
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(
          `${NEWS_API_URL}?q=green+projects&apiKey=${API_KEY}`
        );
        const data = await response.json();
        setNews(data.articles.slice(0, maxNewsToShow)); // Show only the first 20 news articles
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setLoadingNews(false);
      }
    };
    fetchNews();
  }, []);

  // Calculate the news to display on the current page
  const indexOfLastNews = currentPage * newsPerPage;
  const indexOfFirstNews = indexOfLastNews - newsPerPage;
  const currentNews = news.slice(indexOfFirstNews, indexOfLastNews);

  // Handle page change
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const blogTitleVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.2,
        ease: "easeInOut",
      },
    },
  };

  const blogPostVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (index) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: index * 0.2, // Stagger animation based on index
        duration: 0.6,
        ease: "easeInOut",
      },
    }),
  };

  const newsTitleVariants = {
  hidden: { opacity: 0, y: -50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.2,
      ease: "easeInOut",
    },
  },
};

return (
  <>
    <Navbar />
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-16 px-8">
      {/* Main Grid Layout with Left (Blogs) and Right (News) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Left Section (Blogs) */}
        <motion.div
          initial={{ opacity: 0, y: -50 }} // Animate from above
          animate={{ opacity: 1, y: 0 }} // Move to original position
          transition={{
            duration: 1, // Smooth duration for the heading
            ease: "easeInOut",
          }}
        >
          <h2 className="text-5xl font-extrabold text-green-600 mb-8 text-center">
            Blogs
          </h2>
          {/* Group posts into rows */}
          {blogsData.blogs.reduce((rows, blog, index) => {
            if (index % 3 === 0) rows.push([]);
            rows[rows.length - 1].push(blog);
            return rows;
          }, []).map((row, rowIndex) => (
            <motion.div
              key={rowIndex}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 py-3"
              initial={{ opacity: 0, y: 50 }} // Start hidden and below
              animate={{ opacity: 1, y: 0 }} // Animate into position
              transition={{
                duration: 0.8,
                delay: rowIndex * 0.3, // Delay each row for a staggered effect
                ease: "easeInOut",
              }}
            >
              {row.map((blog) => (
                <div
                  key={blog.id}
                  className="bg-white rounded-xl shadow-lg hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer"
                  onClick={() => setSelectedBlog(blog)}
                >
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-center text-green-600 mb-2">
                      {blog.title}
                    </h3>
                    <p className="text-center text-gray-600">{blog.category}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          ))}
        </motion.div>

        {/* Right Section (News) */}
        <motion.div
          initial={{ opacity: 0, y: -50 }} // Animate from above
          animate={{ opacity: 1, y: 0 }} // Move to original position
          transition={{
            duration: 1, // Smooth duration for the heading
            ease: "easeInOut",
          }}
        >
          <h2 className="text-5xl font-extrabold text-green-600 mb-8 text-center">
            News
          </h2>
          {loadingNews ? (
            // Nature-themed Loading Animation
            <div className="flex justify-center items-center mt-10">
              <motion.div
                className="h-16 w-16 rounded-full border-t-4 border-green-600 border-opacity-75 animate-spin"
                style={{
                  borderLeft: "4px solid transparent",
                  borderRight: "4px solid transparent",
                }}
              ></motion.div>
              <p className="ml-4 text-lg font-medium text-green-700 animate-pulse">
                Fetching news from the world...
              </p>
            </div>
          ) : (
            <motion.div
              className="space-y-6"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: 0.3, // Stagger the appearance of each news post
                  },
                },
              }}
            >
              {currentNews.length > 0 ? (
                currentNews.map((article, index) => (
                  <motion.div
                    key={index}
                    className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300"
                    variants={{
                      hidden: { opacity: 0, y: 50 }, // Slide in from the right
                      visible: { opacity: 1, y: 0 }, // Animate into position
                    }}
                  >
                    <h3 className="text-2xl font-semibold text-green-700 mb-3">
                      {article.title}
                    </h3>
                    <p className="text-gray-700 mb-4">{article.description}</p>
                    <p className="text-sm text-gray-500">
                      Source:{" "}
                      <a
                        href={article.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-600 hover:underline"
                      >
                        Read more
                      </a>
                    </p>
                  </motion.div>
                ))
              ) : (
                <p className="text-center text-gray-500">No news found.</p>
              )}
            </motion.div>
          )}

          {/* Pagination Controls */}
          <div className="flex justify-center mt-8 space-x-4">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-lg ${
                currentPage === 1
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-green-500 hover:bg-green-600 text-white"
              }`}
            >
              Previous
            </button>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage * newsPerPage >= maxNewsToShow}
              className={`px-4 py-2 rounded-lg ${
                currentPage * newsPerPage >= maxNewsToShow
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-green-500 hover:bg-green-600 text-white"
              }`}
            >
              Next
            </button>
          </div>
        </motion.div>
      </div>

      {/* Detailed Blog View (Modal) */}
      <Modal
        open={!!selectedBlog}
        onClose={() => setSelectedBlog(null)}
        className="flex items-center justify-center"
      >
        <div className="bg-white p-8 rounded-lg shadow-xl max-w-4xl w-full">
          {selectedBlog && (
            <>
              <span className="bg-green-400 text-white px-6 py-2 rounded-full inline-block mb-4">
                {selectedBlog.category}
              </span>
              <h3 className="text-3xl font-semibold text-green-700 mb-4">
                {selectedBlog.title}
              </h3>
              <p className="text-gray-500 mb-4">
                by {selectedBlog.author} - {selectedBlog.date}
              </p>
              <p className="text-gray-800 leading-relaxed mb-6">
                {selectedBlog.content}
              </p>
              <p className="text-sm text-gray-500">
                {selectedBlog.wordCount} words
              </p>
            </>
          )}
        </div>
      </Modal>
    </div>
    <Footer />
  </>
);


};

export default Blog;

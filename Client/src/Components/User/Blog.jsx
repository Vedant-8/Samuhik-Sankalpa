import React, { useState, useEffect } from "react";
import blogsData from "../../assets/blogs.json";
import { Modal, Button } from "@mui/material"; // Retained for Modal and Button components
import Navbar from "./Navbar";
import Footer from "../Footer";

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

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-16 px-8">
        {/* Main Grid Layout with Left (Blogs) and Right (News) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Left Section (Blogs) */}
          <div>
            <h2 className="text-5xl font-extrabold text-green-600 mb-8 text-center">
              Blogs
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
              {blogsData.blogs.map((blog) => (
                <div
                  key={blog.id}
                  className="bg-white rounded-xl shadow-lg hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer"
                  onClick={() => setSelectedBlog(blog)}
                >
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-center text-green-600 mb-4">
                      {blog.title}
                    </h3>
                    <p className="text-center text-gray-600">{blog.category}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Section (News) */}
          <div>
            <h2 className="text-5xl font-extrabold text-green-600 mb-8 text-center">
              News
            </h2>
            {loadingNews ? (
              <p className="text-center text-gray-500">Loading...</p>
            ) : (
              <div className="space-y-6">
                {currentNews.length > 0 ? (
                  currentNews.map((article, index) => (
                    <div
                      key={index}
                      className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300"
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
                    </div>
                  ))
                ) : (
                  <p className="text-center text-gray-500">No news found.</p>
                )}
              </div>
            )}

            {/* Pagination Controls */}
            <div className="flex justify-center mt-8 space-x-4">
              <Button
                variant="contained"
                color="primary"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage * newsPerPage >= maxNewsToShow}
              >
                Next
              </Button>
            </div>
          </div>
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

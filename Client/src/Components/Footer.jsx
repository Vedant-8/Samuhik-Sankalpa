import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-300 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-lg font-semibold text-green-600">Samuhik Sankalpa</h3>
            <p className="mt-4 text-gray-600">
              Empowering communities to invest in local green initiatives and
              drive sustainable change for a better future.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-green-600">Quick Links</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a
                  href="/projects"
                  className="text-gray-700 hover:text-green-600"
                >
                  Projects
                </a>
              </li>
              <li>
                <a
                  href="/volunteers"
                  className="text-gray-700 hover:text-green-600"
                >
                  Volunteers
                </a>
              </li>
              <li>
                <a
                  href="/analytics"
                  className="text-gray-700 hover:text-green-600"
                >
                  Analytics
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="text-gray-700 hover:text-green-600"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold text-green-600">Contact Us</h3>
            <ul className="mt-4 space-y-2 text-gray-600">
              <li>
                <span>Email:</span>{" "}
                <a
                  href="mailto:support@samuhiksankalpa.com"
                  className="hover:text-green-600"
                >
                  support@samuhiksankalpa.com
                </a>
              </li>
              <li>
                <span>Phone:</span>{" "}
                <a href="tel:+1234567890" className="hover:text-green-600">
                  +91 98732 14560
                </a>
              </li>
              <li>
                <span>Follow Us:</span>
                <div className="flex space-x-4 mt-2">
                  <a
                    href="#"
                    className="text-gray-500 hover:text-green-600"
                    aria-label="Facebook"
                  >
                    <svg
                      className="h-5 w-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M22 12C22 6.477 17.523 2 12 2S2 6.477 2 12c0 5.005 3.657 9.127 8.438 9.878v-6.99H7.898v-2.888h2.54V9.658c0-2.516 1.492-3.888 3.777-3.888 1.094 0 2.238.195 2.238.195v2.462h-1.26c-1.243 0-1.63.772-1.63 1.562v1.874h2.774l-.443 2.888h-2.331v6.99C18.343 21.127 22 17.005 22 12z"
                      />
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="text-gray-500 hover:text-green-600"
                    aria-label="Twitter"
                  >
                    <svg
                      className="h-5 w-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8.29 20.252c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.995A4.107 4.107 0 0015.847 4a4.107 4.107 0 00-4.107 4.107c0 .322.036.635.106.935A11.65 11.65 0 013 5.116a4.107 4.107 0 001.27 5.477 4.073 4.073 0 01-1.858-.514v.051a4.107 4.107 0 003.292 4.022 4.073 4.073 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407 11.616 11.616 0 008.29 20.252z" />
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="text-gray-500 hover:text-green-600"
                    aria-label="Instagram"
                  >
                    <svg
                      className="h-5 w-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M7.75 2h8.5A5.75 5.75 0 0122 7.75v8.5A5.75 5.75 0 0116.25 22h-8.5A5.75 5.75 0 012 16.25v-8.5A5.75 5.75 0 017.75 2zm0 1.5A4.25 4.25 0 003.5 7.75v8.5A4.25 4.25 0 007.75 20.5h8.5a4.25 4.25 0 004.25-4.25v-8.5a4.25 4.25 0 00-4.25-4.25h-8.5zM12 7a5 5 0 100 10 5 5 0 000-10zm0 1.5a3.5 3.5 0 110 7 3.5 3.5 0 010-7zm5.5-.5a1 1 0 110 2 1 1 0 010-2z" />
                    </svg>
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-200 pt-4 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} GreenInvest. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;

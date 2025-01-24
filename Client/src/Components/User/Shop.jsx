import React, { useState } from "react";
import productsData from "../../assets/shop.json";
import Navbar from "./Navbar";
import Footer from "../Footer";

import tickImage from  "../../assets/2.png"; // URL for the tick image

const Shop = () => {
  const [searchText, setSearchText] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [showTickImage, setShowTickImage] = useState(false); // State for the tick image notification

  const filteredProducts = productsData.products.filter((product) =>
    product.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const addToCart = (product) => {
    setCartItems((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((prevCart) =>
      prevCart.filter((item) => item.id !== productId)
    );
  };

  const increaseQuantity = (productId) => {
    setCartItems((prevCart) =>
      prevCart.map((item) =>
        item.id === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseQuantity = (productId) => {
    setCartItems((prevCart) =>
      prevCart.map((item) =>
        item.id === productId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const toggleCart = () => {
    setIsCartOpen((prevState) => !prevState);
  };

  const closeCart = () => {
    setIsCartOpen(false);
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleBuyNowClick = () => {
    setIsPaymentModalOpen(true);
  };

  const handlePayment = () => {
    // Simulate a successful payment
    setPaymentSuccess(true);
    setCartItems([]); // Clear the cart after successful payment
    setIsPaymentModalOpen(false);

    // Show success notification and tick image
    setShowTickImage(true);
    setShowNotification(true);

    // Hide notification after 3 seconds
    setTimeout(() => {
      setShowNotification(false);
      setShowTickImage(false); // Hide the tick image notification after 3 seconds
    }, 3000);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-green-100 to-white py-12 px-4">
        {/* Top Bar */}
        <div className="flex justify-between items-center mb-8 px-4">
          {/* Search Bar */}
          <div className="w-full max-w-lg">
            <input
              type="text"
              className="w-full py-2 px-4 border rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Search products..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>

          {/* Cart Button */}
          <div className="relative">
            <button
              onClick={toggleCart}
              className="flex items-center bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg shadow-lg transition duration-300 ease-in-out"
            >
              {/* Inline SVG for Shopping Cart Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6 mr-2"
              >
                <path d="M6 2L6 6H20L18 18H6L4 6H1" />
              </svg>
              <span className="text-lg">Cart</span>
              <span className="ml-2 font-bold text-xl">{cartItems.length}</span>
            </button>

            {/* Cart Modal */}
            {isCartOpen && (
              <div
                className="absolute top-12 right-0 bg-white shadow-lg rounded-lg w-96 max-h-[70vh] z-50 overflow-y-auto"
                style={{ boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)" }}
              >
                <div className="flex justify-between items-center border-b p-4">
                  <h3 className="text-lg font-semibold">Your Cart</h3>
                  <button
                    onClick={closeCart}
                    className="text-gray-600 hover:text-gray-800"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>

                {/* Product List Section */}
                <div className="p-4">
                  {cartItems.length === 0 ? (
                    <p className="text-center text-gray-600">No items in the cart.</p>
                  ) : (
                    cartItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex justify-between items-center mb-4"
                      >
                        <div>
                          <p className="font-semibold">{item.name}</p>
                          <p className="text-gray-500">₹{item.price.toFixed(2)}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button
                            className="text-gray-600 hover:text-gray-800"
                            onClick={() => decreaseQuantity(item.id)}
                          >
                            -
                          </button>
                          <span className="text-sm text-gray-600">x{item.quantity}</span>
                          <button
                            className="text-gray-600 hover:text-gray-800"
                            onClick={() => increaseQuantity(item.id)}
                          >
                            +
                          </button>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          Remove
                        </button>
                      </div>
                    ))
                  )}
                </div>

                {/* Total Price and Buy Button */}
                <div className="border-t p-4 flex justify-between items-center">
                  <div className="font-semibold text-lg">Total:</div>
                  <div className="text-green-600 text-lg">₹{totalPrice.toFixed(2)}</div>
                </div>
                <button
                  className="w-full py-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg mt-4"
                  onClick={handleBuyNowClick}
                >
                  Buy Now
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl p-6 flex flex-col justify-between"
            >
              <div>
                <h3 className="text-xl font-semibold text-green-600 text-center mb-2">
                  {product.name}
                </h3>
                <p className="text-gray-600 text-center mb-2">{product.category}</p>
                <p className="text-2xl font-bold text-green-600 text-center mb-4">
                  ₹{product.price.toFixed(2)}
                </p>
              </div>
              <button
                className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-lg transition duration-300 ease-in-out"
                onClick={() => addToCart(product)}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Payment Modal */}
      {isPaymentModalOpen && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-xl font-semibold mb-4">Payment</h3>
            <p className="mb-4">Total: ₹{totalPrice.toFixed(2)}</p>
            <button
              className="w-full py-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg"
              onClick={handlePayment}
            >
              Pay
            </button>
          </div>
        </div>
      )}

      {/* Stylish Success Notification */}
      {showTickImage && (
        <div
          className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-xl flex flex-col items-center justify-center"
        >
          <img src={tickImage} alt="Payment Successful" className="w-20 h-20 mb-4" />
          <p className="text-green-600 font-semibold text-lg">Payment Successful!</p>
        </div>
      )}

      {/* Success Notification */}
      {showNotification && (
        <div
          className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-green-600 text-white p-4 rounded-lg shadow-lg flex items-center space-x-2 animate-fadeIn"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4M5 12a7 7 0 0114 0 7 7 0 01-14 0z"
            />
          </svg>
          <span>Payment successful! Order will be delivered soon, more updates will be sent on your email.</span>
        </div>
      )}

      <Footer />
    </>
  );
};

export default Shop;

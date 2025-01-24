import React, { useState } from "react";

const AddProductModal = ({ products, onAdd, onClose }) => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    rating: "",
    stock: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const newErrors = {};
    Object.keys(newProduct).forEach((key) => {
      if (!newProduct[key]) {
        newErrors[key] = `${key} is required`;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      // Automatically assign the next ID
      const lastId = products.length > 0 ? products[products.length - 1].id : 0;
      const productWithId = { ...newProduct, id: lastId + 1 };
      
      onAdd(productWithId);
      onClose();
    }
  };

  const renderLabel = (key) => {
    return key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, " $1");
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
        <h2 className="text-xl font-bold mb-4">Add Product</h2>
        <form className="space-y-4">
          {Object.keys(newProduct).map((key) => (
            <div key={key}>
              <label className="block text-sm font-medium mb-1">{renderLabel(key)}</label>
              <input
                type="text"
                name={key}
                value={newProduct[key]}
                onChange={handleChange}
                className={`w-full p-2 border ${
                  errors[key] ? "border-red-500" : "border-gray-300"
                } rounded-lg`}
                placeholder={`Enter ${renderLabel(key)}`}
              />
              {errors[key] && <p className="text-red-500 text-xs mt-1">{errors[key]}</p>}
            </div>
          ))}
        </form>
        <div className="mt-4 flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddProductModal;

import React, { useState } from "react";
import ProductRow from "./ProductRow";
import EditProductModal from "./EditProductModal";

const ProductTable = ({ products, onEdit, onUpdate }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const categories = [
    "Kitchen & Dining",
    "Outdoor Gear",
    "Electronics",
    "Home Decor",
    "Fitness",
  ];

  const handleEdit = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  return (
    <div className="mt-6">
      <table className="min-w-full border border-gray-200 bg-white shadow-md rounded-lg">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-4 text-left">ID</th>
            <th className="p-4 text-left">Name</th>
            <th className="p-4 text-left">Category</th>
            <th className="p-4 text-left">Price</th>
            <th className="p-4 text-left">Stock</th>
            <th className="p-4 text-left">Rating</th>
            <th className="p-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <ProductRow key={product.id} product={product} onEdit={handleEdit} />
          ))}
        </tbody>
      </table>

      {selectedProduct && (
        <EditProductModal
          product={selectedProduct}
          categories={categories}
          onUpdate={onUpdate} // Make sure onUpdate is passed here
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default ProductTable;

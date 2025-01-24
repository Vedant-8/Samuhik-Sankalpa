import React, { useState } from "react";
import AdminShopHeader from "../../Components/admin/AdminShopHeader";
import ProductTable from "../../Components/admin/ProductTable";
import AddProductModal from "../../Components/admin/AddProductModal";
import EditProductModal from "../../Components/admin/EditProductModal"; // Import the Edit Modal
import productsData from "../../assets/shop.json";

import Navbar from "../../Components/admin/Navbar";
import Footer from "../../Components/Footer";

const AdminShopPage = () => {
  const [products, setProducts] = useState(productsData.products);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null); // Track the product being edited

  // Handle adding a new product
  const handleAddProduct = (product) => {
    setProducts([...products, { ...product, id: products.length + 1 }]);
  };

  // Handle updating an existing product
  const handleUpdateProduct = (updatedProduct) => {
    const updatedProducts = products.map((product) =>
      product.id === updatedProduct.id ? updatedProduct : product
    );
    setProducts(updatedProducts);
    setEditingProduct(null); // Close the edit modal after saving
  };

  const totalProducts = products.length;
  const totalStock = products.reduce((acc, product) => acc + product.stock, 0);

  return (
    <div>
      <Navbar />

      <div className="p-6">
        {/* Header */}
        <AdminShopHeader
          totalProducts={totalProducts}
          totalStock={totalStock}
        />

        {/* Add Product Button */}
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg"
        >
          Add Product
        </button>

        {/* Product Table */}
        <ProductTable
          products={products}
          onEdit={(product) => setEditingProduct(product)} // Open edit modal with selected product
          onUpdate={handleUpdateProduct} // Pass onUpdate to ProductTable
        />

        {/* Add Product Modal */}
        {isAddModalOpen && (
          <AddProductModal
            products={products}
            onAdd={handleAddProduct}
            onClose={() => setIsAddModalOpen(false)}
          />
        )}

        {/* Edit Product Modal */}
        {editingProduct && (
          <EditProductModal
            product={editingProduct}
            categories={[
              "Kitchen & Dining",
              "Outdoor Gear",
              "Electronics",
              "Home Decor",
              "Fitness",
            ]}
            onUpdate={handleUpdateProduct} // Ensure onUpdate is passed to EditProductModal
            onClose={() => setEditingProduct(null)}
          />
        )}
      </div>

      <Footer />
    </div>
  );
};

export default AdminShopPage;

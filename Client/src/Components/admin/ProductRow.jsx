import React from "react";

const ProductRow = ({ product, onEdit }) => {
  return (
    <tr className="hover:bg-gray-100">
      <td className="p-4">{product.id}</td>
      <td className="p-4">{product.name}</td>
      <td className="p-4">{product.category}</td>
      <td className="p-4">₹ {product.price.toFixed(2)}</td>
      <td className="p-4">{product.stock}</td>
      <td className="p-4">{product.rating}</td>
      <td className="p-4">
        <button
          onClick={() => onEdit(product)}
          className="px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600"
        >
          Edit
        </button>
      </td>
    </tr>
  );
};

export default ProductRow;

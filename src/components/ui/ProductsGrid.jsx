import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProductModal from "./ProductModal";
import ScoreCircle from "./ScoreCircle";
import { FiAlertCircle, FiCheckCircle, FiInfo } from "react-icons/fi";

const getStatus = (score) => {
  if (score >= 80) return { label: "Approved", color: "green" };
  if (score >= 60) return { label: "Pending", color: "yellow" };
  return { label: "Flagged", color: "red" };
};

const ProductsGrid = ({ products, isDark }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const getStatusClasses = (color) => {
    switch (color) {
      case "green":
        return "bg-green-100 text-green-800";
      case "yellow":
        return "bg-yellow-100 text-yellow-800";
      case "red":
        return "bg-red-100 text-red-800";
      default:
        return "";
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 font-poppins m-5">
      {products.map((product) => {
        const status = getStatus(product.score);
        return (
          <motion.div
            key={product.id}
            whileHover={{ y: -5 }}
            className={`rounded-2xl p-6 border transition-all shadow-sm flex flex-col justify-between ${
              isDark
                ? "bg-gray-800 border-gray-700 hover:shadow-gray-700"
                : "bg-white border-gray-200 hover:shadow-lg"
            }`}
          >
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">{product.productName}</h2>
                <ScoreCircle score={product.score} isDark={isDark} />
              </div>

              <span
                className={`px-2 py-1 rounded-full text-xs font-medium mb-3 inline-block ${getStatusClasses(
                  status.color
                )}`}
              >
                {status.label}
              </span>

              <p className="text-sm opacity-80 mb-3">{product.explanation}</p>

              <div
                className={`flex items-center gap-2 text-xs ${
                  product.flags.length > 0 ? "text-red-600" : "text-green-600"
                }`}
              >
                {product.flags.length > 0 ? <FiAlertCircle size={20} /> : <FiCheckCircle size={20} />}
                <span>{product.flags.length > 0 ? product.flags.join(", ") : "No issues flagged"}</span>
              </div>
            </div>

            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={() => setSelectedProduct(product)}
              className={`mt-4 self-end flex items-center gap-2 text-sm font-medium px-3 py-1.5 rounded-full ${
                isDark
                  ? "bg-[#B0DB9C]/20 text-[#B0DB9C] hover:bg-[#B0DB9C]/30"
                  : "bg-[#6b9080]/20 text-[#446455] hover:bg-[#6b9080]/30"
              }`}
            >
              <FiInfo />
              Details
            </motion.button>
          </motion.div>
        );
      })}

      <AnimatePresence>
        {selectedProduct && (
          <ProductModal
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
            isDark={isDark}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProductsGrid;

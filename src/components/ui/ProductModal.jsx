import { motion } from "framer-motion";
import ScoreCircle from "./ScoreCircle";
import { FiAlertCircle, FiCheckCircle, FiX } from "react-icons/fi";

const ProductModal = ({ product, onClose, isDark }) => (
  <motion.div
    className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-4"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
    <motion.div
      className={`relative max-w-lg w-full rounded-2xl p-6 shadow-xl ${
        isDark ? "bg-gray-800 text-white" : "bg-white text-gray-900"
      }`}
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      transition={{ type: "spring", stiffness: 120 }}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 opacity-70 hover:opacity-100"
      >
        <FiX size={20} />
      </button>

      <h2 className="text-2xl font-semibold mb-3">{product.productName}</h2>

      <div className="flex items-center gap-4 mb-4">
        <ScoreCircle score={product.score} isDark={isDark} />
        <p className="text-sm opacity-80">{product.explanation}</p>
      </div>

      {product.suggestions.length > 0 && (
        <div className="mb-3">
          <p className="font-medium mb-1">AI Suggestions:</p>
          <ul className="list-disc list-inside text-sm opacity-90 space-y-1">
            {product.suggestions.map((s, idx) => (
              <li key={idx}>{s}</li>
            ))}
          </ul>
        </div>
      )}

      <div
        className={`flex items-center gap-2 text-sm ${
          product.flags.length > 0 ? "text-red-500" : "text-green-500"
        }`}
      >
        {product.flags.length > 0 ? <FiAlertCircle /> : <FiCheckCircle />}
        <span>
          {product.flags.length > 0 ? product.flags.join(", ") : "No issues flagged"}
        </span>
      </div>
    </motion.div>
  </motion.div>
);

export default ProductModal;

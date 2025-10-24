import { motion, AnimatePresence } from "framer-motion";
import { FiCheckCircle } from "react-icons/fi";

const FeedbackModal = ({ open, onClose, theme }) => {
  if (!open) return null;

  const isDark = theme === "dark";

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.8 }}
          onClick={(e) => e.stopPropagation()}
          className={`p-6 rounded-xl shadow-lg w-96 text-center ${
            isDark ? "bg-gray-800 text-white" : "bg-white text-gray-900"
          }`}
        >
          <FiCheckCircle size={40} className="mx-auto text-green-500 mb-4" />
          <h2 className="text-xl font-semibold mb-2">AI Feedback</h2>
          <p className="mb-4 text-sm">
            Your product looks great! Ingredients and certifications are complete. Recommended improvements: Double-check certifications for authenticity.
          </p>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700"
          >
            Close
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default FeedbackModal;

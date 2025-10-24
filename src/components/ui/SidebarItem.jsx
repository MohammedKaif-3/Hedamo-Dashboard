import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const SidebarItem = ({ icon, label, path, isOpen, isDark, active }) => {
  const paddingLeft = isOpen ? 32 : 0;
  const justify = isOpen ? "flex-start" : "center";
  const gap = isOpen ? 16 : 0;
  const color = active ? (isDark ? "#B0DB9C" : "#1f2937") : undefined;

  return (
    <Link to={path}>
      <motion.div
        layout
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="flex items-center cursor-pointer rounded-full overflow-hidden py-3 relative"
        style={{ paddingLeft, justifyContent: justify, gap }}
      >
        {/* Active Indicator */}
        <motion.div
          layout
          animate={{ opacity: active ? 1 : 0, x: active ? 0 : -10 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="absolute left-0 top-1 bottom-1 rounded-r-md"
          style={{ width: 4, backgroundColor: isDark ? "#B0DB9C" : "#1f2937" }}
        />

        {/* Icon */}
        <div className="text-xl flex-shrink-0 z-10" style={{ color }}>
          {icon}
        </div>

        {/* Label */}
        {isOpen && (
          <motion.span
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="font-poppins font-medium whitespace-nowrap z-10"
            style={{ color }}
          >
            {label}
          </motion.span>
        )}
      </motion.div>
    </Link>
  );
};

export default SidebarItem;
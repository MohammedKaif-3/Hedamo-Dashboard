import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { FiHome, FiBarChart2, FiArrowLeft, FiSettings, FiBox, FiPlusCircle } from "react-icons/fi";
import SidebarItem from "./ui/SidebarItem";

const navItems = [
  { icon: <FiHome />, label: "Dashboard", path: "/" },
  { icon: <FiBox />, label: "Products", path: "/products" },
  { icon: <FiPlusCircle />, label: "Add Product", path: "/add-product" },
  { icon: <FiBarChart2 />, label: "Analytics", path: "/analytics" },
  { icon: <FiSettings />, label: "Settings", path: "/settings" },
];

const Sidebar = ({ isOpen, setIsOpen, theme }) => {
  const isDark = theme === "dark";
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) setIsOpen(false);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, [setIsOpen]);

  const bgClass = isDark ? "bg-gray-900 text-white shadow-lg shadow-black/40" : "bg-[#6b9080] text-white shadow-md";

  return (
    <motion.aside
      animate={{ width: isOpen ? 280 : 70 }}
      transition={{ type: "spring", stiffness: 200, damping: 25 }}
      className={`h-screen flex flex-col py-6 relative transition-colors duration-300 ${bgClass}`}
    >
      {/* Toggle Button */}
      <div className={`flex px-2 mb-3 ${isOpen ? "justify-end" : "justify-center"} transition-all duration-300`}>
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className={`flex items-center justify-center p-2 rounded-md transition-colors duration-300 ${
            isDark ? "bg-gray-800 hover:bg-gray-700 shadow-sm shadow-black/50" : "bg-[#517668] hover:bg-[#446455] shadow-sm"
          }`}
          layout
        >
          <motion.div animate={{ rotate: isOpen ? 0 : 180 }} transition={{ duration: 0.3 }}>
            <FiArrowLeft size={20} />
          </motion.div>
        </motion.button>
      </div>

      {/* Logo */}
      <motion.div layout className="flex items-center justify-center mb-10 mt-4">
        <motion.span
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="font-lato text-2xl"
        >
          {isOpen ? "Hedamo" : "H"}
        </motion.span>
      </motion.div>

      <hr className="w-full border-gray-600" />

      {/* Navigation */}
      <nav className="flex flex-col gap-3 mt-4">
        {navItems.map((item) => (
          <SidebarItem
            key={item.path}
            {...item}
            isOpen={isOpen}
            isDark={isDark}
            active={location.pathname === item.path}
          />
        ))}
      </nav>
    </motion.aside>
  );
};


export default Sidebar;

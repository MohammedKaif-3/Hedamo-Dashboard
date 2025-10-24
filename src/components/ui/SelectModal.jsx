import { useState, useRef, useEffect } from "react";
import { FiChevronDown } from "react-icons/fi";

const SelectModal = ({ theme, value, onChange }) => {
  const isDark = theme === "dark";
  const [open, setOpen] = useState(false);
  const ref = useRef(null); // dropdown ref
  const options = ["All", "Approved", "Pending", "Flagged"];

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative w-44 font-poppins">
      {/* Select Button */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`w-full flex justify-between items-center px-4 py-2 rounded-xl border ${
          isDark
            ? "bg-gray-800 text-white border-gray-700 focus:border-green-400"
            : "bg-white text-gray-800 border-gray-300 focus:border-green-600"
        } shadow-sm focus:outline-none focus:ring-1 focus:ring-green-400 transition-all duration-200`}
      >
        <span>{value}</span>
        <FiChevronDown className={`ml-2 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {/* Options List */}
      {open && (
        <ul
          className={`absolute mt-1 w-full rounded-xl shadow-lg z-10 overflow-hidden ${
            isDark ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-300"
          }`}
        >
          {options.map((option) => (
            <li
              key={option}
              onClick={() => {
                onChange(option);
                setOpen(false);
              }}
              className={`px-4 py-2 cursor-pointer transition-colors duration-200 ${
                isDark ? "hover:bg-gray-700" : "hover:bg-gray-100"
              } ${option === value ? "font-semibold" : "font-normal"}`}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SelectModal;

import { FiBell, FiUser, FiSearch, FiSun, FiMoon } from "react-icons/fi";

const TopBar = ({ theme, toggleTheme }) => {
    const isDark = theme === "dark";

    return (
        <div className="w-full">
            <header
                className={`w-full border-red h-20 flex items-center justify-between px-6 shadow-md transition-colors duration-300 ${isDark ? "bg-gray-800 text-white" : "bg-white text-gray-800"
                    }`}
            >
                {/* Search Bar */}
                <div className="w-full">
                    <div className="relative">
                        <FiSearch
                            className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors duration-300 ${isDark ? "text-gray-300" : "text-gray-400"
                                }`}
                        />
                        <input
                            type="text"
                            placeholder="Search Products, Categories..."
                            className={`w-3/5 pl-10 pr-4 py-2 rounded-md border focus:outline-none transition-colors duration-300 ${isDark
                                    ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                                    : "bg-white border-gray-300 text-gray-800 placeholder-gray-500"
                                }`}
                        />
                    </div>
                </div>

                {/* Right Icons */}
                <div className="flex items-center gap-4 ml-6">
                    <button
                        className={`p-2 rounded-full transition-colors duration-300 ${isDark ? "hover:bg-gray-700" : "hover:bg-gray-200"
                            }`}
                    >
                        <FiBell size={20} />
                    </button>
                    
                    <button
                        onClick={toggleTheme}
                        className={`p-2 rounded-full transition-colors duration-300 ${isDark ? "hover:bg-gray-700" : "hover:bg-gray-200"
                            }`}
                    >
                        {isDark ? <FiSun size={20} /> : <FiMoon size={20} />}
                    </button>

                    <button
                        className={`p-2 rounded-full transition-colors duration-300 ${isDark ? "hover:bg-gray-700" : "hover:bg-gray-200"
                            }`}
                    >
                        <FiUser size={20} />
                    </button>
                </div>
            </header>
        </div>
    );
};

export default TopBar;

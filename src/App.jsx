import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import TopBar from "./components/Topbar";

// Pages
import Dashboard from "./pages/Dashboard";
import AddProduct from './pages/AddProduct';
import Products from "./pages/Products";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [theme, setTheme] = useState("light"); // 'light' or 'dark'

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  return (
    <Router>
      <div
        className={`flex min-h-screen transition-colors duration-300 ${
          theme === "dark" ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-900"
        }`}
      >
        {/* Sidebar */}
        <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} theme={theme} />

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Top Bar */}
          <TopBar theme={theme} toggleTheme={toggleTheme} />

          {/* Routed Pages */}
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Dashboard theme={theme} />} />
              <Route path="/add-product" element={<AddProduct theme={theme} />} />
              <Route path="/products" element={<Products theme={theme} />} />
              <Route path="/analytics" element={<Analytics theme={theme} />} />
              <Route path="/settings" element={<Settings theme={theme} />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
};

export default App;

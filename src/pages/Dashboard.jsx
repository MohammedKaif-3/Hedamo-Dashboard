import { useMemo } from "react";
import { FiTrendingUp, FiPackage, FiFlag, FiClock } from "react-icons/fi";
import { motion } from "framer-motion";
import ScoreCircle from "../components/ui/ScoreCircle";
import productsData from "../data/products.json";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

// Helper to get status
const getStatus = (score) => {
  if (score >= 80) return "Approved";
  if (score >= 60) return "Pending";
  return "Flagged";
};

const Dashboard = ({ theme }) => {
  const isDark = theme === "dark";

  // --- Derived Stats ---
  const totalProducts = productsData.length;

  const statusCounts = useMemo(() => {
    const counts = { Approved: 0, Pending: 0, Flagged: 0 };
    productsData.forEach((p) => {
      const s = getStatus(p.score);
      counts[s] = (counts[s] || 0) + 1;
    });
    return counts;
  }, []);

  const avgScore = useMemo(() => {
    const total = productsData.reduce((sum, p) => sum + p.score, 0);
    return Math.round(total / totalProducts);
  }, [productsData]);

  const recentProducts = useMemo(() => {
    return [...productsData]
      .sort((a, b) => b.score - a.score)
      .slice(0, 5);
  }, [productsData]);

  // Generate simple mock monthly trend data based on products
  const chartData = useMemo(() => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"];
    return months.map((m, i) => ({
      month: m,
      score: Math.round(
        avgScore + (Math.sin(i) * 10 + Math.random() * 5 - 2) // mock variance
      ),
    }));
  }, [avgScore]);

  // --- Cards ---
  const summaryCards = [
    {
      title: "Total Products",
      value: totalProducts,
      icon: <FiPackage size={22} />,
      color: "#6b9080",
    },
    {
      title: "Approved",
      value: statusCounts.Approved,
      icon: <FiTrendingUp size={22} />,
      color: "#86efac",
    },
    {
      title: "Pending",
      value: statusCounts.Pending,
      icon: <FiClock size={22} />,
      color: "#facc15",
    },
    {
      title: "Flagged",
      value: statusCounts.Flagged,
      icon: <FiFlag size={22} />,
      color: "#f87171",
    },
  ];

  return (
    <div
      className={`p-6 font-poppins transition-colors duration-300 ${
        isDark ? "bg-gray-950 text-white" : "bg-gray-100 text-gray-900"
      }`}
       style={{
        maxHeight: "calc(100vh - 70px)", 
        overflowY: "auto",
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-semibold">Dashboard Overview</h1>
      </div>

      {/* Summary Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {summaryCards.map((card, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.03 }}
            className={`flex items-center gap-4 p-5 rounded-2xl shadow-sm ${
              isDark ? "bg-gray-800" : "bg-white"
            }`}
          >
            <div
              className="p-3 rounded-full"
              style={{ backgroundColor: `${card.color}20`, color: card.color }}
            >
              {card.icon}
            </div>
            <div>
              <p className="text-sm opacity-70">{card.title}</p>
              <p className="text-2xl font-semibold">{card.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Transparency Trend Chart */}
      <div
        className={`p-6 rounded-2xl shadow-sm mb-8 ${
          isDark ? "bg-gray-800" : "bg-white"
        }`}
      >
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <FiTrendingUp /> Transparency Score Trend
        </h2>
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={chartData}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={isDark ? "#374151" : "#e5e7eb"}
            />
            <XAxis dataKey="month" stroke={isDark ? "#9ca3af" : "#4b5563"} />
            <YAxis stroke={isDark ? "#9ca3af" : "#4b5563"} />
            <Tooltip
              contentStyle={{
                backgroundColor: isDark ? "#1f2937" : "#ffffff",
                border: "none",
                borderRadius: "10px",
              }}
            />
            <Line
              type="monotone"
              dataKey="score"
              stroke="#6b9080"
              strokeWidth={3}
              dot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Recent Products + Average Score */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Products */}
        <div
          className={`p-6 rounded-2xl shadow-sm ${
            isDark ? "bg-gray-800" : "bg-white"
          }`}
        >
          <h2 className="text-lg font-semibold mb-4">Recent Products</h2>
          <div className="flex flex-col gap-4">
            {recentProducts.map((p, i) => {
              const status = getStatus(p.score);
              const color =
                status === "Approved"
                  ? "green"
                  : status === "Pending"
                  ? "orange"
                  : "red";
              return (
                <div
                  key={i}
                  className="flex justify-between items-center border-b border-gray-700/20 pb-2"
                >
                  <div>
                    <p className="font-medium">{p.productName}</p>
                    <p
                      className="text-sm"
                      style={{ color, opacity: 0.8 }}
                    >
                      {status}
                    </p>
                  </div>
                  <span className="text-xs opacity-60">
                    {p.category || "General"}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Average Transparency Score */}
        <div
          className={`p-6 flex flex-col items-center justify-center rounded-2xl shadow-sm ${
            isDark ? "bg-gray-800" : "bg-white"
          }`}
        >
          <h2 className="text-lg font-semibold mb-4">
            Average Transparency Score
          </h2>
          <ScoreCircle score={avgScore} isDark={isDark} />
          <p className="mt-3 text-sm opacity-70 text-center max-w-[250px]">
            {avgScore >= 80
              ? "Excellent! Your transparency standards are top-tier."
              : avgScore >= 60
              ? "Good progress! Keep improving your product clarity."
              : "Consider reviewing flagged products to enhance transparency."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

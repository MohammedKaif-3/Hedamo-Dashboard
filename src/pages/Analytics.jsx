import { useMemo } from "react";
import {
  PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from "recharts";
import { FiActivity, FiAward, FiFlag, FiTrendingUp } from "react-icons/fi";
import { motion } from "framer-motion";
import ScoreCircle from "../components/ui/ScoreCircle";
import productsData from "../data/products.json";

const COLORS = ["#6b9080", "#facc15", "#f87171"];

const getStatus = (score) => {
  if (score >= 80) return "Approved";
  if (score >= 60) return "Pending";
  return "Flagged";
};

const Analytics = ({ theme }) => {
  const isDark = theme === "dark";
  const bgClass = isDark ? "bg-gray-950 text-white" : "bg-gray-100 text-gray-900";
  const cardClass = isDark ? "bg-gray-800" : "bg-white";
  const borderColor = isDark ? "#374151" : "#e5e7eb";
  const textColor = isDark ? "#9ca3af" : "#4b5563";
  const tooltipStyle = { backgroundColor: isDark ? "#1f2937" : "#ffffff", borderRadius: "10px", border: "none" };

  // Derived Data
  const totalProducts = productsData.length;

  const avgScore = useMemo(() => {
    const total = productsData.reduce((sum, p) => sum + p.score, 0);
    return Math.round(total / totalProducts);
  }, []);

  const scoreBuckets = useMemo(() => {
    const buckets = [{ name: "0-59", count: 0 }, { name: "60-79", count: 0 }, { name: "80-100", count: 0 }];
    productsData.forEach((p) => {
      if (p.score < 60) buckets[0].count++;
      else if (p.score < 80) buckets[1].count++;
      else buckets[2].count++;
    });
    return buckets;
  }, []);

  const statusData = useMemo(() => {
    const counts = { Approved: 0, Pending: 0, Flagged: 0 };
    productsData.forEach((p) => counts[getStatus(p.score)]++);
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, []);

  const topProducts = useMemo(() => [...productsData].sort((a, b) => b.score - a.score).slice(0, 5), []);
  const flagStats = useMemo(() => {
    const map = {};
    productsData.forEach((p) => p.flags.forEach((f) => (map[f] = (map[f] || 0) + 1)));
    return Object.entries(map).map(([flag, count]) => ({ flag, count })).sort((a, b) => b.count - a.count).slice(0, 5);
  }, []);

  return (
    <div className={`p-6 font-poppins transition-colors duration-300 ${bgClass}`} style={{ maxHeight: "calc(100vh - 70px)", overflowY: "auto" }}>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-semibold">Analytics Insights</h1>
      </div>

      {/* Overview Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {[
          { icon: <FiActivity />, title: "Total Products", value: totalProducts, color: "#6b9080" },
          { icon: <FiAward />, title: "Average Score", value: avgScore, color: "#86efac" },
          { icon: <FiFlag />, title: "Flagged Items", value: productsData.filter((p) => p.score < 60).length, color: "#f87171" },
          { icon: <FiTrendingUp />, title: "Top Performer", value: topProducts[0]?.productName || "—", color: "#facc15" },
        ].map((card, i) => (
          <motion.div key={i} whileHover={{ scale: 1.03 }} className={`flex items-center gap-4 p-5 rounded-2xl shadow-sm ${cardClass}`}>
            <div className="p-3 rounded-full" style={{ backgroundColor: `${card.color}20`, color: card.color }}>{card.icon}</div>
            <div>
              <p className="text-sm opacity-70">{card.title}</p>
              <p className="text-xl font-semibold">{card.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-2 gap-8 mb-10">
        {/* Score Distribution */}
        <div className={`p-6 rounded-2xl shadow-sm ${cardClass}`}>
          <h2 className="text-lg font-semibold mb-4">Score Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={scoreBuckets}>
              <CartesianGrid strokeDasharray="3 3" stroke={borderColor} />
              <XAxis dataKey="name" stroke={textColor} />
              <YAxis stroke={textColor} />
              <Tooltip contentStyle={tooltipStyle} />
              <Bar dataKey="count" fill="#6b9080" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Status Breakdown */}
        <div className={`p-6 rounded-2xl shadow-sm ${cardClass}`}>
          <h2 className="text-lg font-semibold mb-4">Status Breakdown</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={statusData} cx="50%" cy="50%" labelLine={false} outerRadius={100} dataKey="value"
                   label={({ name, value }) => `${name}: ${value}`}>
                {statusData.map((entry, index) => <Cell key={index} fill={COLORS[index % COLORS.length]} />)}
              </Pie>
              <Tooltip contentStyle={tooltipStyle} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Insights Row */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Top Products */}
        <div className={`p-6 rounded-2xl shadow-sm ${cardClass}`}>
          <h2 className="text-lg font-semibold mb-4">Top 5 Products</h2>
          <div className="flex flex-col gap-4">
            {topProducts.map((p, i) => (
              <div key={i} className="flex justify-between items-center border-b border-gray-700/20 pb-2">
                <div>
                  <p className="font-medium">{p.productName}</p>
                  <p className="text-sm opacity-70">{getStatus(p.score)} — {p.score}%</p>
                </div>
                <ScoreCircle score={p.score} isDark={isDark} size={50} />
              </div>
            ))}
          </div>
        </div>

        {/* Common Flags */}
        <div className={`p-6 rounded-2xl shadow-sm ${cardClass}`}>
          <h2 className="text-lg font-semibold mb-4">Common Flags (AI Insights)</h2>
          {flagStats.length ? (
            <ul className="space-y-3">
              {flagStats.map((f, i) => (
                <li key={i} className={`flex justify-between items-center border-b pb-2 ${isDark ? "border-gray-700" : "border-gray-200"}`}>
                  <span className="flex items-center gap-2 text-sm"><FiFlag /> {f.flag}</span>
                  <span className="text-xs opacity-70">{f.count} occurrences</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm opacity-60">No flags found — great job!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Analytics;

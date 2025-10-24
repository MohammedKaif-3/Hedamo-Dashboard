import { motion } from "framer-motion";

const ScoreCircle = ({ score, isDark }) => {
  const radius = 24;
  const strokeWidth = 6;
  const size = (radius + strokeWidth) * 2; // Add padding for stroke

  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  const color =
    score >= 80
      ? isDark
        ? "#86efac"
        : "#15803d"
      : score >= 60
      ? isDark
        ? "#facc15"
        : "#ca8a04"
      : isDark
      ? "#f87171"
      : "#dc2626";

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90 font-poppins">
      {/* Background Circle */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke={isDark ? "#374151" : "#e5e7eb"}
        strokeWidth={strokeWidth}
        fill="none"
      />
      {/* Animated Progress */}
      <motion.circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke={color}
        strokeWidth={strokeWidth}
        fill="none"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        initial={{ strokeDashoffset: circumference }}
        animate={{ strokeDashoffset: offset }}
        transition={{ duration: 1, ease: "easeOut" }}
      />
      {/* Score Text */}
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize="14"
        fill={color}
        className="font-bold"
        transform="rotate(90 30 30)"
      >
        {score}
      </text>
    </svg>
  );
};

export default ScoreCircle;

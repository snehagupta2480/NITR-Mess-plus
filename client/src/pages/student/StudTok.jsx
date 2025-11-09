// ======================================
// StudentOk.jsx
// Friendly and dynamic meal token page
// ======================================

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../../components/Navbar";
import api from "../../utils/api";

// --------------------------------------
//  Constants
// --------------------------------------
const TOKEN_TYPES = [
  { key: "breakfast", label: "Breakfast", emoji: "🍳" },
  { key: "lunch", label: "Lunch", emoji: "🍛" },
  { key: "snacks", label: "Snacks", emoji: "☕" },
  { key: "dinner", label: "Dinner", emoji: "🍽️" },
];

// --------------------------------------
// Small Loading Card
// --------------------------------------
const SkeletonCard = () => (
  <div className="animate-pulse bg-gray-200 rounded-xl h-40 shadow-md"></div>
);

// --------------------------------------
// Token Card
// --------------------------------------
const TokenCard = ({ label, emoji, count }) => (
  <motion.div
    className="rounded-xl p-6 shadow-md flex flex-col items-center hover:shadow-lg transition-all"
    style={{
      backgroundColor: "#fff",
      border: "1px solid #E8CFC5",
    }}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.98 }}
  >
    <div className="flex items-center justify-between w-full mb-3">
      <h2 className="text-2xl font-semibold text-gray-800">{label}</h2>
      <span className="text-3xl">{emoji}</span>
    </div>

    <p className="text-5xl font-extrabold" style={{ color: "#B95C40" }}>
      {count ?? 0}
    </p>
    <p className="text-gray-500 mt-2">tokens left for today</p>
  </motion.div>
);

// --------------------------------------
// Main Component
// --------------------------------------
const StudentOk = () => {
  const [tokens, setTokens] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // --------------------------------------
  //  Fetch tokens from backend
  // --------------------------------------
  useEffect(() => {
    const fetchTokens = async () => {
      try {
        const { data } = await api.get("/student/my-tokens");
        setTokens(data.tokens);
      } catch (err) {
        console.error("Error fetching tokens:", err);
        setError("Couldn’t load your tokens. Try refreshing in a bit?");
      } finally {
        setLoading(false);
      }
    };
    fetchTokens();
  }, []);

  // --------------------------------------
  // Loading Screen
  // --------------------------------------
  if (loading) {
    return (
      <div
        className="min-h-screen flex flex-col"
        style={{ backgroundColor: "#F8F5F3" }}
      >
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center gap-4">
          <p
            className="text-lg font-semibold animate-pulse"
            style={{ color: "#B95C40" }}
          >
            🍽️ Fetching your meal tokens...
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-3/4 max-w-2xl">
            {TOKEN_TYPES.map((_, idx) => (
              <SkeletonCard key={idx} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // --------------------------------------
  //Error State
  // --------------------------------------
  if (error) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center text-center px-4"
        style={{ backgroundColor: "#F8F5F3" }}
      >
        <Navbar />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white rounded-xl shadow-xl p-8 max-w-md"
        >
          <p className="text-red-500 text-lg font-semibold mb-4">{error}</p>
          <Link
            to="/student/dashboard"
            className="inline-block px-6 py-2 font-medium rounded-lg shadow-md transition"
            style={{ backgroundColor: "#B95C40", color: "#fff" }}
          >
            ← Back to Dashboard
          </Link>
        </motion.div>
      </div>
    );
  }

  // --------------------------------------
  //  Main UI
  // --------------------------------------
  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "#F8F5F3", color: "#333" }}
    >
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <motion.div
          className="text-white rounded-2xl shadow-2xl p-8"
          style={{
            background: "linear-gradient(90deg, #B95C40, #A24A33)",
          }}
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header Section */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <h1 className="text-3xl font-bold">
              Hey there 👋, here’s your meal count
            </h1>

            <Link
              to="/student/dashboard"
              className="font-semibold bg-white rounded px-4 py-2 shadow hover:shadow-md transition"
              style={{ color: "#B95C40" }}
            >
              ← Back to Dashboard
            </Link>
          </div>

          {/* Token Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {TOKEN_TYPES.map((item) => (
              <TokenCard
                key={item.key}
                label={item.label}
                emoji={item.emoji}
                count={tokens?.[item.key]}
              />
            ))}
          </div>

          {/* CTA */}
          <motion.div
            className="mt-8 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Link
              to="/book-meal"
              className="inline-block px-8 py-3 rounded-lg font-semibold transition-all duration-300"
              style={{
                color: "#B95C40",
                border: "2px solid #B95C40",
                backgroundColor: "#fff",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = "#B95C40";
                e.currentTarget.style.color = "#fff";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = "#fff";
                e.currentTarget.style.color = "#B95C40";
              }}
            >
              🍴 Book Meals for Tomorrow
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default StudentOk;

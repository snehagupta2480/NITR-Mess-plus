import { useContext } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { AuthContext } from "../../context/AuthContext";
import Navbar from "../../components/Navbar";
import { ClipboardList, Ticket, Utensils } from "lucide-react";

const MessHub = () => {
  const { user } = useContext(AuthContext);

  const PRIMARY_COLOR = "#B95C40";

  const TOKEN_COLORS = {
    Breakfast: "linear-gradient(135deg, #FFA17F, #00223E)",
    Lunch: "linear-gradient(135deg, #F7971E, #FFD200)",
    Snacks: "linear-gradient(135deg, #56CCF2, #2F80ED)",
    Dinner: "linear-gradient(135deg, #EB3349, #F45C43)",
  };

  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

  const name = user?.name?.split(" ")[0] || "Guest";

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <motion.div
      className="min-h-screen font-sans text-gray-800"
      style={{
        background: "linear-gradient(to bottom right, #FAF7F5, #F2E4DF, #F9F9F9)",
      }}
      initial="initial"
      animate="animate"
      variants={pageVariants}
    >
      <Navbar />

      <div className="container mx-auto px-6 py-12">
        {/* Hero Greeting Section */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl font-extrabold text-gray-800 mb-2">
            {greeting}, <span style={{ color: PRIMARY_COLOR }}>{name} 👋</span>
          </h1>
          <p className="text-lg text-gray-600 font-medium">
            Welcome to your personalized <span className="font-semibold">MessHub</span> — where convenience meets flavor 🍽️
          </p>
        </motion.div>

        {/* Profile Card */}
        <motion.div
          className="text-white rounded-2xl shadow-2xl p-8 mb-14 flex items-center justify-between gap-8 border backdrop-blur-md flex-wrap"
          style={{
            background: "linear-gradient(90deg, #B95C40, #A44E36)",
            borderColor: "#E8CFC5",
          }}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex items-center gap-6">
            {user.photoURL ? (
              <motion.img
                src={user.photoURL}
                alt={user.name}
                className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
                whileHover={{ rotate: 3, scale: 1.08 }}
                transition={{ type: "spring", stiffness: 250 }}
              />
            ) : (
              <div
                className="w-24 h-24 rounded-full flex items-center justify-center text-3xl font-bold shadow-lg"
                style={{
                  background: "linear-gradient(90deg, #B95C40, #A44E36)",
                }}
              >
                {user.name.charAt(0).toUpperCase()}
              </div>
            )}

            <div>
              <h1 className="text-3xl font-extrabold mb-1 text-white tracking-tight">
                {user.name}
              </h1>
              <p className="font-medium text-gray-100">Roll No: {user.rollNo}</p>
              <p className="font-medium text-gray-100">Mess: GDB Hall</p>
            </div>
          </div>

          <motion.div
            className="hidden md:block text-right pr-6"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <p className="text-lg font-semibold text-gray-100">
              “Eat Well, Study Hard, and Stay Awesome!”
            </p>
            <p className="text-sm italic text-gray-200 mt-1">
              — NITR Mess Team ❤️
            </p>
          </motion.div>
        </motion.div>

        {/* Action Cards Section */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-14"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.15 },
            },
          }}
        >
          {[
            {
              to: "/view-menu",
              icon: ClipboardList,
              title: "View Mess Menu",
              desc: "Explore what’s cooking today and tomorrow!",
            },
            {
              to: "/view-tokens",
              icon: Ticket,
              title: "Check Current Tokens",
              desc: "Track your active and remaining meal passes.",
            },
            {
              to: "/book-meal",
              icon: Utensils,
              title: "Book Meal Coupons",
              desc: "Reserve your spot for the next delicious meal.",
            },
          ].map(({ to, icon: Icon, title, desc }) => (
            <Link key={title} to={to}>
              <motion.div
                className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition transform hover:-translate-y-2 backdrop-blur-sm"
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.97 }}
              >
                <div className="text-center">
                  <Icon
                    className="mx-auto h-12 w-12 mb-4"
                    style={{ color: PRIMARY_COLOR }}
                  />
                  <h2 className="text-2xl font-bold mb-2 text-gray-800">
                    {title}
                  </h2>
                  <p className="text-gray-500 text-sm">{desc}</p>
                </div>
              </motion.div>
            </Link>
          ))}
        </motion.div>

        {/* Token Overview */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          {[
            { label: "Breakfast", count: user.tokens.breakfast },
            { label: "Lunch", count: user.tokens.lunch },
            { label: "Snacks", count: user.tokens.snacks },
            { label: "Dinner", count: user.tokens.dinner },
          ].map((item) => (
            <motion.div
              key={item.label}
              className="p-6 rounded-2xl text-center shadow-md transition relative overflow-hidden"
              style={{
                background: TOKEN_COLORS[item.label],
                color: "#fff",
              }}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
              }}
            >
              <div className="absolute inset-0 bg-white opacity-10 blur-2xl rounded-full"></div>
              <p className="font-semibold mb-2 text-lg tracking-wide">
                {item.label}
              </p>
              <p className="text-4xl font-extrabold drop-shadow-md">
                {item.count}
              </p>
              <p className="text-sm text-white/90 mt-1">Tokens left</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Motivation / Quote Section */}
        <motion.div
          className="text-center bg-white rounded-3xl shadow-xl py-8 px-6 max-w-2xl mx-auto"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.4 }}
        >
          <p className="text-xl font-medium text-gray-700 mb-2">
            “Health is the real wealth — start with a good meal 🍱”
          </p>
          <p className="text-sm text-gray-500 font-medium">
            Stay consistent. Stay nourished. Stay strong.
          </p>
        </motion.div>

        {/* Footer */}
        <div className="text-center mt-16 text-sm text-gray-500 font-medium">
          © {new Date().getFullYear()} National Institute of Technology, Rourkela. <br />
          Crafted with ❤️ for students by students.
        </div>
      </div>
    </motion.div>
  );
};

export default MessHub;

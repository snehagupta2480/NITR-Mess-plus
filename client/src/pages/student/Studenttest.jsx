import { useContext } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { AuthContext } from "../../context/AuthContext";
import Navbar from "../../components/Navbar";
import { ClipboardList, Ticket, Utensils } from "lucide-react";

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  const PRIMARY_COLOR = "#B95C40";

  const TOKEN_COLORS = {
    Breakfast: "linear-gradient(135deg, #B95C40, #A44E36)",
    Lunch: "linear-gradient(135deg, #B95C40, #93432D)",
    Snacks: "linear-gradient(135deg, #B95C40, #A44E36)",
    Dinner: "linear-gradient(135deg, #B95C40, #93432D)",
  };

  // Dynamic greeting
  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

  return (
    <div
      className="min-h-screen font-sans text-gray-800"
      style={{ backgroundColor: "#F9F9F9" }}
    >
      <Navbar />

      <div className="container mx-auto px-6 py-10">
        {/* Profile Card */}
        <motion.div
          className="text-white rounded-2xl shadow-2xl p-8 mb-10 flex items-center gap-6 border backdrop-blur-md bg-opacity-90"
          style={{
            background: "linear-gradient(90deg, #B95C40, #A44E36)",
            borderColor: "#E8CFC5",
          }}
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.3 }}
        >
          {user.photoURL ? (
            <motion.img
              src={user.photoURL}
              alt={user.name}
              className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
              whileHover={{ rotate: 2, scale: 1.05 }}
              transition={{ type: "spring", stiffness: 200 }}
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
              {greeting}, {user.name.split(" ")[0]} 👋
            </h1>
            <p className="font-medium text-gray-100">
              Roll No: {user.rollNo}
            </p>
            <p className="font-medium text-gray-100">Mess: GDB Hall</p>
          </div>
        </motion.div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {[
            {
              to: "/view-menu",
              icon: ClipboardList,
              title: "View Mess Menu",
              desc: "Check today’s delicious menu",
            },
            {
              to: "/view-tokens",
              icon: Ticket,
              title: "Check Current Tokens",
              desc: "View your current meal tokens",
            },
            {
              to: "/book-meal",
              icon: Utensils,
              title: "Book Meal Coupons",
              desc: "Reserve your meals for tomorrow",
            },
          ].map(({ to, icon: Icon, title, desc }) => (
            <Link key={title} to={to}>
              <motion.div
                className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition transform hover:-translate-y-1 backdrop-blur-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="text-center">
                  <Icon
                    className="mx-auto h-12 w-12 mb-4"
                    style={{ color: PRIMARY_COLOR }}
                  />
                  <h2 className="text-xl font-bold mb-1 text-gray-800 tracking-tight">
                    {title}
                  </h2>
                  <p className="text-gray-500 text-sm">{desc}</p>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>

        {/* Token Overview */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {[
            { label: "Breakfast", count: user.tokens.breakfast },
            { label: "Lunch", count: user.tokens.lunch },
            { label: "Snacks", count: user.tokens.snacks },
            { label: "Dinner", count: user.tokens.dinner },
          ].map((item) => (
            <motion.div
              key={item.label}
              className="p-5 rounded-xl text-center shadow-md hover:scale-105 transition backdrop-blur-sm"
              style={{
                background: TOKEN_COLORS[item.label],
                color: "#fff",
              }}
              whileHover={{
                y: -4,
                boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
              }}
            >
              <p className="font-medium mb-1">{item.label}</p>
              <p className="text-3xl font-bold">{item.count}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Footer */}
        <div className="text-center mt-10 text-sm text-gray-500 font-medium">
          © {new Date().getFullYear()} National Institute of Technology, Rourkela
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

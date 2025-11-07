import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import Navbar from "../../components/Navbar";
import { ClipboardList, Ticket, Utensils } from "lucide-react";

const Dashboard = () => {
  const { user, fetchUserData } = useContext(AuthContext); 
  // 👆 assuming AuthContext provides a method to re-fetch user data
  const [refresh, setRefresh] = useState(false);

  // Updated gradients & accents based on #B95C40
  const TOKEN_COLORS = {
    Breakfast: "from-[#D26F51] to-[#B95C40]",
    Lunch: "from-[#D26F51] to-[#B95C40]",
    Snacks: "from-[#D26F51] to-[#B95C40]",
    Dinner: "from-[#D26F51] to-[#B95C40]",
  };

  // ✅ useEffect to auto-refresh dashboard data after booking
  useEffect(() => {
    if (refresh) {
      fetchUserData(); // refetch user token info
      setRefresh(false);
    }
  }, [refresh, fetchUserData]);

  // ✅ Trigger refresh when returning from booking page
  useEffect(() => {
    const hasBooked = localStorage.getItem("mealBooked");
    if (hasBooked) {
      setRefresh(true);
      localStorage.removeItem("mealBooked");
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
      <Navbar />

      <div className="container mx-auto px-6 py-10">
        {/* Profile Card */}
        <div className="bg-gradient-to-r from-[#D26F51] to-[#B95C40] text-white rounded-2xl shadow-2xl p-8 mb-10 flex items-center gap-6 border border-[#D26F51] transform transition hover:scale-105">
          {user.photoURL ? (
            <img
              src={user.photoURL}
              alt={user.name}
              className="w-24 h-24 rounded-full object-cover border-4 border-white"
            />
          ) : (
            <div className="w-24 h-24 rounded-full flex items-center justify-center text-3xl font-bold bg-gradient-to-r from-[#D26F51] to-[#B95C40]">
              {user.name.charAt(0).toUpperCase()}
            </div>
          )}

          <div>
            <h1 className="text-3xl font-extrabold mb-1 text-white">
              {user.name}
            </h1>
            <p className="font-medium">Roll No: {user.rollNo}</p>
            <p className="font-medium">Mess: GDB Hall</p>
          </div>
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <Link
            to="/view-menu"
            className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition transform hover:-translate-y-1"
          >
            <div className="text-center">
              <ClipboardList className="mx-auto h-12 w-12 mb-4 text-[#B95C40]" />
              <h2 className="text-xl font-bold mb-1 text-gray-800">
                View Mess Menu
              </h2>
              <p className="text-gray-500 text-sm">Check today’s delicious menu</p>
            </div>
          </Link>

          <Link
            to="/view-tokens"
            className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition transform hover:-translate-y-1"
          >
            <div className="text-center">
              <Ticket className="mx-auto h-12 w-12 mb-4 text-[#B95C40]" />
              <h2 className="text-xl font-bold mb-1 text-gray-800">
                Check Current Tokens
              </h2>
              <p className="text-gray-500 text-sm">View your current meal tokens</p>
            </div>
          </Link>

          <Link
            to="/book-meal"
            className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition transform hover:-translate-y-1"
            onClick={() => localStorage.setItem("mealBooked", "true")}
          >
            <div className="text-center">
              <Utensils className="mx-auto h-12 w-12 mb-4 text-[#B95C40]" />
              <h2 className="text-xl font-bold mb-1 text-gray-800">
                Book Meal Coupons
              </h2>
              <p className="text-gray-500 text-sm">Reserve your meals for tomorrow</p>
            </div>
          </Link>
        </div>

        {/* Token Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
          {[
            { label: "Breakfast", count: user.tokens.breakfast },
            { label: "Lunch", count: user.tokens.lunch },
            { label: "Snacks", count: user.tokens.snacks },
            { label: "Dinner", count: user.tokens.dinner },
          ].map((item) => (
            <div
              key={item.label}
              className={`p-5 rounded-xl text-center shadow-md bg-gradient-to-br ${TOKEN_COLORS[item.label]} hover:scale-105 transition`}
            >
              <p className="text-white font-medium mb-1">{item.label}</p>
              <p className="text-3xl font-bold text-white">{item.count}</p>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="text-center mt-10 text-sm text-gray-500 font-medium">
          © {new Date().getFullYear()} National Institute of Technology, Rourkela
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

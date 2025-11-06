import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import api from '../../utils/api';

const ViewMenu = () => {
  const [menu, setMenu] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const { data } = await api.get('/public/menu');
        setMenu(data.menu);
      } catch (error) {
        console.error('Error fetching menu:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-orange-50 to-amber-100 flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-xl text-orange-700 font-semibold animate-pulse">
            🍽️ Loading Weekly Menu...
          </div>
        </div>
      </div>
    );
  }

  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
  const dayLabels = {
    monday: 'Monday',
    tuesday: 'Tuesday',
    wednesday: 'Wednesday',
    thursday: 'Thursday',
    friday: 'Friday',
    saturday: 'Saturday',
    sunday: 'Sunday',
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-amber-50 to-yellow-100">
      <Navbar />

      {/* Hero Banner */}
      <div className="relative bg-gradient-to-r from-orange-600 to-amber-600 text-white py-12 shadow-md">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-3">
            🍴 Weekly Mess Menu
          </h1>
          <p className="text-lg text-orange-100">
            Stay updated with this week’s delicious meals at your hostel mess
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-orange-400 to-amber-500" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-10">
        <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-lg p-8 border border-amber-100">
          <div className="flex justify-end mb-6">
            <Link
              to="/student/dashboard"
              className="text-orange-600 font-semibold hover:text-amber-700 transition"
            >
              ← Back to Dashboard
            </Link>
          </div>

          <div className="space-y-10">
            {days.map((day) => (
              <div
                key={day}
                className="rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200"
              >
                {/* Day Header */}
                <div className="bg-gradient-to-r from-orange-500 to-amber-500 text-white px-6 py-4 flex items-center justify-between">
                  <h2 className="text-2xl font-bold">{dayLabels[day]}</h2>
                  <span className="text-sm font-light text-orange-100">
                    🍚 Fresh | 🍛 Tasty | ☕ Energizing
                  </span>
                </div>

                {/* Meals Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 bg-white p-6">
                  {/* Breakfast */}
                  <div className="rounded-lg p-4 bg-gradient-to-br from-yellow-50 to-amber-100 hover:scale-[1.02] transition">
                    <h3 className="text-lg font-bold text-amber-800 mb-3 flex items-center gap-2">
                      <span>🍳</span> Breakfast
                    </h3>
                    <ul className="text-sm text-gray-800 space-y-1">
                      {menu[day].breakfast.map((item, idx) => (
                        <li key={idx}>• {item}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Lunch */}
                  <div className="rounded-lg p-4 bg-gradient-to-br from-orange-50 to-orange-100 hover:scale-[1.02] transition">
                    <h3 className="text-lg font-bold text-orange-800 mb-3 flex items-center gap-2">
                      <span>🍛</span> Lunch
                    </h3>
                    <ul className="text-sm text-gray-800 space-y-1">
                      {menu[day].lunch.map((item, idx) => (
                        <li key={idx}>• {item}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Snacks */}
                  <div className="rounded-lg p-4 bg-gradient-to-br from-rose-50 to-red-100 hover:scale-[1.02] transition">
                    <h3 className="text-lg font-bold text-red-800 mb-3 flex items-center gap-2">
                      <span>☕</span> Snacks
                    </h3>
                    <ul className="text-sm text-gray-800 space-y-1">
                      {menu[day].snacks.map((item, idx) => (
                        <li key={idx}>• {item}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Dinner */}
                  <div className="rounded-lg p-4 bg-gradient-to-br from-amber-50 to-yellow-100 hover:scale-[1.02] transition">
                    <h3 className="text-lg font-bold text-yellow-800 mb-3 flex items-center gap-2">
                      <span>🍽️</span> Dinner
                    </h3>
                    <ul className="text-sm text-gray-800 space-y-1">
                      {menu[day].dinner.map((item, idx) => (
                        <li key={idx}>• {item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewMenu;

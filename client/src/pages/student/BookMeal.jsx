import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import { AuthContext } from '../../context/AuthContext';
import api from '../../utils/api';

const BookMeal = () => {
  const { user } = useContext(AuthContext);
  const [meals, setMeals] = useState({
    breakfast: false,
    lunch: false,
    snacks: false,
    dinner: false
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const navigate = useNavigate();

  const handleCheckbox = (meal) => {
    setMeals({ ...meals, [meal]: !meals[meal] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });
    setLoading(true);

    if (!meals.breakfast && !meals.lunch && !meals.snacks && !meals.dinner) {
      setMessage({ type: 'error', text: 'Please select at least one meal' });
      setLoading(false);
      return;
    }

    try {
      const { data } = await api.post('/student/book-tomorrow', { meals });
      setMessage({ type: 'success', text: data.message });
      setTimeout(() => {
        navigate('/student/dashboard');
      }, 2000);
    } catch (error) {
      setMessage({
        type: 'error',
        text: error.response?.data?.message || 'Booking failed'
      });
    } finally {
      setLoading(false);
    }
  };

  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toLocaleDateString('en-IN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="bg-gradient-to-r from-orange-400 to-orange-500 text-white rounded-2xl shadow-2xl p-8 max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold">Book Meals for Tomorrow</h1>
            <div className="inline-block bg-white rounded px-4 py-2">
              <Link
                to="/student/dashboard"
                className="text-orange-500 font-semibold hover:text-orange-600"
              >
                ← Back
              </Link>
            </div>

          </div>

          <div className="bg-white/90 text-gray-800 px-4 py-3 rounded mb-6">
            <p className="font-semibold">Booking for: {getTomorrowDate()}</p>
            <p className="text-sm mt-1">Each meal costs 1 token. Tokens will be deducted immediately.</p>
          </div>

          {message.text && (
            <div className={`px-4 py-3 rounded mb-6 ${
              message.type === 'success' 
                ? 'bg-green-100 border border-green-400 text-green-700'
                : 'bg-red-100 border border-red-400 text-red-700'
            }`}>
              {message.text}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="space-y-4 mb-6">
              {[
                { key: 'breakfast', label: 'Breakfast', emoji: '🍳', tokens: user.tokens.breakfast },
                { key: 'lunch', label: 'Lunch', emoji: '🍛', tokens: user.tokens.lunch },
                { key: 'snacks', label: 'Snacks', emoji: '☕', tokens: user.tokens.snacks },
                { key: 'dinner', label: 'Dinner', emoji: '🍽️', tokens: user.tokens.dinner },
              ].map(meal => (
                <div key={meal.key} className="bg-white rounded-xl p-4 flex items-center justify-between shadow hover:shadow-md transition">
                  <div className="flex items-center gap-4">
                    <span className="text-3xl">{meal.emoji}</span>
                    <div>
                      <p className="font-bold text-lg text-gray-800">{meal.label}</p>
                      <p className="text-sm text-gray-500">Available tokens: {meal.tokens}</p>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={meals[meal.key]}
                    onChange={() => handleCheckbox(meal.key)}
                    className="w-6 h-6 accent-orange-500"
                    disabled={meal.tokens === 0}
                  />
                </div>
              ))}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-white text-orange-500 border border-orange-500 py-3 rounded-lg hover:bg-orange-50 transition font-semibold disabled:opacity-50"
            >
              {loading ? 'Booking...' : 'Confirm Booking'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookMeal;

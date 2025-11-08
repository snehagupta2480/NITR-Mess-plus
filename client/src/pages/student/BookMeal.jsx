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
    dinner: false,
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

    if (!Object.values(meals).some(Boolean)) {
      setMessage({ type: 'error', text: 'Please select at least one meal' });
      setLoading(false);
      return;
    }

    try {
      const { data } = await api.post('/student/book-tomorrow', { meals });
      setMessage({ type: 'success', text: data.message });
      setTimeout(() => navigate('/student/dashboard'), 2000);
    } catch (error) {
      setMessage({
        type: 'error',
        text: error.response?.data?.message || 'Booking failed',
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
      day: 'numeric',
    });
  };

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: '#F8F5F3' }}
    >
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div
          className="text-white rounded-2xl shadow-2xl p-8 max-w-2xl mx-auto"
          style={{
            background: 'linear-gradient(90deg, #B95C40, #A24A33)',
          }}
        >
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold">Book Meals for Tomorrow</h1>
            <div
              className="inline-block rounded px-4 py-2 shadow"
              style={{ backgroundColor: '#fff' }}
            >
              <Link
                to="/student/dashboard"
                className="font-semibold transition"
                style={{ color: '#B95C40' }}
                onMouseOver={(e) => (e.currentTarget.style.color = '#8C3B26')}
                onMouseOut={(e) => (e.currentTarget.style.color = '#B95C40')}
              >
                ← Back
              </Link>
            </div>
          </div>

          {/* Booking Info */}
          <div
            className="text-gray-800 px-4 py-3 rounded mb-6"
            style={{
              backgroundColor: 'rgba(255,255,255,0.9)',
            }}
          >
            <p className="font-semibold">Booking for: {getTomorrowDate()}</p>
            <p className="text-sm mt-1">
              Each meal costs 1 token. Tokens will be deducted immediately.
            </p>
          </div>

          {/* Message Box */}
          {message.text && (
            <div
              className={`px-4 py-3 rounded mb-6 border ${
                message.type === 'success'
                  ? 'bg-green-100 border-green-400 text-green-700'
                  : 'bg-red-100 border-red-400 text-red-700'
              }`}
            >
              {message.text}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div className="space-y-4 mb-6">
              {[
                {
                  key: 'breakfast',
                  label: 'Breakfast',
                  emoji: '🍳',
                  tokens: user.tokens.breakfast,
                },
                {
                  key: 'lunch',
                  label: 'Lunch',
                  emoji: '🍛',
                  tokens: user.tokens.lunch,
                },
                {
                  key: 'snacks',
                  label: 'Snacks',
                  emoji: '☕',
                  tokens: user.tokens.snacks,
                },
                {
                  key: 'dinner',
                  label: 'Dinner',
                  emoji: '🍽️',
                  tokens: user.tokens.dinner,
                },
              ].map((meal) => (
                <div
                  key={meal.key}
                  className="rounded-xl p-4 flex items-center justify-between shadow hover:shadow-md transition"
                  style={{
                    backgroundColor: '#fff',
                    border: '1px solid #E8CFC5',
                  }}
                >
                  <div className="flex items-center gap-4">
                    <span className="text-3xl">{meal.emoji}</span>
                    <div>
                      <p className="font-bold text-lg text-gray-800">
                        {meal.label}
                      </p>
                      <p className="text-sm text-gray-500">
                        Available tokens: {meal.tokens}
                      </p>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={meals[meal.key]}
                    onChange={() => handleCheckbox(meal.key)}
                    className="w-6 h-6 accent-[#B95C40]"
                    disabled={meal.tokens === 0}
                  />
                </div>
              ))}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg font-semibold transition disabled:opacity-50"
              style={{
                color: '#B95C40',
                border: '2px solid #B95C40',
                backgroundColor: '#fff',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = '#B95C40';
                e.currentTarget.style.color = '#fff';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = '#fff';
                e.currentTarget.style.color = '#B95C40';
              }}
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

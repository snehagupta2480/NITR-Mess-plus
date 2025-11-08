import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import api from '../../utils/api';

const ViewTokens = () => {
  const [tokens, setTokens] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTokens = async () => {
      try {
        const { data } = await api.get('/student/my-tokens');
        setTokens(data.tokens);
      } catch (error) {
        console.error('Error fetching tokens:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTokens();
  }, []);

  if (loading) {
    return (
      <div
        className="min-h-screen flex flex-col"
        style={{ backgroundColor: '#F8F5F3' }}
      >
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <p
            className="text-xl font-semibold animate-pulse"
            style={{ color: '#B95C40' }}
          >
            🍽️ Loading your tokens...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: '#F8F5F3', color: '#333' }}
    >
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        {/* Main Card */}
        <div
          className="text-white rounded-2xl shadow-2xl p-8"
          style={{
            background: 'linear-gradient(90deg, #B95C40, #A24A33)',
          }}
        >
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold">Your Meal Tokens</h1>
            <div
              className="inline-block rounded px-4 py-2 shadow hover:shadow-md transition"
              style={{ backgroundColor: '#fff' }}
            >
              <Link
                to="/student/dashboard"
                className="font-semibold transition"
                style={{ color: '#B95C40' }}
                onMouseOver={(e) => (e.currentTarget.style.color = '#8C3B26')}
                onMouseOut={(e) => (e.currentTarget.style.color = '#B95C40')}
              >
                ← Back to Dashboard
              </Link>
            </div>
          </div>

          {/* Token Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { label: 'Breakfast', emoji: '🍳', count: tokens.breakfast },
              { label: 'Lunch', emoji: '🍛', count: tokens.lunch },
              { label: 'Snacks', emoji: '☕', count: tokens.snacks },
              { label: 'Dinner', emoji: '🍽️', count: tokens.dinner },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-xl p-6 shadow-md flex flex-col items-center transition hover:scale-105"
                style={{
                  backgroundColor: '#fff',
                  border: '1px solid #E8CFC5',
                }}
              >
                <div className="flex items-center justify-between w-full mb-4">
                  <h2 className="text-2xl font-bold text-gray-800">
                    {item.label}
                  </h2>
                  <span className="text-3xl">{item.emoji}</span>
                </div>
                <p
                  className="text-5xl font-bold"
                  style={{ color: '#B95C40' }}
                >
                  {item.count}
                </p>
                <p className="text-gray-500 mt-2 text-center">
                  tokens remaining
                </p>
              </div>
            ))}
          </div>

          {/* Book Meal Button */}
          <div className="mt-8 text-center">
            <Link
              to="/book-meal"
              className="inline-block px-8 py-3 rounded-lg font-semibold transition"
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
              Book Meals for Tomorrow
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewTokens;

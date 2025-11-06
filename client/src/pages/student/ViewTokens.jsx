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
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-8 text-center">
          <p className="text-xl text-orange-500 font-semibold animate-pulse">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        {/* Main Card */}
        <div className="bg-gradient-to-r from-orange-400 to-orange-600 text-white rounded-2xl shadow-2xl p-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold">Your Meal Tokens</h1>
            <div className="inline-block bg-white rounded px-4 py-2 shadow hover:shadow-md transition">
              <Link
                to="/student/dashboard"
                className="text-orange-500 font-semibold hover:text-orange-600"
              >
                ← Back to Dashboard
              </Link>
            </div>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { label: 'Breakfast', emoji: '🍳', count: tokens.breakfast },
              { label: 'Lunch', emoji: '🍛', count: tokens.lunch },
              { label: 'Snacks', emoji: '☕', count: tokens.snacks },
              { label: 'Dinner', emoji: '🍽️', count: tokens.dinner },
            ].map((item) => (
              <div
                key={item.label}
                className="bg-white rounded-xl p-6 shadow-md flex flex-col items-center transition hover:scale-105"
              >
                <div className="flex items-center justify-between w-full mb-4">
                  <h2 className="text-2xl font-bold text-gray-800">{item.label}</h2>
                  <span className="text-3xl">{item.emoji}</span>
                </div>
                <p className="text-5xl font-bold text-orange-500">{item.count}</p>
                <p className="text-gray-500 mt-2 text-center">tokens remaining</p>
              </div>
            ))}
          </div>

<div className="mt-8 text-center">
  <Link
    to="/book-meal"
    className="inline-block bg-white text-orange-500 border border-orange-500 px-8 py-3 rounded-lg hover:bg-orange-50 transition font-semibold"
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

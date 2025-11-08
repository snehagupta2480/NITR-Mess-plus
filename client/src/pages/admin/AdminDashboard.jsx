import { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import api from '../../utils/api';

const AdminDashboard = () => {
  const [selectedMeal, setSelectedMeal] = useState('breakfast');
  const [selectedDayTab, setSelectedDayTab] = useState('today');
  const [studentData, setStudentData] = useState({ today: [], yesterday: [] });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const BRAND_COLOR = '#B95C40'; // Brand tone
  const ACTIVE_COLOR = '#3B82F6'; // Blue for active tab

  const meals = [
    { value: 'breakfast', label: 'Breakfast', icon: '🍳' },
    { value: 'lunch', label: 'Lunch', icon: '🍛' },
    { value: 'snacks', label: 'Snacks', icon: '☕' },
    { value: 'dinner', label: 'Dinner', icon: '🍽️' },
  ];

  const fetchMealList = async (meal) => {
    setLoading(true);
    setMessage({ type: '', text: '' });
    try {
      const { data } = await api.get(`/admin/meal-list?meal=${meal}`);
      setStudentData({
        yesterday: data.yesterday?.students || [],
        today: data.today?.students || [],
      });
    } catch (error) {
      setMessage({
        type: 'error',
        text: error.response?.data?.message || 'Failed to fetch meal list',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMealList(selectedMeal);
  }, [selectedMeal]);

  const handleVerify = async (bookingId, dayKey) => {
    try {
      await api.put('/admin/verify-meal', { bookingId, meal: selectedMeal });
      setStudentData((prev) => ({
        ...prev,
        [dayKey]: prev[dayKey].filter((s) => s.bookingId !== bookingId),
      }));
      setMessage({ type: 'success', text: 'Meal verified successfully' });
      setTimeout(() => setMessage({ type: '', text: '' }), 2000);
    } catch (error) {
      setMessage({
        type: 'error',
        text: error.response?.data?.message || 'Verification failed',
      });
    }
  };

  const formatDate = (offsetDays = 0) => {
    const d = new Date();
    d.setDate(d.getDate() + offsetDays);
    return d.toLocaleDateString('en-IN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const renderStudentList = (students, title, dayKey, showVerify) => (
    <div className="p-4 rounded-lg mb-6 shadow-md" style={{ background: 'linear-gradient(to bottom, #F9F5F3, #F2E3DF)' }}>
      <h2 className="text-xl font-bold mb-4 text-center" style={{ color: BRAND_COLOR }}>
        {title}{' '}
        <span className="text-gray-600 font-normal text-sm">
          ({students.length} students)
        </span>
      </h2>
      {students.length === 0 ? (
        <p className="text-center py-8 text-gray-600">
          No unverified bookings for this day
        </p>
      ) : (
        <div className="space-y-4">
          {students.map((student) => (
            <div
              key={student.bookingId}
              className="bg-white rounded-xl shadow-md p-4 flex items-center justify-between transition hover:shadow-lg"
            >
              <div className="flex items-center gap-4">
                {student.photoURL ? (
                  <img
                    src={student.photoURL}
                    alt={student.name}
                    className="w-16 h-16 rounded-full object-cover border-2"
                    style={{ borderColor: BRAND_COLOR }}
                  />
                ) : (
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center text-white text-xl font-bold"
                    style={{ backgroundColor: BRAND_COLOR }}
                  >
                    {student.name.charAt(0)}
                  </div>
                )}

                <div>
                  <p className="font-bold text-lg text-gray-800">{student.name}</p>
                  <p className="text-gray-500">Roll No: {student.rollNo}</p>
                  <p className="text-gray-500 text-sm">Mess: GDB</p>
                </div>
              </div>

              {showVerify && (
                <button
                  onClick={() => handleVerify(student.bookingId, dayKey)}
                  className="text-white px-6 py-2 rounded transition flex items-center gap-2"
                  style={{
                    backgroundColor: 'green',
                  }}
                >
                  <span className="text-xl">✓</span>
                  Verify
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const getActiveList = () => {
    if (selectedDayTab === 'today') {
      return renderStudentList(
        studentData.yesterday,
        `Meals for Today (${formatDate(0)})`,
        'yesterday',
        true
      );
    } else {
      return renderStudentList(
        studentData.today,
        `Meals for Tomorrow (${formatDate(1)})`,
        'today',
        false
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-50 to-gray-100">
      <Navbar />

      <div className="container mx-auto px-4 py-10">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Header */}
          <h1 className="text-4xl font-bold text-center mb-2" style={{ color: BRAND_COLOR }}>
            Admin Verification Panel
          </h1>
          <p className="text-center text-gray-500 mb-6">
            Date: {selectedDayTab === 'today' ? formatDate(0) : formatDate(1)}
          </p>

          {/* Message */}
          {message.text && (
            <div
              className={`px-4 py-3 rounded mb-6 text-center ${
                message.type === 'success'
                  ? 'bg-green-100 border border-green-400 text-green-700'
                  : 'bg-red-100 border border-red-400 text-red-700'
              }`}
            >
              {message.text}
            </div>
          )}

          {/* Day Tabs */}
          <div className="flex justify-center gap-4 mb-6 flex-wrap">
            {['today', 'tomorrow'].map((day) => (
              <button
                key={day}
                onClick={() => setSelectedDayTab(day)}
                className="px-10 py-4 rounded-lg font-semibold text-lg transition"
                style={{
                  backgroundColor:
                    selectedDayTab === day ? ACTIVE_COLOR : BRAND_COLOR,
                  color: '#fff',
                  boxShadow:
                    selectedDayTab === day
                      ? '0 4px 10px rgba(59,130,246,0.3)'
                      : '0 2px 6px rgba(185,92,64,0.3)',
                }}
                onMouseOver={(e) => {
                  if (selectedDayTab !== day)
                    e.currentTarget.style.backgroundColor = '#8C3B26';
                }}
                onMouseOut={(e) => {
                  if (selectedDayTab !== day)
                    e.currentTarget.style.backgroundColor = BRAND_COLOR;
                }}
              >
                {day === 'today' ? 'Meals for Today' : 'Meals for Tomorrow'}
              </button>
            ))}
          </div>

          {/* Meal Tabs */}
          <div className="flex justify-center gap-4 mb-6 flex-wrap">
            {meals.map((meal) => (
              <button
                key={meal.value}
                onClick={() => setSelectedMeal(meal.value)}
                className="px-8 py-4 rounded-lg font-semibold text-lg flex items-center justify-center gap-2 transition"
                style={{
                  minWidth: '160px',
                  backgroundColor:
                    selectedMeal === meal.value ? ACTIVE_COLOR : BRAND_COLOR,
                  color: '#fff',
                  boxShadow:
                    selectedMeal === meal.value
                      ? '0 4px 10px rgba(59,130,246,0.3)'
                      : '0 2px 6px rgba(185,92,64,0.3)',
                }}
                onMouseOver={(e) => {
                  if (selectedMeal !== meal.value)
                    e.currentTarget.style.backgroundColor = '#8C3B26';
                }}
                onMouseOut={(e) => {
                  if (selectedMeal !== meal.value)
                    e.currentTarget.style.backgroundColor = BRAND_COLOR;
                }}
              >
                <span>{meal.icon}</span>
                {meal.label}
              </button>
            ))}
          </div>

          {/* Student List */}
          {loading ? (
            <p className="text-center py-8 text-gray-500">Loading...</p>
          ) : (
            getActiveList()
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

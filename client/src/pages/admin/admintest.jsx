import { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import api from '../../utils/api';

const AdminPortal = () => {
  const [mealType, setMealType] = useState('breakfast');
  const [activeDay, setActiveDay] = useState('today');
  const [mealRecords, setMealRecords] = useState({ todayList: [], prevList: [] });
  const [isBusy, setIsBusy] = useState(false);
  const [notif, setNotif] = useState({ mode: '', info: '' });

  const PRIMARY_COLOR = '#B94B3E';
  const ACTIVE_TAB = '#2563EB';
  const SOFT_BG = 'linear-gradient(to bottom right, #F9F6F5, #F2E4DF)';

  const MEAL_OPTIONS = [
    { key: 'breakfast', title: 'Breakfast', symbol: '🍳' },
    { key: 'lunch', title: 'Lunch', symbol: '🍛' },
    { key: 'snacks', title: 'Snacks', symbol: '☕' },
    { key: 'dinner', title: 'Dinner', symbol: '🍽️' },
  ];

  const loadMealInfo = async (type) => {
    setIsBusy(true);
    setNotif({ mode: '', info: '' });
    try {
      const { data } = await api.get(`/admin/meal-list?meal=${type}`);
      setMealRecords({
        prevList: data.yesterday?.students || [],
        todayList: data.today?.students || [],
      });
    } catch (error) {
      setNotif({
        mode: 'error',
        info: error.response?.data?.message || 'Error fetching meal data',
      });
    } finally {
      setIsBusy(false);
    }
  };

  useEffect(() => {
    loadMealInfo(mealType);
  }, [mealType]);

  const markMealVerified = async (bookingId, listKey) => {
    try {
      await api.put('/admin/verify-meal', { bookingId, meal: mealType });
      setMealRecords((oldData) => ({
        ...oldData,
        [listKey]: oldData[listKey].filter((rec) => rec.bookingId !== bookingId),
      }));
      setNotif({ mode: 'success', info: 'Meal verified ✅' });
      setTimeout(() => setNotif({ mode: '', info: '' }), 2500);
    } catch (error) {
      setNotif({
        mode: 'error',
        info: error.response?.data?.message || 'Could not verify meal',
      });
    }
  };

  const prettyDate = (offset = 0) => {
    const d = new Date();
    d.setDate(d.getDate() + offset);
    return d.toLocaleDateString('en-IN', {
      weekday: 'long',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const renderMealTable = (dataList, heading, keyLabel, canVerify) => (
    <div
      className="p-5 rounded-2xl mb-6 shadow-md hover:shadow-xl transition duration-200"
      style={{ background: SOFT_BG }}
    >
      <h2
        className="text-2xl font-semibold mb-3 text-center"
        style={{ color: PRIMARY_COLOR }}
      >
        {heading}{' '}
        <span className="text-gray-500 text-base">
          ({dataList.length} entries)
        </span>
      </h2>

      {dataList.length === 0 ? (
        <p className="text-center py-10 text-gray-600 italic">
          Nothing to verify here 👀
        </p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {dataList.map((student) => (
            <div
              key={student.bookingId}
              className="bg-white rounded-xl border border-gray-100 shadow p-5 flex flex-col items-center justify-center hover:scale-[1.02] transition"
            >
              {student.photoURL ? (
                <img
                  src={student.photoURL}
                  alt={student.name}
                  className="w-20 h-20 rounded-full border-4"
                  style={{ borderColor: PRIMARY_COLOR }}
                />
              ) : (
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center text-white text-2xl font-bold"
                  style={{ backgroundColor: PRIMARY_COLOR }}
                >
                  {student.name?.[0]?.toUpperCase() || '?'}
                </div>
              )}
              <div className="mt-3 text-center">
                <p className="font-bold text-lg">{student.name}</p>
                <p className="text-sm text-gray-600">Roll No: {student.rollNo}</p>
                <p className="text-sm text-gray-500">Mess: GDB</p>
              </div>

              {canVerify && (
                <button
                  onClick={() => markMealVerified(student.bookingId, keyLabel)}
                  className="mt-3 px-5 py-2 text-white rounded-lg font-semibold flex items-center gap-2"
                  style={{
                    backgroundColor: '#16A34A',
                    boxShadow: '0 2px 6px rgba(22,163,74,0.4)',
                  }}
                >
                  <span>✔</span> Approve
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );

  
  const chooseActiveList = () => {
    return activeDay === 'today'
      ? renderMealTable(
          mealRecords.todayList,     
          `Today's Meals (${prettyDate(0)})`,
          'todayList',
          true
        )
      : renderMealTable(
          mealRecords.prevList,       
          `Tomorrow's Meals (${prettyDate(1)})`,
          'prevList',
          false
        );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200">
      <Navbar />

      <div className="container mx-auto px-5 py-10">
        <div className="bg-white rounded-3xl shadow-lg p-8 sm:p-10">
          <h1
            className="text-4xl font-extrabold text-center mb-3"
            style={{ color: PRIMARY_COLOR }}
          >
            Mess Verification Console
          </h1>
          <p className="text-center text-gray-500 mb-6">
            Viewing data for{' '}
            <span className="font-medium">
              {activeDay === 'today' ? prettyDate(0) : prettyDate(1)}
            </span>
          </p>

          {notif.info && (
            <div
              className={`px-4 py-3 rounded-xl mb-6 text-center text-lg ${
                notif.mode === 'success'
                  ? 'bg-green-100 border border-green-400 text-green-700'
                  : 'bg-red-100 border border-red-400 text-red-700'
              }`}
            >
              {notif.info}
            </div>
          )}

          <div className="flex justify-center flex-wrap gap-4 mb-6">
            {['today', 'tomorrow'].map((d) => (
              <button
                key={d}
                onClick={() => setActiveDay(d)}
                className="px-8 py-3 rounded-lg font-semibold transition"
                style={{
                  backgroundColor:
                    activeDay === d ? ACTIVE_TAB : PRIMARY_COLOR,
                  color: 'white',
                  boxShadow:
                    activeDay === d
                      ? '0 4px 10px rgba(37,99,235,0.3)'
                      : '0 3px 6px rgba(185,75,62,0.3)',
                }}
                onMouseOver={(e) => {
                  if (activeDay !== d)
                    e.currentTarget.style.backgroundColor = '#92362B';
                }}
                onMouseOut={(e) => {
                  if (activeDay !== d)
                    e.currentTarget.style.backgroundColor = PRIMARY_COLOR;
                }}
              >
                {d === 'today' ? 'Today’s List' : 'Tomorrow’s List'}
              </button>
            ))}
          </div>

          <div className="flex justify-center flex-wrap gap-4 mb-8">
            {MEAL_OPTIONS.map((item) => (
              <button
                key={item.key}
                onClick={() => setMealType(item.key)}
                className="px-8 py-3 rounded-lg font-semibold flex items-center gap-2 transition"
                style={{
                  minWidth: '150px',
                  backgroundColor:
                    mealType === item.key ? ACTIVE_TAB : PRIMARY_COLOR,
                  color: '#fff',
                  boxShadow:
                    mealType === item.key
                      ? '0 4px 10px rgba(37,99,235,0.3)'
                      : '0 3px 6px rgba(185,75,62,0.3)',
                }}
                onMouseOver={(e) => {
                  if (mealType !== item.key)
                    e.currentTarget.style.backgroundColor = '#92362B';
                }}
                onMouseOut={(e) => {
                  if (mealType !== item.key)
                    e.currentTarget.style.backgroundColor = PRIMARY_COLOR;
                }}
              >
                <span>{item.symbol}</span>
                {item.title}
              </button>
            ))}
          </div>

          {isBusy ? (
            <p className="text-center text-gray-500 text-lg py-10 animate-pulse">
              Fetching data, please wait...
            </p>
          ) : (
            chooseActiveList()
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPortal;

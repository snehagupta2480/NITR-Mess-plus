const Booking = require('../models/Booking');

// @desc    Get list of students who booked a specific meal for today
// @route   GET /api/admin/meal-list?meal=breakfast
// @access  Private (Admin only)
const getMealList = async (req, res) => {
  try {
    const { meal } = req.query; // breakfast, lunch, snacks, or dinner

    if (!meal || !['breakfast', 'lunch', 'snacks', 'dinner'].includes(meal)) {
      return res.status(400).json({ message: 'Invalid meal type' });
    }

    // Get today's date (start of day)
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Find all bookings for today where:
    // 1. The specific meal is booked (meals.breakfast = true)
    // 2. The meal is NOT yet verified (verified.breakfast = false)
    const filter = {
      date: today,
      [`meals.${meal}`]: true,
      [`verified.${meal}`]: false
    };

    const bookings = await Booking.find(filter)
      .populate('student', 'rollNo name photo messName')
      .sort({ 'student.rollNo': 1 });

    // Format response
    const studentList = bookings.map(booking => ({
      bookingId: booking._id,
      rollNo: booking.student.rollNo,
      name: booking.student.name,
      photo: booking.student.photo,
      messName: booking.student.messName
    }));

    res.json({
      meal,
      date: today,
      count: studentList.length,
      students: studentList
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Verify that a student has taken their meal
// @route   PUT /api/admin/verify-meal
// @access  Private (Admin only)
const verifyMeal = async (req, res) => {
  try {
    const { bookingId, meal } = req.body;

    if (!bookingId || !meal) {
      return res.status(400).json({ message: 'Booking ID and meal type are required' });
    }

    if (!['breakfast', 'lunch', 'snacks', 'dinner'].includes(meal)) {
      return res.status(400).json({ message: 'Invalid meal type' });
    }

    // Find booking
    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Check if meal was actually booked
    if (!booking.meals[meal]) {
      return res.status(400).json({ message: 'This meal was not booked' });
    }

    // Check if already verified
    if (booking.verified[meal]) {
      return res.status(400).json({ message: 'This meal has already been verified' });
    }

    // Mark as verified
    booking.verified[meal] = true;
    await booking.save();

    res.json({
      message: 'Meal verified successfully',
      booking
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getMealList,
  verifyMeal
};
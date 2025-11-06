const Student = require('../models/Student');
const Booking = require('../models/Booking');

// @desc    Book meals for tomorrow
// @route   POST /api/student/book-tomorrow
// @access  Private
const bookTomorrow = async (req, res) => {
  try {
    const { meals } = req.body; // { breakfast: true, lunch: false, ... }
    const studentId = req.user._id;

    // Get tomorrow's date (start of day)
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);

    // Check if already booked for tomorrow
    const existingBooking = await Booking.findOne({
      student: studentId,
      date: tomorrow
    });

    if (existingBooking) {
      return res.status(400).json({ message: 'You have already booked meals for tomorrow' });
    }

    // Get student's current tokens
    const student = await Student.findById(studentId);

    // Calculate tokens needed and check availability
    const mealsToBook = ['breakfast', 'lunch', 'snacks', 'dinner'];
    const tokensNeeded = {};
    const insufficientTokens = [];

    for (const meal of mealsToBook) {
      if (meals[meal]) {
        tokensNeeded[meal] = 1;
        if (student.tokens[meal] < 1) {
          insufficientTokens.push(meal);
        }
      }
    }

    // If any meal has insufficient tokens, return error
    if (insufficientTokens.length > 0) {
      return res.status(400).json({
        message: `Insufficient tokens for: ${insufficientTokens.join(', ')}`,
        insufficientTokens
      });
    }

    // Deduct tokens
    for (const meal of mealsToBook) {
      if (meals[meal]) {
        student.tokens[meal] -= 1;
      }
    }

    await student.save();

    // Create booking
    const booking = await Booking.create({
      student: studentId,
      date: tomorrow,
      meals: meals
    });

    res.status(201).json({
      message: 'Meals booked successfully',
      booking,
      remainingTokens: student.tokens
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while booking meals' });
  }
};

// @desc    Get student's token balance
// @route   GET /api/student/my-tokens
// @access  Private
const getMyTokens = async (req, res) => {
  try {
    const student = await Student.findById(req.user._id);
    res.json({ tokens: student.tokens });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get student's booking history
// @route   GET /api/student/my-bookings
// @access  Private
const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ student: req.user._id })
      .sort({ date: -1 })
      .limit(30); // Last 30 bookings

    res.json({ bookings });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  bookTomorrow,
  getMyTokens,
  getMyBookings
};
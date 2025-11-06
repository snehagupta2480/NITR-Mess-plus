const express = require('express');
const router = express.Router();
const { bookTomorrow, getMyTokens, getMyBookings } = require('../controllers/studentController');
const { protect } = require('../middleware/auth');

router.post('/book-tomorrow', protect, bookTomorrow);
router.get('/my-tokens', protect, getMyTokens);
router.get('/my-bookings', protect, getMyBookings);

module.exports = router;
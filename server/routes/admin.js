const express = require('express');
const router = express.Router();
const { getMealList, verifyMeal } = require('../controllers/adminController');
const { protect } = require('../middleware/auth');
const { adminOnly } = require('../middleware/adminAuth');

router.get('/meal-list', protect, adminOnly, getMealList);
router.put('/verify-meal', protect, adminOnly, verifyMeal);

module.exports = router;
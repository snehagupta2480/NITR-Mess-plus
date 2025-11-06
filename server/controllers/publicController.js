// @desc    Get mess menu
// @route   GET /api/public/menu
// @access  Public
const getMenu = async (req, res) => {
  try {
    // This is a static menu. In production, you might store this in the database
    const menu = {
      monday: {
        breakfast: ['Poha', 'Bread & Butter', 'Tea/Coffee', 'Banana'],
        lunch: ['Rice', 'Dal', 'Sabzi', 'Roti', 'Salad', 'Curd'],
        snacks: ['Samosa', 'Tea/Coffee'],
        dinner: ['Rice', 'Rajma', 'Roti', 'Sabzi', 'Sweet']
      },
      tuesday: {
        breakfast: ['Idli', 'Sambar', 'Chutney', 'Tea/Coffee'],
        lunch: ['Rice', 'Dal', 'Aloo Gobi', 'Roti', 'Salad', 'Buttermilk'],
        snacks: ['Bread Pakora', 'Tea/Coffee'],
        dinner: ['Rice', 'Chole', 'Roti', 'Raita', 'Gulab Jamun']
      },
      wednesday: {
        breakfast: ['Upma', 'Bread & Jam', 'Tea/Coffee', 'Banana'],
        lunch: ['Rice', 'Dal Fry', 'Paneer Sabzi', 'Roti', 'Salad', 'Curd'],
        snacks: ['Veg Cutlet', 'Tea/Coffee'],
        dinner: ['Fried Rice', 'Manchurian', 'Roti', 'Dal']
      },
      thursday: {
        breakfast: ['Paratha', 'Curd', 'Pickle', 'Tea/Coffee'],
        lunch: ['Rice', 'Dal', 'Mixed Veg', 'Roti', 'Salad', 'Papad'],
        snacks: ['Aloo Tikki', 'Tea/Coffee'],
        dinner: ['Rice', 'Kadhi', 'Roti', 'Sabzi', 'Kheer']
      },
      friday: {
        breakfast: ['Dosa', 'Sambar', 'Chutney', 'Tea/Coffee'],
        lunch: ['Rice', 'Dal', 'Chicken/Egg Curry', 'Roti', 'Salad'],
        snacks: ['Spring Roll', 'Tea/Coffee'],
        dinner: ['Biryani', 'Raita', 'Papad']
      },
      saturday: {
        breakfast: ['Puri Bhaji', 'Tea/Coffee', 'Banana'],
        lunch: ['Rice', 'Dal', 'Fish/Egg Curry', 'Roti', 'Salad', 'Curd'],
        snacks: ['Pakora', 'Tea/Coffee'],
        dinner: ['Rice', 'Paneer Butter Masala', 'Roti', 'Dal']
      },
      sunday: {
        breakfast: ['Chole Bhature', 'Tea/Coffee'],
        lunch: ['Special Rice', 'Dal Makhani', 'Roti', 'Sabzi', 'Ice Cream'],
        snacks: ['Burger', 'Tea/Coffee'],
        dinner: ['Rice', 'Chicken/Veg Curry', 'Roti', 'Salad']
      }
    };

    res.json({ menu });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getMenu
};
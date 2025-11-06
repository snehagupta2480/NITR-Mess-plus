const cron = require('node-cron');
const Student = require('../models/Student');

const startCronJobs = () => {
  // Reset tokens on 1st of every month at midnight
  // Cron expression: '0 0 1 * *' = At 00:00 on day-of-month 1
  cron.schedule('0 0 1 * *', async () => {
    try {
      console.log('Running monthly token reset...');
      
      const result = await Student.updateMany(
        {},
        {
          $set: {
            'tokens.breakfast': 15,
            'tokens.lunch': 15,
            'tokens.snacks': 15,
            'tokens.dinner': 15
          }
        }
      );

      console.log(`Token reset complete. ${result.modifiedCount} students updated.`);
    } catch (error) {
      console.error('Error during token reset:', error);
    }
  });

  console.log('Cron jobs initialized');
};

module.exports = { startCronJobs };
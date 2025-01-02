'use strict';

module.exports = {
  // Run every minute
  '* * * * *': async () => {
    strapi.log.info('Cron job executed');
    
    // Perform some test actions
    // Example: log the current time
    strapi.log.info(`Current time: ${new Date().toISOString()}`);
  },
};

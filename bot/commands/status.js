const format = require('date-fns/format');

const {getDaysAddedCollection} = require('../helpers/dbHelpers');

module.exports = {
  name: 'status',
  description: 'Returns the current status of the timer.',
  cooldown: 5,
  execute: async (params) => {
    const {message, dbClient} = params;

    const daysStatus = await getDaysAddedCollection(dbClient);

    message.channel.send(
      `Boys prepare yourselves for the legend's return, current ETA is for ${format(
        daysStatus.currentTime,
        'MM/dd/yyyy'
      )}.`
    );
  },
};

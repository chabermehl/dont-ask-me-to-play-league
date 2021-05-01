const subDays = require('date-fns/subDays');
const format = require('date-fns/format');

const {
  getDaysAddedCollection,
  updateDaysAddedCollection,
} = require('../helpers/dbHelpers');

module.exports = {
  name: 'coorsTime',
  description: 'Removes a day from the timer.',
  execute: async (message, args, dbClient) => {
    const daysAddedCollection = await getDaysAddedCollection(dbClient);

    const updatedDayCount = daysAddedCollection.daysAdded - 1;
    const updatedCurrentTime = subDays(daysAddedCollection.currentTime, 1);

    const filter = {_id: daysAddedCollection._id};
    const updatedCollection = {
      daysAdded: updatedDayCount,
      currentTime: updatedCurrentTime,
    };

    await updateDaysAddedCollection(dbClient, {
      filter,
      document: {$set: {...updatedCollection}},
      options: {},
    });

    message.channel.send(
      `Alright boys Im in, give me until ${format(
        updatedCurrentTime,
        'MM/dd/yyyy'
      )} to get ready`
    );
  },
};

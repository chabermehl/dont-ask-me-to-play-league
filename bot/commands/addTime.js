const addDays = require('date-fns/addDays');
const format = require('date-fns/format');

const {
  getDaysAddedCollection,
  updateDaysAddedCollection,
} = require('../helpers/dbHelpers');

module.exports = {
  name: 'addTime',
  description: 'Adds a day to the timer.',
  cooldown: 5,
  execute: async (message, args, dbClient) => {
    const daysAddedCollection = await getDaysAddedCollection(dbClient);

    const updatedDayCount = daysAddedCollection.daysAdded + 1;
    const updatedCurrentTime = addDays(daysAddedCollection.currentTime, 1);

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
      `The new nearest possible date at which I will consider playing League of Legends (LoL) at is: ${format(
        updatedCurrentTime,
        'MM/dd/yyyy'
      )}`
    );
  },
};

const subDays = require('date-fns/subDays');
const format = require('date-fns/format');

const {
  getDaysAddedCollection,
  updateDaysAddedCollection,
} = require('../helpers/dbHelpers');

module.exports = {
  name: 'cleanClashDub',
  description: 'Removes 7 days from the timer for a clean clash win from the boys',
  cooldown: 5,
  execute: async (params) => {
    const {message, dbClient} = params;

    const daysAddedCollection = await getDaysAddedCollection(dbClient);

    const updatedDayCount = daysAddedCollection.daysAdded - 7;
    const updatedCurrentTime = subDays(daysAddedCollection.currentTime, 7);

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
      `Congrats on the win boys! Im in, give me until ${format(
        updatedCurrentTime,
        'MM/dd/yyyy'
      )} to get ready`
    );
  },
};
const subDays = require('date-fns/subDays');
const format = require('date-fns/format');

const {
  getDaysAddedCollection,
  updateDaysAddedCollection,
} = require('../helpers/dbHelpers');

module.exports = {
  name: '5manDub',
  description: 'Removes a day from the timer for a win from the 5 lads',
  cooldown: 5,
  execute: async (params) => {
    const {message, dbClient} = params;

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
      `The 5 man finally do something? I guess Im in, give me until ${format(
        updatedCurrentTime,
        'MM/dd/yyyy'
      )} to get ready`
    );
  },
};
const getDaysAddedCollection = async (dbClient) => {
  const db = dbClient.db('NeverLostA5Man');
  const collection = db.collection('DaysAddedCount');
  const result = await collection.findOne({});

  return result;
};

const updateDaysAddedCollection = async (dbClient, updateParams) => {
  const {filter, document, options} = updateParams;

  const db = dbClient.db('NeverLostA5Man');
  const collection = db.collection('DaysAddedCount');
  const result = await collection.updateOne(filter, document, options);

  return result;
};

module.exports = {
  getDaysAddedCollection,
  updateDaysAddedCollection,
};

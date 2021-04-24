require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;
const Discord = require('discord.js');

const addDays = require('date-fns/addDays');
const subDays = require('date-fns/subDays');
const format = require('date-fns/format');

const {prodPrefix, devPrefix} = require('./config.json');
const prefix = process.env.BOT_ENV === 'production' ? prodPrefix : devPrefix;

const client = new Discord.Client();

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@neverlosta5man-main.mnjs0.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const dbClient = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

dbClient.connect();

const getDaysAddedCollection = async () => {
  const db = dbClient.db('NeverLostA5Man');
  const collection = db.collection('DaysAddedCount');
  const result = await collection.findOne({});

  return result;
};

const updateDaysAddedCollection = async (updateParams) => {
  const {filter, document, options} = updateParams;

  const db = dbClient.db('NeverLostA5Man');
  const collection = db.collection('DaysAddedCount');
  const result = await collection.updateOne(filter, document, options);

  return result;
};

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', async (msg) => {
  if (msg.content === `${prefix}addTime`) {
    const daysAddedCollection = await getDaysAddedCollection();

    const updatedDayCount = daysAddedCollection.daysAdded + 1;
    const updatedCurrentTime = addDays(daysAddedCollection.currentTime, 1);

    const filter = {_id: daysAddedCollection._id};
    const updatedCollection = {
      daysAdded: updatedDayCount,
      currentTime: updatedCurrentTime,
    };

    await updateDaysAddedCollection({
      filter,
      document: {$set: {...updatedCollection}},
      options: {},
    });

    msg.channel.send(
      `The nearest possible date at which I will consider playing League of Legends (LoL) at is: ${format(
        updatedCurrentTime,
        'MM/dd/yyyy'
      )}`
    );
  } else if (msg.content === `${prefix}coorsTime`) {
    const daysAddedCollection = await getDaysAddedCollection();

    const updatedDayCount = daysAddedCollection.daysAdded - 1;
    const updatedCurrentTime = subDays(daysAddedCollection.currentTime, 1);

    const filter = {_id: daysAddedCollection._id};
    const updatedCollection = {
      daysAdded: updatedDayCount,
      currentTime: updatedCurrentTime,
    };

    await updateDaysAddedCollection({
      filter,
      document: {$set: {...updatedCollection}},
      options: {},
    });

    msg.channel.send(
      `Alright boys Im in, give me until ${format(
        updatedCurrentTime,
        'MM/dd/yyyy'
      )} to get ready`
    );
  }
});

client.login(process.env.DISCORD_CLIENT_TOKEN);

import {Handler} from '@netlify/functions';
declare const require: any;
declare const process: any;
const MongoClient = require('mongodb').MongoClient;

const handler: Handler = async (event, context) => {
  const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@neverlosta5man-main.mnjs0.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  await client.connect();

  const getDaysAddedCollection = async () => {
    const db = client.db('NeverLostA5Man');
    const collection = db.collection('DaysAddedCount');
    const result = await collection.findOne({});

    return result;
  };

  const {currentTime} = await getDaysAddedCollection();

  return {
    statusCode: 200,
    'Access-Control-Allow-Origin': '*',
    body: JSON.stringify({currentTime}),
  };
};

export {handler};

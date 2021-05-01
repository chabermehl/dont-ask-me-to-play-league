require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;
const Discord = require('discord.js');
const fs = require('fs');

const {prodPrefix, devPrefix} = require('./config.json');
const prefix = process.env.BOT_ENV === 'production' ? prodPrefix : devPrefix;

const client = new Discord.Client();
client.commands = new Discord.Collection();
client.cooldowns = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter((file) => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@neverlosta5man-main.mnjs0.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const dbClient = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

dbClient.connect();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const commandString = args.shift();

  if (!client.commands.has(commandString)) return;

  const {commands, cooldowns} = client;

  const command = commands.get(commandString);

  if (!cooldowns.has(command.name)) {
    cooldowns.set(command.name, new Discord.Collection());
  }

  const now = Date.now();
  const timestamps = cooldowns.get(command.name);
  const cooldownAmount = command.cooldown * 1000;

  if (timestamps.has(message.author.id)) {
    const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

    if (now < expirationTime) {
      const timeLeft = (expirationTime - now) / 1000;
      return message.reply(
        `Please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${
          command.name
        }\` command.`
      );
    }
  }

  timestamps.set(message.author.id, now);
  setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

  try {
    command.execute(message, args, dbClient, {prefix});
  } catch (error) {
    console.error(error);
    message.reply('There was an error executing the command.');
  }
});

client.login(process.env.DISCORD_CLIENT_TOKEN);

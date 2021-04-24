require('dotenv').config();
const {prodPrefix, devPrefix} = require('./config.json');
const prefix = process.env.BOT_ENV === 'production' ? prodPrefix : devPrefix;

const Discord = require('discord.js');
const client = new Discord.Client();

let daysAdded = 0;

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', (msg) => {
  if (msg.content === `${prefix}addTime`) {
    const initialTimeFrame = new Date(2021, 9, 20);
    daysAdded++;
    const addDays = new Date(
      initialTimeFrame.setHours(initialTimeFrame.getHours() + daysAdded * 24)
    );
    msg.channel.send(
      `The nearest possible date at which I will consider playing League of Legends (LoL) at is: \n\n${addDays.toString()}`
    );
  } else if (msg.content === `${prefix}coorsTime`) {
    const initialTimeFrame = new Date(2021, 9, 20);
    daysAdded--;
    const rmvDays = new Date(
      initialTimeFrame.setHours(initialTimeFrame.getHours() - daysAdded * 24)
    );
    msg.channel.send(
      `Alright boys Im in, give me until to get ready ${rmvDays.toString()}`
    );
  }
});

client.login(process.env.DISCORD_CLIENT_TOKEN);

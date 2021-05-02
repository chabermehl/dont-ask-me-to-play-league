module.exports = {
  name: 'ptsd',
  description: 'Replies with the meme of why Charles no longer plays league.',
  cooldown: 5,
  execute: (params) => {
    const {message} = params;

    message.channel.send({
      files: [
        'https://cdn.discordapp.com/attachments/192773988588584961/838269556555382804/why_charles_quit.png',
      ],
    });
  },
};

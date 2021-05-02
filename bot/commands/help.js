module.exports = {
  name: 'help',
  description: 'Lists all commands.',
  cooldown: 5,
  execute: (params) => {
    const {message, args, prefix} = params;
    const {commands} = message.client;

    const data = [];

    if (!args.length) {
      data.push('Here is a list off all the possible commands:\n');
      data.push(commands.map((c) => `\`${c.name}\``).join('\n'));
      data.push(
        `\nYou can send \`${prefix}help [command name]\` to get more information.`
      );

      message.channel.send(data, {split: true});
      return;
    }

    const helpName = args[0];
    const helpCommand = commands.get(helpName);

    if (!helpCommand) {
      return message.channel.send("That's not a valid command.");
    }

    Object.keys(helpCommand)
      .filter((p) => p !== 'execute')
      .map((p) => data.push(`**${p.toUpperCase()}:** ${helpCommand[p]}`));

    message.channel.send(data, {split: true});
  },
};

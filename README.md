# This bot tracks how long until I will consider playing league again

*SIDE NOTE:* Discord.js > Discord.py

## Development

### Configuration

`.env` 

```
DISCORD_CLIENT_TOKEN=<your test token here>
BOT_ENV=development
DB_PASS=<db pass goes here>
DB_NAME=<db name goes here>
```
### Calling the bot in development

Use `!` as the prefix.

### Running in dev

`npm run bot-dev`

## Production

`.env`

```
DISCORD_CLIENT_TOKEN=<prod token here>
BOT_ENV=production
DB_PASS=<db pass goes here>
DB_NAME=<db name goes here>
```

### Calling the bot in production

Use `?` as the prefix.
### Running in prod

`npm run bot-prod`

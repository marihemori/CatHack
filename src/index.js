import { config } from 'dotenv';
import Discord from 'discord.js';

config();
const { TOKEN_DISCORD } = process.env
const client = new Discord.Client();

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
    console.log(`Exit ${client.user.tag}: ctrl + c`);
});

client.on('message', ( msg ) => {
    const { content } = msg
    const commands = {
    "!invite": 'https://discord.gg/nHf4AcU',
    "!gitrep": 'https://github.com/marianamorais/CatHack',
};
    commands[content] && msg.reply(commands[content]);
});

client.login(TOKEN_DISCORD)

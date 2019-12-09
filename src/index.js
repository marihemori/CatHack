import { config } from 'dotenv';
import { Client, RichEmbed } from 'discord.js';

config();
const { TOKEN_DISCORD } = process.env
const client = new Client();

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

client.on('message', (message) => {
    if(message.content === 'embed') {
    const embed = new RichEmbed()

        .setTitle('A slick little embed')
        .setColor(0xFF0000)
        .setDescription('Hello, this is a slick embed!');
      message.channel.send(embed);
    }
});
  
client.login(TOKEN_DISCORD)

require('dotenv').config(); /* Inicia o dotenv */

const Discord = require('discord.js');
const prefix = process.env.PREFIX,
    token = process.env.DISCORD_TOKEN;

const client = new Discord.Client();

client.once('ready', () => {
    console.log('Meow!');
});


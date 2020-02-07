const { config } = require("dotenv");

/** Cheque se a versão do node.js é a 8.0.0 ou acima */
if (process.version.slice(1).split('.')[0] < 8) throw new Error('Node 8.0.0 or higher is required. Update Node on your system.');

const Discord = require('discord.js') /* Carrega o discord.js */

/** Carrega outros modulos uteis */
const { readdirSync } = require('fs')
const Enmap = require('enmap')

const client = new Discord.Client() /* Instancia o Client do Discord. */

/** Instancia de uma nova collection de comandos. */
client.commands = new Enmap()

config ({
    path: __dirname + "/.env"
});

client.on ("ready", () => {
    console.log(`Eu estou online! Meu nome é ${client.user.username}`);

    client.user.setPresence ({
        status: "online",
        game: {
            name: "Eu sendo desenvolvido",
            type: "WATCHING"
        }
    });
});

client.login(process.env.TOKEN);
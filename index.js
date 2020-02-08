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

["command"].forEach(handler => {
  require(`./handler/${handler}`)(client);
});

client.on ("ready", () => {
    console.log(`Eu estou online! Meu nome é ${client.user.username}`);

    client.user.setPresence ({
        status: "online",
        game: {
            name: "Eu estou sendo desenvolvido!",
            type: "WATCHING"
        }
    });
});

client.on("message", async message => {
  const prefix = "!";

  if (message.author.bot) return;
  if (!message.guild) return;
  if (!message.content.startsWith(prefix)) return;

  // If message.member is uncached, cache it.
  if (!message.member) message.member = await message.guild.fetchMember(message);

  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const cmd = args.shift().toLowerCase();
  
  if (cmd.length === 0) return;
  
  // Get the command
  let command = client.commands.get(cmd);
  // If none is found, try to find it by alias
  if (!command) command = client.commands.get(client.aliases.get(cmd));

  // If a command is finally found, run the command
  if (command) 
      command.run(client, message, args);
});

client.login(process.env.AUTH_TOKEN);
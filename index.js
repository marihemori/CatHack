if (process.version.slice(1).split('.')[0] < 8) throw new Error('Node 8.0.0 or higher is required. Update Node on your system.')

require('dotenv').config() 

const Discord = require('discord.js') 

const { config } = require("dotenv");
const { readdirSync } = require('fs')
const Enmap = require('enmap')
const client = new Discord.Client() 
const ascii = require("ascii-table");


client.commands = new Enmap()
client.startTime = Date.now()

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
    const command = client.commands.get(cmd);
    // If none is found, try to find it by alias
  
    // If a command is finally found, run the command
    if (command) 
        command.run(client, message, args);
    });
    
client.login(process.env.AUTH_TOKEN)
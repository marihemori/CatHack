const { RichEmbed } = require("discord.js");
const { readdirSync } = require("fs");

module.exports = {
  ame: "log",
    category: "moderation",
    description: "Logs",

  run: async (client, oldMessage, newMessage) => {

      if (oldMessage.content === newMessage.content) {
        return;
      }

      const logEmbed = new RichEmbed()
      .setAuthor(oldMessage.author.tag, oldMessage.author.avatarURL)
      .setThumbnail(oldMessage.author.avatarURL)
      .setColor("RANDOW")
      .setDescription("Uma messagem foi editada")
      .addField("Antes", oldMessage.content, true)
      .addField("Depois", newMessage.content, true)
      .setTimestamp()
      .setFooter("Embed")

      const logginChannel = newMessage.guild.channels.find(ch => ch.name === "logs")
      if(!logginChannel) return;

      logginChannel.send(logEmbed);

      
    }
  }

const { RichEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const { getMember, formatDate } = require("../../functions.js");

module.exports = {
  name: "botinfo",
  aliases: ["bot", "info"],
  description: "Retorna informações do bot",
  usage: "[username | id | mention]",

  run: (client, message, args) => {
    const inline = true;
    const boticon = client.user.displayAvatarURL;
    const usersize = client.users.size;
    const chansize = client.channels.size;
    const servsize = client.guilds.size;
    const status = {
      online: "`🟢` Online",
      offline: "`⚫` Offline"
    };

    const botembed = new RichEmbed()
      .setColor(
        client.displayHexColor === "#000000"
          ? "#ffffff"
          : client.displayHexColor
      )
      .setThumbnail(boticon)

      .setTitle(`🐱 Minhas informações`)
      .addField("**Username**", `${client.user.tag}`, inline)
      .addField("**ID**", client.user.id, inline)
      .addField("**Nome**", `${client.user.username}`, inline, true)
      .addField("**Criadora**", "<@104367193482862592>", inline, true)
      .addField("**Servidores**", `🛡 ${servsize}`, inline)
      .addField("**Canais**", `📁 ${chansize}`, inline)
      .addField("**Usuários**", `${usersize}`, inline)
      .addField("**Biblioteca**", "Discord.js", inline, true)
      .addField("**Criado em**", client.user.createdAt, true)
      .setFooter(
        `informações: ${client.user.username}. Desenvolvido por: Mariana`
      )
      .setTimestamp();

    if (client.user.presence.status)
      botembed.addField(
        "**Status**",
        `${status[client.user.presence.status]}`,
        inline,
        true
      );

    message.channel.send(botembed);
  }
};

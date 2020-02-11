const { RichEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const { getMember, formatDate } = require("../../functions.js");

module.exports = {
  name: "serverinfo",
  aliases: ["server", "info"],
  description: "Retorna informações do servidor",

  run: (client, message, args) => {
   function checkDays(date) {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / 86400000);
    return days + (days == 1 ? " dia" : " dias") + " atras";
 };

 const verifLevels = ["Nenhuma", "Baixa", "Média", "(╯°□°）╯︵  ┻━┻", "┻━┻ミヽ(ಠ益ಠ)ノ彡┻━┻"];

 const region = {
  "brazil": ":flag_br: Brazil",
 };

    const serverembed = new RichEmbed()
        .setColor("RANDOM")    
        .setAuthor(`🔍 Informações do servidor`)
        .addField("**Nome**", message.guild.name, true)
        .addField("**ID**", message.guild.id, true)
        .addField("**Dono(a)**", `${message.guild.owner.user.username}#${message.guild.owner.user.discriminator}`)
        .addField("**Região**", region[message.guild.region], true)
        .addField("**Humanos | Bots**", `${message.guild.members.filter(member => !member.user.bot).size} | ${message.guild.members.filter(member => member.user.bot).size}`)
        .addField("**Verificação de segurança**", verifLevels[message.guild.verificationLevel], true)
        .addField("**Canais**", message.guild.channels.size, true)
        .addField("**Cargos**", message.guild.roles.size, true)
        .addField("**Data da criação**", `${message.channel.guild.createdAt.toUTCString().substr(0, 16)} (${checkDays(message.channel.guild.createdAt)})`, true)
        .setThumbnail(message.guild.iconURL)
        .setFooter("2020 © CatHack")

    message.channel.send(serverembed);
  }
};

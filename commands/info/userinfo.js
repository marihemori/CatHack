const { RichEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const { getMember, formatDate } = require("../../functions.js");

const moment = require('moment')
moment.locale('pt-br')

module.exports = {
    name: "userinfo",
    description: "Retorna informações do usuário",
    usage: "[username | id | mention]",

    run: (client, message, args) => {
        const member = getMember(message, args.join(" "));

        //Member variaveis
        const membercreated = formatDate(member.user.createdAt);
        const memberjoined = formatDate(member.joinedAt);
        const inline = true

        const status = {
            online: "Online",
            idle: "Ausente",
            dnd: "Não pertubar",
            offline: "<Offline/Invisivel"
          }
   
        // Member variables

        const embed = new RichEmbed()
            .setThumbnail(member.user.displayAvatarURL)
            .setColor(member.displayHexColor === '#000000' ? '#ffffff' : member.displayHexColor)
	        .setTitle(`:cat: ${member.displayName}`)
            .addField("**Username**", `${member.user.tag}`, inline)
            .addField("**ID**", member.user.id, inline)
            
            .addField("**Criou em**", membercreated)
            .addField("**Entrou em:**", memberjoined)
            .addField("**Cargos**", `${member.roles.filter(r => r.id !== message.guild.id).map(roles => `\`${roles.name}\``).join(" **|** ") || "Sem cargos"}`, true)
            .addField("Online a", moment().to(client.startTime, true))

            .setFooter('2020 © CatHack')
            .setTimestamp()

            if (member.user.presence.status)
            embed.addField("**Status**", `${status[member.user.presence.status]}`, inline, true)

        if (member.user.presence.game) 
            embed.addField("**Jogando**", `${member.user.presence.game ? `🎮 ${member.user.presence.game.name}` : "Nada a jogar"}`,inline, true)

        message.channel.send(embed);
    }
}


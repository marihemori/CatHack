const { RichEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const { getMember, formatDate } = require("../../functions.js");

module.exports = {
    name: "userinfo",
    aliases: ["user", "info"],
    description: "Retorna informações do usuário",
    usage: "[username | id | mention]",

    run: (client, message, args) => {
        const member = getMember(message, args.join(" "));
        const inline = true

        //Member variaveis
        const roles = member.roles
            .filter(r => r.id !== message.guild.id)
            .map(r => r).join(", ") || 'none';

        // User variaveis
        const created = formatDate(member.user.createdAt);
        const joined = formatDate(member.user.joinedAt);

        const status = {
            online: "`🟢` Online",
            idle: "`🟠` Ausente",
            dnd: "`🔴` Não pertubar",
            offline: "`⚫` Offline"
        }

        const embed = new RichEmbed()
            .setThumbnail(member.user.displayAvatarURL)
            .setColor(member.displayHexColor === '#000000' ? '#ffffff' : member.displayHexColor)
	        .setTitle(`🐱 ${member.displayName}`)
            .addField("**Username**", `${member.user.tag}`, inline)
            .addField("**ID**", member.user.id, inline)
            
            .addField("**Conta criada em**", created)
            .addField("**Entrou no servidor em:**", joined)
            .addField("**Cargos**", `${member.roles.filter(r => r.id !== message.guild.id).map(roles => `\`${roles.name}\``).join(" **|** ") || "Sem cargos"}`, true)

            .setFooter('2020 © CatHack')
            .setTimestamp()

            if (member.user.presence.status)
            embed.addField("**Status**", `${status[member.user.presence.status]}`, inline, true)

        if (member.user.presence.game) 
            embed.addField("**Jogando**", `${member.user.presence.game ? `🎮 ${member.user.presence.game.name}` : "Nada"}`,inline, true)

        message.channel.send(embed);
    }
}


const { RichEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const { getMember, formatDate } = require("../../functions.js");

module.exports = {
    name: "userinfo",
    description: "Retorna informações do usuário",
    usage: "[username | id | mention]",

    run: (client, message, args) => {
        const member = getMember(message, args.join(" "));
        const inline = true
        const status = {
            online: "<Online",
            idle: "Ausente",
            dnd: "Não pertubar",
            offline: "<Offline/Invisivel"
          }
        const date = member.user.createdAt

        // Member variables
        const memberJoined = formatDate(member.joinedAt);
        const roles = member.roles
            .filter(r => r.id !== message.guild.id)
            .map(r => r).join(", ") || 'none';


            // User variables

        const embed = new RichEmbed()
            .setThumbnail(member.user.displayAvatarURL)
            .setColor(member.displayHexColor === '#000000' ? '#ffffff' : member.displayHexColor)
	        .setTitle(`:cat: ${member.displayName}`)
            // .setDescription('**Informações do usuário**')
            .addField("**Username**", `${member.user.tag}`, inline)
            .addField("**ID**", member.user.id, inline)
            
            .addField("**Criou em**", member.user.createdAt)
            .addField("Criou em", formatDate('DD/MM/YYYY, às HH:mm:ss', date))
            .addField("**Entrou em:**", message.member.joinedAt)
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


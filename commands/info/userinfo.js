const { RichEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const { getMember, formatDate } = require("../../functions.js");

module.exports = {
    name: "userinfo",
    description: "Retorna informações do usuário",
    usage: "[username | id | mention]",

    run: (client, message, args) => {
        const member = getMember(message, args.join(" "));

        // Member variables
        const joined = formatDate(member.joinedAt);
        const roles = member.roles
            .filter(r => r.id !== message.guild.id)
            .map(r => r).join(", ") || 'none';

        // User variables
        const created = formatDate(member.user.createdAt);

        const embed = new RichEmbed()
            .setTitle(`${member.displayName}`)
            .setDescription('Informações do usuário:')

            .setFooter('2020 © CatHack')
            .setThumbnail(member.user.displayAvatarURL)
            .setColor(member.displayHexColor === '#000000' ? '#ffffff' : member.displayHexColor)

            .addField(`**Informações**`, stripIndents`**> Nome:** ${member.displayName}
            **> Entrou em:** ${joined}
            **> Cargos:** ${roles}`, true)

            .addField('Informações do usuário:', stripIndents`**> ID:** ${member.user.id}
            **> Username**: ${member.user.username}
            **> Tag**: ${member.user.tag}
            **> Criou em**: ${created}`, true)
            
            .setTimestamp()

        if (member.user.presence.game) 
            embed.addField('Atualmente jogando:', stripIndents`**> Nome:** ${member.user.presence.game.name}`);

        message.channel.send(embed);
    }
}
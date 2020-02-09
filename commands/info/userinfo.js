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
            .setColor(member.displayHexColor === '#000000' ? '#ffffff' : member.displayHexColor)
	        .setAuthor(member.displayName, member.user.displayAvatarURL)
	.setDescription('Some description here')
	.setThumbnail('https://i.imgur.com/wSTFkRM.png')
	.addField('Regular field title', 'Some value here')
	.addBlankField()
	.addField('Inline field title', 'Some value here', true)
	.addField('Inline field title', 'Some value here', true)
	.addField('Inline field title', 'Some value here', true)
	.setImage('https://i.imgur.com/wSTFkRM.png')
	.setTimestamp()
	.setFooter('Some footer text here', 'https://i.imgur.com/wSTFkRM.png');
            // .setColor(member.displayHexColor === '#000000' ? '#ffffff' : member.displayHexColor)
            // .setTitle(`${member.displayName}`)
            // .setDescription('Informações do usuário:')
            
            // .setFooter('2020 © CatHack')
            // .setThumbnail(member.user.displayAvatarURL)

            // .addField('**Username**:',`${member.user.username}
            // .addBlankField()
            // ** Entrou em:** ${joined}`, true)
           
            // .addField('**ID do usuário**:',`${member.user.id}
            // ** Criou em**: ${created}`, true)

            // .addField('**Tag**:',`${member.user.tag}
            // ** Username**: ${member.user.username}
            // ** Cargos:** ${roles}`, true)

            
            // .setTimestamp()

        if (member.user.presence.game) 
            embed.addField('Atualmente jogando:', stripIndents`**> Nome:** ${member.user.presence.game.name}`);

        message.channel.send(embed);
    }
}
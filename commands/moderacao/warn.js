const { RichEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");

module.exports = {
    name: "warn",
    category: "moderation",
    description: "Reporta um membro",
    usage: "<mention, id>",

    run: async (client, message, args) => {

        const embedColor = '#ffffff'
        const warnedColor = '#ff0000'

        if (!message.member.hasPermission("MANAGE_MEMBERS"))
        return message.reply ("Você não pode usar esse comando!");
      
        const missingPermissionsEmbed = new RichEmbed() // Creates the embed thats sent if the user is missing permissions
        .setColor(embedColor)
        .setAuthor(message.author.username, message.author.avatarURL)
        .setTitle('Permissões insuficientes')
        .setDescription('Você precisa de permissão para usar esse comando!')
        .setTimestamp();

        const missingArgsEmbed = new RichEmbed() // Creates the embed thats sent if the command isnt run right
        .setColor(embedColor)
        .setAuthor(message.author.username, message.author.avatarURL)
        .setTitle('Faltando argumentos!')
        .setDescription('Como usar: `warn [@User] [Motivo]')
        .setTimestamp();

        if(!message.member.hasPermission) return message.channel.send(missingPermissionsEmbed); 
        let mentioned = message.mentions.users.first(); 
        if(!mentioned) return message.channel.send(missingArgsEmbed); 
        let reason = args.slice(1).join(' ') 
        if(!reason) return message.channel.send(missingArgsEmbed);

        const warningEmbed = new RichEmbed() // Creates the embed that's DM'ed to the user when their warned!
        .setColor(warnedColor)
        .setAuthor(message.author.username, message.author.avatarURL)
        .setTitle(`Você foi reportado em ${message.guild.name}`)
        .addField('Reportado por', message.author.tag)
        .addField('Motivo', reason)
        .setTimestamp();

        mentioned.send(warningEmbed); // DM o membro

        var warnSuccessfulEmbed = new RichEmbed() // Creates the embed thats returned to the person warning if its sent.
        .setColor(embedColor)
        .setTitle('Usuário reportado com sucesso! `😺`');

        message.channel.send(warnSuccessfulEmbed); // Sends the warn successful embed
        message.delete(); // Deletes the command


    }
}


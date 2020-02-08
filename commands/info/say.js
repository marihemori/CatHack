module.exports = {
  name: "say",
  category: "moderação",
  description: "Faz o bot enviar tal mensagem.",
  usage: "say",

  run: (client, message, args) => {
    message.delete();

    if (!message.member.hasPermission(["MANAGE_MESSAGES", "ADMINISTRATOR"]))
      return message.channel
        .send("Você não pode usar esse comando!")
        .then(m => m.delete(5000));

    if (args.length < 0) return message.reply("Meow?");

    const roleColor = message.guild.me.highestRole.hexColor;

    if (args[0].toLowerCase() === "embed") {
      const embed = new RichEmbed()
        .setDescription(args.slice(1).join(" "))
        .setColor(roleColor === "#000000" ? "#ffffff" : roleColorv);

      message.channel.send(embed);
    } else {
      message.channel.send(args.join(" "));
    }
  }
};

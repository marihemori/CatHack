/**
 * O Comando Help envia uma mensagem de ajuda.
 * Cotendo comandos e outras informações.
 */

 module.exports = {
  run: (client, message, args) => {
    /** Objeto embed que irá ser enviado. */
    let embed = {
      color: 0xB1103C,
      title: 'Lista de Comandos Project: A',
      url: 'https://github.com/Liga-dos-Programadores/Project-A',
      description: 'Todos os comandos disponíveis',
      footer: {
        text: 'Não se esqueça de checar nosso código-fonte ;) ® 2018, A Liga dos Programadores.'
      },
      fields: []
    }

    /** Laço de repetição em todos os comandos
     * A cada comando é adicionado as informações em um object na array fields[]
     */
    client.commands.forEach(command => {
      if (command.alias) return
      embed.fields.push(
        {
          name: `**${process.env.PREFIX}${command.help.name}**`,
          value: `**Descrição**: ${command.help.description}\n**Como Usar**: ${process.env.PREFIX}${command.help.usage}`
        }
      )
    })

    /** Então envia a mensagem embed para o usuario. */
    message.author.send({ embed: embed })
      .then(() => message.react('👌'))
      .catch(() => message.reply('Desculpe, mas eu não tenho permissões para enviar mensagens por DM para você!'))
  },

  conf: {},

  help: {
    name: 'help',
    aliases: ['ajuda'],
    category: 'Help',
    description: 'Mostra todos os comandos disponíveis do bot.',
    usage: 'help'
  }
}

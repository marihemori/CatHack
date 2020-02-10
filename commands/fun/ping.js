module.exports = {
	name: 'ping',
	emoji: ':ping_pong:',
	description: 'Ping!',
	execute(message) {
		message.channel.send('Pong.');
	},
};

// module.exports = {
//     name: "ping",
//     category: "fun",
//     description: "PONG! Mostra a api e a latência do bot",
//     usage: "!ping",
//     acessablebly: "Members",
//     aliases: ["latencia"],
    
//     run: async (client, message, args) => {

//         const msg = await message.channel.send(`🏓 Pinging....`);

//         msg.edit(`🏓 Pong!
//         A latência da API é: ${Math.round(client.ping)}ms`);
//     }
// }
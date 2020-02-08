module.exports = {
    name: "ping",
    category: "fun",
    description: "Returns latency and API ping",
    run: async (client, message, args) => {
        const msg = await message.channel.send(`🏓 Pinging....`);

        msg.edit(`🏓 Pong!
        A latência é ${Math.floor(msg.createdTimestap - message.createdTimestap)}ms
        A latência da API é: ${Math.round(client.ping)}ms`);
    }
}
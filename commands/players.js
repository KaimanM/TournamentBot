var data = require('./../data.js');

exports.run = (client, message, args) => {
    // message.channel.send("pong!").catch(console.error);
    message.channel.send(`Current Players: ${data.players}`);
}

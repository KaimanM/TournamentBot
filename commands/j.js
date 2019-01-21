//handles joining of other users, mainly used for test purposes.

var data = require('./../data.js');


exports.run = (client, message, args) => {

    var player = message.mentions.users.first();

    if (data.players.indexOf(player.id) === -1) {
      data.players.push(player.id);
      message.channel.send(`${client.users.get(player.id)} joined the tournament!`).catch(console.error);
    } else {
      message.channel.send(`${client.users.get(player.id)} is already in the tournament...`).catch(console.error);
    }
}

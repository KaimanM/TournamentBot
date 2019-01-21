//handles joining of other users, mainly used for test purposes.

var data = require('./../data.js');


exports.run = (client, message, args) => {

    var player = message.mentions.users.first();

    if (data.players.indexOf(player) === -1) {
      data.players.push(player);
      message.channel.send(`${player} joined the tournament!`).catch(console.error);
    } else {
      message.channel.send(`${player} is already in the tournament...`).catch(console.error);
    }
}

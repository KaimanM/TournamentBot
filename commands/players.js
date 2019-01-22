// Calling Global Data
var data = require('./../data.js');

// Prints playerlist
exports.run = (client, message, args) => {

    var users = [];

    for (i = 0; i < data.players.length; i++) {
      users.push(client.users.get(data.players[i]));
    }

    message.channel.send(`Current Players: ${users}`);
}

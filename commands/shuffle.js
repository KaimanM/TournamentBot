var data = require('./../data.js');

function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

exports.run = (client, message, args) => {

    var users = [];

    shuffle(data.players)

    for (i = 0; i < data.players.length; i++) {
      users.push(client.users.get(data.players[i]));
    }

    // message.channel.send(`Current Players: ${data.players}`);
    message.channel.send(`Player shuffled: ${users}`);
}

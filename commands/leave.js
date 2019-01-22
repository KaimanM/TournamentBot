var data = require('./../data.js');

exports.run = (client, message, args) => {
  // message.channel.send("pong!").catch(console.error);
  var index = data.players.indexOf(message.author.id);
  if (index > -1) {
    data.players.splice(index, 1);
    message.channel.send(`${message.author} left the tournament!`).catch(console.error);
  } else {
    message.channel.send(`${message.author} was not in the tournament`).catch(console.error);
  }

}

// module.exports = { test: players };
// module.exports.players = [];

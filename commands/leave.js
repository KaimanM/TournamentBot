// Calling Global Data
var data = require('./../data.js');

// Removes the player from the tournament if they're currently in the playerlist.
exports.run = (client, message, args) => {
  var index = data.players.indexOf(message.author.id);
  if (index > -1) {
    data.players.splice(index, 1);
    message.channel.send(`${message.author} left the tournament!`).catch(console.error);
  } else {
    message.channel.send(`${message.author} was not in the tournament`).catch(console.error);
  }

}

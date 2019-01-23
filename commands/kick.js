// Calling Global Data
var data = require('./../data.js');

// Handles kicking players out of the tournament.
exports.run = (client, message, args) => {


  var player = message.mentions.users.first();


  if (player != null) { // Checks if there has been a mention of a user

    var index = data.players.indexOf(player.id);

    if (data.readyCheck == false) { // checks if there is a tournament in progress
      if (index === -1) {
        message.channel.send(`${client.users.get(player.id)} was not in the tourament!`).catch(console.error);
      } else {
        data.players.splice(index, 1);
        message.channel.send(`${client.users.get(player.id)} has been removed from the tourament!`).catch(console.error);
      }
    } else {
      message.channel.send(`Cannot kick players when a tournament is in progress.`).catch(console.error);
    }

  } else {
    message.channel.send(`Please mention a user to kick from the tournament`);
  }
}

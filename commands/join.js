// handles self joining.
var data = require('./../data.js');

// adds the current player to the playerlist
exports.run = (client, message, args) => {

  if (data.readyCheck == false) { // Stops users joining tournaments in progress

    if (data.players.indexOf(message.author.id) === -1) {
      data.players.push(message.author.id);
      message.channel.send(`${message.author} joined the tournament!`).catch(console.error);
    } else {
      message.channel.send(`${message.author} is already in the tournament...`).catch(console.error);
    }
  } else {
    message.channel.send(`Players cannot join when tournament ready check has been called.`)
  }


}

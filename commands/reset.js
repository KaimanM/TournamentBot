// Calling Global Data
var data = require('./../data.js');

// Resets all data to their initial values.
exports.run = (client, message, args) => {

  data.players = ["88613376309096448", "533314354196774922"];
  data.winners = [];
  data.losers = [];
  data.readyCheck = false;
  data.roundNo = 0;

  message.channel.send(`Tournament Reset.`);
}

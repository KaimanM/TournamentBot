// Calling Global Data
var data = require('./../data.js');

// Starts the tourament setting the round to 1.
exports.run = (client, message, args) => {


    if (data.readyCheck === true) {
      data.roundNo = 1;
      message.channel.send(`Round ${data.roundNo} has begun.`);
    } else {
      message.channel.send(`Tournament hasn't passed ready check, use ?ready to initiate tournament.`);
    }


}

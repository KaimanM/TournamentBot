var data = require('./../data.js');

function isEven(num) {
    if (num % 2 === 0) {
        return true;
    } else {
        return false;
    }
}

exports.run = (client, message, args) => {
    // message.channel.send("pong!").catch(console.error);
    // message.channel.send(`Current Players: ${data.players}`);

    if (data.players.length >= 2) {
      // let winnerIndex = data.players.indexOf(message.author);
      let winnerIndex = data.players.indexOf(message.mentions.members.first());

      if (isEven(winnerIndex)) {
        data.winners.push(data.players[winnerIndex]);
        data.losers.push(data.players[winnerIndex+1]);
        data.players.splice(winnerIndex, 2);
        message.channel.send(`this is being executed`);
      } else {
        data.winners.push(data.players[winnerIndex]);
        data.losers.push(data.players[winnerIndex-1]);
        data.players.splice(winnerIndex-1, 2);
      }

      if (data.players.length === 0) {
        data.players = data.winners;
        data.winners.splice(0, data.winners.length);
        message.channel.send(`Round is over`);
      } else {
        message.channel.send(`${data.players.length/2} Matches remain this round`);
      }


    } else {
      message.channel.send(`No players in tournament`);
    }
}

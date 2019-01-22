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

  if (data.roundNo != 0) {
    let winnerMember = message.mentions.members.first();
    // && (data.players.indexOf(message.author.id) != -1)
    // message.channel.send(`Test: ${winnerMember}`);

    if (winnerMember != null) {
      handleWin(winnerMember, message, client);
    } else if (winnerMember == null && (data.players.indexOf(message.author.id) != -1)) {
      handleWin(message.author, message, client);
    }
  } else {
    message.channel.send(`Tournament not started, use ?start to initialise tournament.`);
  }



}

function handleWin(winnerMember, message, client) {
  if (data.players.length >= 2) {
    // let winnerIndex = data.players.indexOf(message.author);
    // let winnerMember = message.mentions.members.first();
    let winnerIndex = data.players.indexOf(winnerMember.id);

    if (isEven(winnerIndex)) {
      data.winners.push(data.players[winnerIndex]);
      data.losers.push(data.players[winnerIndex + 1]);
      data.players.splice(winnerIndex, 2);
      message.channel.send(`winners length: ${data.winners.length}`);
    } else {
      data.winners.push(data.players[winnerIndex]);
      data.losers.push(data.players[winnerIndex - 1]);
      data.players.splice(winnerIndex - 1, 2);
    }

    message.channel.send(`winners length: ${data.winners.length}`);
    if (data.players.length == 0) {
      data.players = data.winners.slice();
      data.winners.splice(0, data.winners.length);

      var remainingRounds = data.players.length/2;

      if (remainingRounds == 0.5) {
        remainingRounds = 0;
      }

      message.channel.send(`Round is over. ${remainingRounds} Rounds remain.`);
      // message.channel.send(`winners length: ${data.winners.length}`);
      // message.channel.send(`players length: ${data.players.length}`);

      if (data.players.length == 1) {
        message.channel.send(`${client.users.get(data.players[0])} is the winner!`);
        data.players.readyCheck = false;
        data.players.roundNo = 0;
      }
    } else {
      message.channel.send(`${data.players.length/2} Matches remain this round`);
    }


  } else {
    message.channel.send(`Not enough players in tournament`);
  }
}

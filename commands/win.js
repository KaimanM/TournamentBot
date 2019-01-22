// Calling Global Data
var data = require('./../data.js');

// Function to check if a given argument is even.
function isEven(num) {
  if (num % 2 === 0) {
    return true;
  } else {
    return false;
  }
}

exports.run = (client, message, args) => {

  // Checks if the rounds have been started.
  if (data.roundNo != 0) {

    // Winner member is set as the first mentioned user, if there is none, it remains null.
    let winnerMember = message.mentions.members.first();

    if (winnerMember != null) { // Calls the winning function a mentioned member exists
      if (data.players.indexOf(winnerMember.id) == -1) { // Checks if the member is in the tournament
        message.channel.send(`${winnerMember} is not in the tournament.`);
      } else { // Calls win handler with the winning member if the member exists and is in the tournament
        handleWin(winnerMember, message, client);
      }
    } else if (winnerMember == null && (data.players.indexOf(message.author.id) != -1)) {
      // If no member has been mentioned, checks if the person who called the command is in the tournament and can win
      handleWin(message.author, message, client);
    } else { // Called when the person has not stated a winner and is not in the tournament.
      message.channel.send(`${message.author}, you are not in the tournament...`);
    }

  } else { // Called when the tourament has not been started.
    message.channel.send(`Tournament not started, use ?start to initialise tournament.`);
  }



}

// Function to handle the winners of rounds and the tourament.
function handleWin(winnerMember, message, client) {

  // Checks if there are two players or more in the current playerlist.
  if (data.players.length >= 2) {

    // Sets the winner index to that of the winning player
    let winnerIndex = data.players.indexOf(winnerMember.id);

    // If the index of the player is even, their opponent was the odd index after them, so the next odd index is added to the loser list
    if (isEven(winnerIndex)) {
      data.winners.push(data.players[winnerIndex]);
      data.losers.push(data.players[winnerIndex + 1]);
      data.players.splice(winnerIndex, 2);
    } else { // If the index of the player is odd, their opponent was the even index before them, so the prior odd index is added to the loser list
      data.winners.push(data.players[winnerIndex]);
      data.losers.push(data.players[winnerIndex - 1]);
      data.players.splice(winnerIndex - 1, 2);
    }

    // checks if there are any more players in the playerlist, if there are none it populates it again with the winners
    if (data.players.length == 0) {
      data.players = data.winners.slice();
      data.winners.splice(0, data.winners.length);

      // Incriments the round number
      data.roundNo++;

      // Calculates remaining rounds
      var remainingRounds = data.players.length / 2;

      if (remainingRounds == 0.5) {
        remainingRounds = 0;
      }

      message.channel.send(`Round is over. ${remainingRounds} Rounds remain.`);

      // if there is one player after winners have been moved to playerlist, they are the winner! Resets the tournament.
      if (data.players.length == 1) {
        message.channel.send(`${client.users.get(data.players[0])} is the winner!`);
        data.players = [];
        data.winners = [];
        data.losers = [];
        data.readyCheck = false;
        data.roundNo = 0;
      }
    } else { // if there is more than one player in the playerlist, it calculates remaining matches.

      message.channel.send(`Round ${data.roundNo}. ${data.players.length/2} Matches remain this round`);
    }


  } else {
    message.channel.send(`Not enough players in tournament`);
  }
}

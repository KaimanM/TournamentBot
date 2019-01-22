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

      // message.channel.send(`Round is over. ${remainingRounds} Rounds remain.`);
      if (remainingRounds != 0) {

        var leftNames = [];
        var rightNames =[];

        for (i=0; i<data.players.length; i+=2) {
          leftNames.push(`\n${client.users.get(data.players[i])}`);
          rightNames.push(`\n${client.users.get(data.players[i+1])}`);
        }


        const embed = {
          "color": 16312092,
          "thumbnail": {
            "url": "https://cdn.discordapp.com/embed/avatars/0.png"
          },
          "image": {
            "url": "https://www.gannett-cdn.com/-mm-/cdeb9a9e093b3172aa58ea309e74edcf80bf651f/c=0-77-2911-1722/local/-/media/2016/05/29/Cincinnati/Cincinnati/636001135964333349-Harambe2.jpg?width=3200&height=1680&fit=crop"
          },
          "author": {
            "name": "keemon-bot",
            "url": "",
            "icon_url": "https://cdn.discordapp.com/avatars/533314354196774922/fb062eb335f17952224a5379be7786dc.jpg?size=1024"
          },
          "fields": [{
              "name": "🤔",
              "value": "Here are the remaining games!"
            },
            {
              "name": "Player 1",
              "value": `${leftNames}`,
              "inline": true
            },
            {
              "name": "Player 2",
              "value": `${rightNames}`,
              "inline": true
            }
          ]
        };
        message.channel.send(`Round is over. ${remainingRounds} Rounds remain.`, {
          embed
        });
      }

      // if there is one player after winners have been moved to playerlist, they are the winner! Resets the tournament.
      if (data.players.length == 1) {

        // used for handling output rich embed
        var winner = client.users.get(data.players[0]);
        var rightNames =[];

        for (i=0; i<data.losers.length; i++) {
          rightNames.push(`\n${client.users.get(data.losers[i])}`);
        }

        // resets tournament
        data.players = [];
        data.winners = [];
        data.losers = [];
        data.readyCheck = false;
        data.roundNo = 0;


        // output richembed
        const embed = {
          "color": 16312092,
          "thumbnail": {
            "url": "https://cdn.discordapp.com/embed/avatars/0.png"
          },
          "image": {
            "url": "https://i.imgur.com/oCTgA.jpg&fit=crop"
          },
          "author": {
            "name": "keemon-bot",
            "url": "",
            "icon_url": "https://cdn.discordapp.com/avatars/533314354196774922/fb062eb335f17952224a5379be7786dc.jpg?size=1024"
          },
          "fields": [{
              "name": "🤔",
              "value": "Here are the results!"
            },
            {
              "name": "1v1 CHAMPION",
              "value": `${winner}`,
              "inline": true
            },
            {
              "name": "GARBAGE",
              "value": `${rightNames}`,
              "inline": true
            }
          ]
        };
        message.channel.send(`${winner} is the winner! He has now taken his place as rightful KING of discord and ${rightNames[rightNames.length-1]} has his role striped!`, {
          embed
        });


        //OPTIONAL ROLE CHANGING CODE HERE- THIS IS FOR A CHAMPION ROLE!
        let champRoleID = "null";
        champRoleID = client.config.championRoleID; //Comment out for the below code to not execute. No role changes.

        if (champRoleID != null) {
          // let membersWithRole = message.guild.roles.get(champRoleID).members;

          let role = message.guild.roles.find(r => r.id === champRoleID);

          //Gets user ID of previous owner of the role
          let membersWithRole = message.guild.roles.get(champRoleID).members.map(m=>m.user.id);

          // Converts the ID previous owner of the class to member
          let oldChamp = message.guild.members.get(membersWithRole[0]);

          // Removes the champion role from the previous champion
          oldChamp.removeRole(champRoleID).catch(console.error);

          // Converts the ID of the winner to a member
          let newChampMember = message.guild.members.get(winner.id);

          // Assigns champion role to winner member
          newChampMember.addRole(role).catch(console.error);
        } else {
          console.log("champ role is still null");
        }




      }
    } else { // if there is more than one player in the playerlist, it calculates remaining matches.

      message.channel.send(`Round ${data.roundNo}. ${data.players.length/2} Matches remain this round`);
    }


  } else {
    message.channel.send(`Not enough players in tournament`);
  }
}

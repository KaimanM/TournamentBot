// Calling Global Data
var data = require('./../data.js');

// Starts the tourament setting the round to 1.
exports.run = (client, message, args) => {


  if (data.readyCheck === true) {
    data.roundNo = 1;
    // message.channel.send(`Round ${data.roundNo} has begun.`);

    // Used for richembed
    var leftNames = [];
    var rightNames =[];

    for (i=0; i<data.players.length; i+=2) {
      leftNames.push(`\n${client.users.get(data.players[i])}`);
      rightNames.push(`\n${client.users.get(data.players[i+1])}`);
    }
    
    //richembed
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
    message.channel.send(`Round ${data.roundNo} has begun.`, {
      embed
    });




  } else {
    message.channel.send(`Tournament hasn't passed ready check, use ?ready to initiate tournament.`);
  }


}

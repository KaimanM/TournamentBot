const Discord = require('discord.js');
const client = new Discord.Client();

const token = 'NTMzMzE0MzU0MTk2Nzc0OTIy.DxuQhg.Eys7MVfzfyenPlyq1qjMf4XdjWM';

var players = [];

var testPlayers = ["p1", "p2", "p3", "p4", "p5", "p6", "p7", "p8"];

var gameNo = 0;

client.on('ready', () => {
  console.log('Bot is now connected!');

  // client.channels.find(x => x.name === 'test').send('Hello! I\'m now connected!');
});

client.on('message', (msg) => {
  if (msg.content === '?test') {
    msg.channel.send(`Hello ${msg.author}!`);
  }

  if (msg.content === '?join') {
    if (players.indexOf(msg.author) === -1) {
      players.push(msg.author);
      msg.channel.send(`${msg.author} joined the tournament!`);
    } else {
      msg.channel.send(`${msg.author} is already in the tournament...`);
    }

  }

  if (msg.content === '?players') {
    msg.channel.send(`Current Players: ${players}`);
  }

  if (msg.content === '?leave') {
    var index = players.indexOf(msg.author);
    if (index !== -1) {
      players.splice(index, 1);
    }
    if (index === -1) {
      msg.channel.send(`${msg.author} never enrolled in the tournament to begin with...`);
    } else {
      msg.channel.send(`${msg.author} has left the tournament.`);
    }
  }

  if (msg.content.startsWith('?win')) {
    const user = msg.mentions.users.first();

    msg.channel.send(`${user} has won the round.`);

  }

  if (msg.content.startsWith('?twin')) {
    const sayMessage = msg.join(" ");

    msg.channel.send(sayMessage);

  }

  if (msg.content === '?tplayers') {
    msg.channel.send(`Current Players: ${testPlayers}`);
  }

  if (msg.content === '?tready') {
    testPlayers = shuffle(testPlayers);
    msg.channel.send(`Current Players Post Shuffle: ${testPlayers}`);
  }

  if (msg.content === '?tgame') {
    const embed = new Discord.RichEmbed()
    .addField('Game 1', `${testPlayers[0]} vs ${testPlayers[1]}`, true)
    .addField('Game 2', `${testPlayers[2]} vs ${testPlayers[3]}`, true)
    .addField('Game 3', `${testPlayers[4]} vs ${testPlayers[5]}`, true)
    .addField('Game 4', `${testPlayers[6]} vs ${testPlayers[7]}`, true)
    msg.channel.send(embed);
  }


});


function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

client.login(token);

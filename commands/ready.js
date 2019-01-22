// Calling Global Data
var data = require('./../data.js');

// Shuffle function used for shuffling before games start.
function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

// Function to check if the player count is a power of 2.
function po2(n) {
 if (typeof n !== 'number')
      return 'Not a number';

    return n && (n & (n - 1)) === 0;
}

// Updates readycheck and shuffles players.
exports.run = (client, message, args) => {

    if (po2(data.players.length) == true && data.players.length != 1) {
        data.readyCheck = true;
        shuffle(data.players);
        message.channel.send(`Tournament is ready to start, players have been shuffled, type ?start to play!`);

    } else {
      message.channel.send(`Amount of tournament players is ${data.players.length} and is not a power of 2, invite more players.`);
    }

}

// const data = require(`./join.js`);
var data = require('./../data.js');

exports.run = (client, message, args) => {
    // message.channel.send("pong!").catch(console.error);
    data.number--;
    message.channel.send(`Number minus one is: ${data.number}`);
}

// Lists all commands.
exports.run = (client, message, args) => {


  message.channel.send(`Commands: ${client.config.prefix}help Summond this menu.
    \n${client.config.prefix}inv - Use by "${client.config.prefix}inv @UserHere" to invite that user to the tournament.
    \n${client.config.prefix}join - Use by "${client.config.prefix}join" to join the tournament.
    \n${client.config.prefix}kick - Use by "${client.config.prefix}kick @UserHere" to kick that user from the tournament.
    \n${client.config.prefix}leave - Use by "${client.config.prefix}leave" to leave to tournament
    \n${client.config.prefix}players - Use by "${client.config.prefix}players" to check the players in the tournament.
    \n${client.config.prefix}ready - Use by "${client.config.prefix}ready" to ready check the tournament.
    \n${client.config.prefix}reset - Use by "${client.config.prefix}reset" to reset the tournament.
    \n${client.config.prefix}shuffle - Use by "${client.config.prefix}shuffle" to shuffle the players.
    \n${client.config.prefix}start - Use by "${client.config.prefix}start" to start the tournament
    \n${client.config.prefix}win - Use by "${client.config.prefix}win" OR "${client.config.prefix}win @UserHere" to declare either yourself winning the match or the mentioned user to win the match. `);
}

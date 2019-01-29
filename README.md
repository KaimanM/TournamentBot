# Discord Tournament Bot

A simple bot for the Discord voice chat application used for hosting and setting up a small tournament bracket among friends. Written using in javascript using the node js module, Discord js.

## Getting Started

To get started, you're going to need to clone the Bots files into a directory of your choice. You will now need to create a config.json file.

Format it like so:

```
{
  "token": "INSERT YOUR DISCORD TOKEN HERE",
  "prefix": "INSERT YOUR COMMAND PREFIX HERE",
  "championRoleID": "INSERT THE ID OF THE CHAMPION ROLE HERE"
}
```

Your bots discord token can be found [like so](https://github.com/reactiflux/discord-irc/wiki/Creating-a-discord-bot-&-getting-a-token).

The prefix field is the prefix of bot commands, a good one to use is "?".

The champion role id is the role you want the bot to assign to the winner of the tournament on discord, this can be found by typing in your server \\@role which will then print the role id.

### Prerequisites

What things you need to install the software and how to install them

* Node JS
* Discord JS

Download and install node from [their official website](https://nodejs.org/en/download/).

Install Discord js by opening a command prompt or powershell window in the same root folder that you unpacked the bot into and type:
```
npm install discord.js
```
### Running the bot

To run the bot, in the root directory of the bot, open a powershell window and type:

```
node index.js
```

the bot should now run.

## Commands

* inv - Invites a player to the tournament
* join - Joins the tournament
* kick - kicks a player from the tournament
* leave - leaves the tournament
* players - checks all players in the tournament
* ready - readys up and shuffles the players allowing the start command to be called
* reset - resets the bot to initial state
* shuffle - manually shuffles players
* start - starts the tournament
* win - declares who won their match

## Built With

* [DiscordJS](https://discord.js.org/#/) - The Node js module used

## Authors

* **Kaiman Mehmet** - [Github](https://github.com/KaimanM)

## Acknowledgments

* A majority of how to create this project was learned from [AnIdiotsGuide](https://anidiots.guide/).

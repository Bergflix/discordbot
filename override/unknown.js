const {Command} = require("discord.js-commando");
const {botAnswer} = require("../misc.js");
const config = require("../config.json");

class UnknownCommand extends Command {
    constructor(client) {
        super(client, {
            name: "unknown-command",
            group: "util",
            memberName: "unknown-command",
            description: "Fires when the command is unknown",
            examples: ['unknown-command kickeverybodyever'],
            unknown: true,
            hidden: true
        });
    }

    run(message){
        return botAnswer(message.channel, this.client.commandPrefix + message.command.name, `Dieser Befehl existiert nicht. Gebe **!help** ein und erhalte Informationen zu verfügbaren Befehlen.`, config.icons.question);
    }
}

module.exports = UnknownCommand;
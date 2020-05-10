const {Command} = require("discord.js-commando");
const config = require("../../config.json");
const {botAnswer} = require("../../misc.js");

module.exports = class Stream extends Command {
    constructor(client) {
        super(client, {
            name: "stream",
            group: "basic",
            memberName: "stream",
            description: "Gibt einen Link des Channels zurück, wenn du dich in einem Voicechannel befindest."
        });
    }

    run(message, args){
        let voiceChannel = message.member.voiceChannelID;
        let msg = voiceChannel ? `[Hier geht es zum Streaming Channel deines Voice Channels](https://discordapp.com/channels/${config.server}/${voiceChannel})`
            : "Du bist leider in **keinem Voice Channel** und kannst so keinem erweitertem Stream beitreten.";

        return botAnswer(message.channel, "Erweiterter Stream", msg);
    }
};

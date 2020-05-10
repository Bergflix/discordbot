const {Command} = require("discord.js-commando");
const config = require("../../config.json");
const {botMessage, botError, botDmUser} = require("../../misc.js");

module.exports = class Bewerben extends Command {
    constructor(client) {
        super(client, {
            name: "bewerben",
            group: "basic",
            memberName: "bewerben",
            description: "Löst den Bewerbungsprozess für dich aus."
        });
    }

    run(message, args){
        return null; // Disabled this Command

        botDmUser(message.author, "Bewerbung", `Hallo <@${message.author.id}>,\nWir freuen uns, dass du dich für einen Platz in unserem Team interessierst.\nDoch zuvor möchten wir ein paar Fragen an dich stellen.`).then(msg => {
            return msg.react("664925932775276566");
        }).catch(e => {
            return botError(this.client.channels.get(config.channels.bot), e);
        });
        message.channel.type === "text" && message.channel.lastMessage.delete().catch(e => {
            return botError(this.client.channels.get(config.channels.bot), e);
        });
        return botMessage(this.client.channels.get(config.channels.bot), "Bewerbungen", `Es gibt einen neuen Bewerber.\n<@${message.author.id}> möchte helfen.`);
    }
};
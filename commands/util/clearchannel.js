const {Command} = require("discord.js-commando");
const {botAnswer, botError} = require("../../misc");
const config = require("../../config.json");

class ClearChannel extends Command {
    constructor(client) {
        super(client, {
            name: "clearchannel",
            aliases: ["clearchat", "clear", "cc"],
            group: "util",
            memberName: "clearchat",
            description: "Clear everything in a Text Channel",
            clientPermissions: ["ADMINISTRATOR"],
            userPermissions: ["MANAGE_MESSAGES"],
            guildOnly: true
        });
    }

    async run(message, args){
        let ret = "Dieser Channel wurde geleert und ist bereit für neue Aufgaben.";
        let list = await message.channel.fetchMessages();
        if(args[0] !== "force") await message.channel.bulkDelete(list);
        else{
            list.forEach(item => {
                item.delete().catch(e => {
                    botError(this.client.channels.get(config.channels.bot), e);
                });
            });
            ret = "\n**WARNUNG:** Es ist möglich, dass es noch weitere Nachrichten gibt, die nicht mit **force** gelöscht werden konnten!";
        }
        return botAnswer(message.channel, "Channel geleert", ret);
    }
}

module.exports = ClearChannel;
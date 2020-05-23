import Command from "../Command";
import {User} from "discord.js";
import {CommandArgumentTypes} from "../../types";
import ChannelHandler from "../ChannelHandler";

class Clear extends Command {
    constructor() {
        super("clear", {
            description: "Leere den aktuellen Channel",
            group: "Utility",
            guildOnly: true,
            permission: ""
        });
    }

    async exec(user: User, args: Array<CommandArgumentTypes>, channelHandler: ChannelHandler): Promise<void> {
        if(!this.hasPermission(user)) return;

        // hasPermission muss erst gehen
        return;

        let ret = "Dieser Channel wurde geleert und ist bereit für neue Aufgaben.";
        let list = await channelHandler.Channel.messages.cache.filter(msg => msg.createdAt.getDate() === new Date("14 days ago").getDate());
        if(args[0] !== "force") await channelHandler.Channel.bulkDelete(list);
        else{
            list.forEach(item => {
                item.delete().catch(e => console.error("Error", e));
            });
            ret = "\n**WARNUNG:** Es ist möglich, dass es noch weitere Nachrichten gibt, die nicht mit **force** gelöscht werden konnten!";
        }
        channelHandler.sendInfo(ret, "Channel geleert");
    }
}

export default Clear;
import Command from "../Command";
import {CommandData} from "../../types";

class Clear extends Command {
    constructor() {
        super("clear", {
            description: "Leere den aktuellen Channel",
            group: "Utility",
            guildOnly: true,
            permission: "MANAGE_CHANNELS"
        });
    }

    async exec(data: CommandData): Promise<void> {
        let ret = "Dieser Channel wurde geleert und ist bereit für neue Aufgaben.";

        let list = await data.channel.cnl.messages.cache.filter(msg => msg.createdAt.getDate() === new Date("14 days ago").getDate());

        if (data.args[0] !== "force") {
            await data.channel.handler.Channel.bulkDelete(list);
        } else {
            list.forEach(item => {
                item.delete().catch(e => console.error("Error", e));
            });
            ret = "\n**WARNUNG:** Es ist möglich, dass es noch weitere Nachrichten gibt, die nicht mit **force** gelöscht werden konnten!";
        }

        data.channel.handler.sendInfo(ret, "Channel geleert");
    }
}

export default Clear;
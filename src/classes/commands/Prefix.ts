import Command from "../Command";
import {CommandData} from "../../types";
import ConfigHandler from "../ConfigHandler";

class Prefix extends Command {
    constructor() {
        super("prefix", {
            description: "Setze den Befehl-Prefix um",
            guildOnly: true,
            examples: [
                "prefix !"
            ],
            permission: "ADMINISTRATOR",
            format: "<Prefix>"
        });
    }

    async exec(data: CommandData): Promise<void> {
        if(!data.guild || data.args.length === 0 || data.args[0] === "") return;

        let config = ConfigHandler.getConfig(data.guild.id);
        config.setPrefix(data.args[0].toString());

        data.channel.handler.sendInfo(`Der Befehl-Prefix wurde zu ${config.Prefix} geändert`);
    }
}

export default new Prefix();
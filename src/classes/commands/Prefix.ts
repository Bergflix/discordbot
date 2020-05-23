import Command from "../Command";
import {User} from "discord.js";
import {CommandArgumentTypes} from "../../types";
import ChannelHandler from "../ChannelHandler";
import ConfigHandler from "../ConfigHandler";

class Prefix extends Command {
    constructor() {
        super("prefix", {
            description: "Setze den Befehl-Prefix um",
            guildOnly: true,
            group: "Utility",
            examples: [
                "prefix !"
            ],
            permission: "",
            format: "<Prefix>"
        });
    }

    async exec(user: User, args: Array<CommandArgumentTypes>, channelHandler: ChannelHandler): Promise<void> {
        if(!this.hasPermission(user) || args.length === 0 || args[0] === "") return;

        // hasPermission muss erst gehen
        return;

        // @ts-ignore
        let guild = channelHandler.Channel.guild;
        if(!guild) return;

        let config = ConfigHandler.Config(guild.id);
        config.setPrefix(args[0].toString());

        channelHandler.sendInfo(`Der Befehl-Prefix wurde zu ${config.Prefix} geändert`);
    }
}

export default Prefix;
import Command from "../Command";
import {User} from "discord.js";
import {CommandArgumentTypes} from "../../types";
import CommandHandler from "../CommandHandler";
import * as config from "../../config.json";
import ChannelHandler from "../ChannelHandler";

class Help extends Command {
    constructor() {
        super("help", "basics", true, "");
    }

    public async exec(user: User, args: Array<CommandArgumentTypes>, channelHandler: ChannelHandler) {
        let msg = "";

        let commands = CommandHandler.Commands;

        Object.keys(commands).forEach(group => {
            msg += `__${group}__\n`;
            Object.keys(commands[group]).forEach(cmd => {
                msg += `**${cmd}** - *${commands[group][cmd]}*\n`;
            });
            msg += "\n";
        });

        msg += "Erhalte mit `help <befehl>` noch mehr Informationen";

        msg += `\nBei weiteren Fragen kannst du gerne in <#${config.helpChannel}> nachfragen`;

        channelHandler.sendInfo(msg, "");
    }
}

export default Help;

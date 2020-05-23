import Command from "../Command";
import {User} from "discord.js";
import {CommandArgumentTypes} from "../../types";
import CommandHandler from "../CommandHandler";
import * as config from "../../config.json";
import ChannelHandler from "../ChannelHandler";
import ConfigHandler from "../ConfigHandler";

class Help extends Command {
    constructor() {
        super("help", {
            description: "Erhalte helfende Informationen zum Bergflix-Bot",
            format: "<Befehl>",
            group: "Utility",
            unknown: true,
            examples: [
                "help prefix"
            ]
        });
    }

    public async exec(user: User, args: Array<CommandArgumentTypes>, channelHandler: ChannelHandler) {
        let msg = "";
        let tmp = {};

        if (args.length === 0 || args[0] === ""){
            CommandHandler.Commands.forEach(cmd => {
                if (!cmd.hasPermission(user)) return;
                let group = cmd.Group;
                if (!tmp[group]) tmp[group] = {};
                tmp[group][cmd.Name] = cmd.Description;
            });
            for (let group in tmp) {
                if (!tmp.hasOwnProperty(group)) continue;
                msg += `__${group}__\n`;

                for (let cmd in tmp[group]) {
                    if (!tmp[group].hasOwnProperty(cmd)) continue;
                    msg += `**${cmd}** - *${tmp[group][cmd]}*\n`
                }
                msg += "\n";
            }
        }else{
            let command = CommandHandler.Command(args[0].toString());
            let prefix = "!";

            // @ts-ignore
            let guild = channelHandler.Channel.guild;
            if(guild) prefix = ConfigHandler.Config(guild.id).Prefix;

            msg += `__**${command.Name}**__ - ${command.Description}${command.GuildOnly ? ' (Nur auf einem Server verwendbar)' : ''}\n\n`;
            let format = command.Name + (command.Format ? ` ${command.Format}` : '');
            msg += `***Format:***   \`${prefix + format}\` oder \`@${global["BOT"].Client.user.tag} ${format}\`\n`;
            msg += `***Gruppe:***   ${command.Group}\n`;
            if(command.Examples) msg += `***Beispiele:***\n- ${command.Examples.join('\n- ')}\n`;

            msg += `\n`;
        }

        msg += `Erhalte mit \`help <befehl>\` noch mehr Informationen
                Bei weiteren Fragen kannst du gerne in <#${config.helpChannel}> nachfragen`;

        channelHandler.sendInfo(msg, "Hilfe");
    }
}

export default Help;

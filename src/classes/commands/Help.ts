import Command from "../Command";
import {CommandData} from "../../types";
import CommandHandler from "../CommandHandler";
import * as config from "../../config.json";
import ConfigHandler from "../ConfigHandler";

class Help extends Command {
    constructor() {
        super("help", {
            description: "Erhalte helfende Informationen zum Bergflix-Bot",
            format: "[Befehl]",
            group: "Utility",
            unknown: true,
            examples: [
                "help prefix"
            ]
        });
    }

    public async exec(data: CommandData) {
        let msg = "";
        let tmp = {};

        if (data.args.length === 0 || data.args[0] === ""){
            CommandHandler.Commands.forEach(cmd => {
                if (data.member && !data.member.hasPermission(cmd.Permission)) return;

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
            let command = CommandHandler.Command(data.args[0].toString());
            let prefix = data.guild ? ConfigHandler.Config(data.guild.id).Prefix : "!";

            msg += `__**${command.Name}**__ - ${command.Description}${command.GuildOnly ? ' (Nur auf einem Server verwendbar)' : ''}\n\n`;
            let format = command.Name + (command.Format ? ` ${command.Format}` : '');
            msg += `***Format:***   \`${prefix + format}\` oder \`@${global["BOT"].Client.user.tag} ${format}\`\n`;
            msg += `***Gruppe:***   ${command.Group}\n`;
            if(command.Examples) msg += `***Beispiele:***\n- ${command.Examples.join('\n- ')}\n`;

            msg += `\n`;
        }

        msg += `Erhalte mit \`help <befehl>\` noch mehr Informationen
                Bei weiteren Fragen kannst du gerne in <#${config.helpChannel}> nachfragen`;

        data.channel.handler.sendInfo(msg, "Hilfe");
    }
}

export default Help;

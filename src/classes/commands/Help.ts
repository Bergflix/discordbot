import Command from "../Command";
import {CommandData} from "../../types";
import CommandHandler from "../CommandHandler";
import * as config from "../../config.json";
import ConfigHandler from "../ConfigHandler";
import BOT from "../BOT";

class Help extends Command {
    constructor() {
        super("help", {
            description: "Erhalte helfende Informationen zum Bergflix-Bot",
            format: "[Befehl]",
            unknown: false,
            examples: [
                "help prefix"
            ]
        });
    }

    public async exec(data: CommandData) {
        let msg = "";
        let tmp = {};
        let prefix = data.guild ? ConfigHandler.getConfig(data.guild.id).Prefix : "!";

        if (data.args.length === 0 || data.args[0] === ""){
            CommandHandler.Commands.forEach(cmd => {
                if (cmd.hidden) return;
                if (data.member && cmd.permission && !data.member.hasPermission(cmd.permission)) return;
                tmp[cmd.name] = cmd.description;
            });

            for (let cmd in tmp) {
                if (!tmp.hasOwnProperty(cmd)) continue;
                msg += `**${prefix + cmd}** - *${tmp[cmd]}*\n`
            }

            msg += `\nErhalte mit \`${prefix}help <befehl>\` noch mehr Informationen
                Bei weiteren Fragen kannst du gerne in <#${config.helpChannel}> nachfragen`;

        }else{
            let command = CommandHandler.getCommand(data.args[0].toString());
            if(command){
                msg += `__**${command.name}**__ - ${command.description}${command.guildOnly ? ' (Nur auf einem Server verwendbar)' : ''}\n\n`;
                let format = command.name + (command.format ? ` ${command.format}` : '');
                msg += `***Format:***   \`${prefix + format}\` oder \`@${BOT.Client.user.tag} ${format}\`\n`;
                if(command.examples) msg += `***Beispiele:***\n- ${command.examples.join('\n- ')}\n`;
            }else{
                msg += "Der Befehl `"+prefix+data.args[0].toString()+"` ist leider nicht verfügbar\nVersuche den `"+prefix+"help`-Befehl auszuführen!";
            }
        }

        data.channel.handler.sendInfo(msg, "Hilfe");
    }
}

export default new Help();

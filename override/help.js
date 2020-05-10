const {Command} = require("discord.js-commando");
const config = require("../config.json");
const {botAnswer, botDmUser} = require("../misc.js");
const {oneLine} = require("common-tags");

module.exports = class Help extends Command {
    constructor(client) {
        super(client, {
            name: "help",
            aliases: ["hilfe", "?", "h"],
            group: "util",
            memberName: "help",
            description: "Gibt einen Link des Channels zurück, wenn du dich in einem Voicechannel befindest.",
            args: [{
                key: 'command',
                prompt: 'Which command would you like to view the help for?',
                type: 'string',
                default: ''
            }]
        });
    }

    async run(message, args){
        let msg = "";
        if(args.command === "" || args.command === "all") {
            let commands = {};
            this.client.registry.commands.forEach(cmd => {
                if (!cmd.hasPermission(message)) return;
                if (!commands[cmd.group.name]) commands[cmd.group.name] = {};
                //console.log(cmd);
                if (!cmd.hidden) commands[cmd.group.name][cmd.name] = cmd.description;
            });

            Object.keys(commands).forEach(group => {
                msg += `__${group}__\n`;
                Object.keys(commands[group]).forEach(cmd => {
                    msg += `**${cmd}** - *${commands[group][cmd]}*\n`;
                });
                msg += "\n";
            });

            msg += "Erhalte mit `help <befehl>` noch mehr Informationen";
        }else{
            let list = this.client.registry.findCommands(args.command, false, message);
            if(!list.length) msg = `Keinen Befehl mit **${args.command}** gefunden.`;
            else if(list.length >= 5) msg = `Zu viele Befehle mit **${args.command}** gefunden. Bitte sei etwas genauer.`;
            else{
                list.forEach(cmd => {
                    msg += oneLine`__**${cmd.name}**__ - ${cmd.description}
                        ${cmd.guildOnly ? ' (Usable only in servers)' : ''}
                        ${cmd.nsfw ? ' (NSFW)' : ''}`;
                    let format = cmd.name + (cmd.format ? ` ${cmd.format}` : '');
                    msg += `\n***Format:***  \`!${format}\` oder \`@'${this.client.user.tag} ${format}\``;
                    if(cmd.aliases.length > 0)
                        msg += `\n***Alias:***  ${cmd.aliases.join(', ')}`;
                    msg += `\n${oneLine`
                        ***Gruppe:***  ${cmd.group.name}
                        (\`${cmd.groupID}:${cmd.memberName}\`)
                    `}`;
                    if(cmd.details)
                        msg += `\n***Details:***  ${cmd.details}`;
                    if(cmd.examples)
                        msg += `\n***Beispiele:***\n${cmd.examples.join('\n')}`;
                    msg += `\n`;
                });
            }
        }

        msg += `\nBei weiteren Fragen kannst du gerne in ${this.client.guilds.get(config.server).channels.get(config.channels.fragen).toString()} nachfragen`;
        message.channel.type === "text" && await botAnswer(message.channel, "Hilfe", `<@${message.author.id}> ich schicke dir gleich alle Infos`, config.icons.question);
        return botDmUser(message.author, "Hilfe", msg);
    }
};

import BOT from "./BOT";
import {Collection, GuildMember, Message} from "discord.js";
import ConfigHandler from "./ConfigHandler";
import Command from "./Command";
import ChannelHandler from "./ChannelHandler";
import GuildConfig from "./GuildConfig";
import {CommandData} from "../types";
import * as fs from "fs";

class CommandHandler {
    private _commands: Collection<string, Command>;

    constructor() {
        this._commands = new Collection<string, Command>();
    }

    private async _commandExec(message: Message) {
        let msg = message.content;
        let user = message.author;
        if (user.bot) return;

        let guild = message.guild;
        let channel = message.channel;
        let cnlHandler = new ChannelHandler(channel);

        let guildConfig: GuildConfig;
        let prefix = "!";
        let member: GuildMember;

        if (guild) {
            guildConfig = ConfigHandler.getConfig(guild.id);
            prefix = guildConfig.Prefix;
            member = guild.member(user);
        }

        let args = msg.split(" ");
        let cmd = args.splice(0, 1)[0];

        if (msg.startsWith(prefix)) cmd = cmd.replace(prefix, "");
        else if(msg.startsWith(`<@!${BOT.Client.user.id}>`)) cmd = cmd.replace(`<@!${BOT.Client.user.id}>`, "");
        else if(channel.type !== "dm") return;

        while(cmd === "") cmd = args.splice(0, 1)[0];

        // Bundle command data
        let data: CommandData = {user, args, channel: {cnl: channel, handler: cnlHandler}, guild, member};
        let command: Command;

        // Search and execute command
        if ((command = this._commands.get(cmd))) {
            if (data.member && command.permission && !data.member.hasPermission(command.permission)) return;
            command.exec(data).catch(e => console.error("Error Command Execution", e));
        // Else: Unknown Command
        } else this._execUnknown(data);
    }

    private _execUnknown(data: CommandData) {
        this._commands.each(command => {
            if(!command.unknown) return;
            if(data.member && command.permission && !data.member.hasPermission(command.permission)) return;
            command.exec(data).catch(e => console.error("Error Command Execution", e));
        });
    }

    public init(){
        // Register event
        BOT.Client.on("message", message => this._commandExec(message))
        return new Promise((resolve, reject) => {
            // Read command files
            fs.readdirSync("./dist/classes/commands").forEach(file => {
                // Ignore every file except for .js
                if(!file.endsWith(".js")) return;
                let cmdName = file.replace(".js", "");
                // dynamic Import all command objects
                import("./commands/"+cmdName).then(cmd => {
                    this.addCommand(cmd.default);
                }).catch(reject);
            });
            resolve(null);
        });
    }

    public addCommand(command: any) {
        this._commands.set(command.name, command);
    }
    public get Commands() {
        return this._commands.array();
    }
    public getCommand(command: string) {
        return this._commands.get(command);
    }
}

export default new CommandHandler();

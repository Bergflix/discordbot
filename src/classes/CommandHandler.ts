import BOT from "./Bot";
import {Collection, Message} from "discord.js";
import ConfigHandler from "./ConfigHandler";
import Command from "./Command";
import ChannelHandler from "./ChannelHandler";
import GuildConfig from "./GuildConfig";

class CommandHandler {
    private static _instance: CommandHandler;
    private _commands: Collection<string, Command>;

    constructor() {
        this._commands = new Collection<string, Command>();
        BOT.Client.on("message", message => this._commandExec(message))
    }

    private _commandExec(message: Message){
        let msg = message.content;
        let user = message.author;
        if(user.bot) return;

        let guild = message.guild;
        let channel = message.channel;
        let cnlHandler = new ChannelHandler(channel);

        let guildConfig: GuildConfig;
        let prefix = "!";
        if(guild){
            guildConfig = ConfigHandler.Instance.getConfig(guild.id);
            prefix = guildConfig.Prefix;
        }

        let args = msg.split(" ");
        let cmd = args.splice(0, 1)[0];

        if(msg.startsWith(prefix)){
            cmd = cmd.replace(prefix, "");
        }else if(msg.startsWith(`<@!${BOT.Client.user.id}>`)){
            cmd = cmd.replace(`<@!${BOT.Client.user.id}>`, "");
        }else if(channel.type !== "dm"){
            return;
        }

        while(cmd === ""){
            cmd = args.splice(0, 1)[0];
        }

        let command: Command;
        if((command = this._commands.get(cmd))){
            command.exec(user, args, cnlHandler).catch(e => console.error("Error Command Execution", e));
        }else{
            this._commands.each(command => {
                if(!command.Unknown) return;
                command.exec(user, args, cnlHandler).catch(e => console.error("Error Command Execution", e));
            })
        }
    }

    public addCommand(command: any){
        this._commands.set(command.Name, command);
    }
    public get Commands(){
        return this._commands.array();
    }
    public Command(command: string){
        return this._commands.get(command);
    }


    public static init(){
        this._instance = new CommandHandler();
    }
    public static get Instance(){
        return this._instance;
    }
    public static get Commands(){
        return this.Instance.Commands;
    }
    public static Command(command: string){
        return this.Instance.Command(command);
    }
}

export default CommandHandler;

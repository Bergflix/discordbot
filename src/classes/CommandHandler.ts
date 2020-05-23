import BOT from "./Bot";
import {Collection, Message} from "discord.js";
import ConfigHandler from "./ConfigHandler";
import Command from "./Command";
import ChannelHandler from "./ChannelHandler";

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
        let guild = message.guild;
        let cnlHandler = new ChannelHandler(message.channel);

        let guildConfig = ConfigHandler.Instance.getConfig(guild.id);
        let prefix = guildConfig.Prefix;

        if(user.bot || !msg.startsWith(prefix)) return;

        let args = msg.split(" ");
        let cmd = args.splice(0, 1)[0].replace(prefix, "");

        let command = this._commands.get(cmd);
        if(command){
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


    public static init(){
        this._instance = new CommandHandler();
    }
    public static get Instance(){
        return this._instance;
    }
    public static get Commands(){
        return this.Instance.Commands;
    }
}

export default CommandHandler;

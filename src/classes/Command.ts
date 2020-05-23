import {Client, User} from "discord.js";
import {CommandArgumentTypes, CommandOptions} from "../types";
import ChannelHandler from "./ChannelHandler";

class Command {
    private _name: string;
    private _description: string;
    private _format: string;
    private _group: string;
    private _unknown: boolean;
    private _permission: string;
    private _guildOnly: boolean;
    private _examples: Array<string>

    constructor(name: string, options: CommandOptions) {
        this._name = name;
        this._description = options.description || "";
        this._format = options.format || "";
        this._group = options.group || "Basics";
        this._unknown = options.unknown || false;
        this._permission = options.permission || "";
        this._guildOnly = options.guildOnly || false;
        this._examples = options.examples || [];
    }

    public get Name(){
        return this._name;
    }
    public get Description(){
        return this._description;
    }
    public get Group(){
        return this._group;
    }
    public get Unknown(){
        return this._unknown;
    }
    public get Permission(){
        return this._permission;
    }
    public get GuildOnly(){
        return this._guildOnly;
    }
    public get Format(){
        return this._format;
    }
    public get Examples(){
        return this._examples;
    }

    public hasPermission(user: User){
        return true;
    }

    public async exec(user: User, args: Array<CommandArgumentTypes>, channelHandler: ChannelHandler){
        throw new Error("Method not implemented.");
    };
}

export default Command;

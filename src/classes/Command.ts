import {User} from "discord.js";
import {CommandArgumentTypes} from "../types";
import ChannelHandler from "./ChannelHandler";

class Command {
    private _name: string;
    private _group: string;
    private _unknown: boolean;
    private _permission: string;

    constructor(name: string, group: string, unknown: boolean, permission: string) {
        this._name = name;
        this._group = group;
        this._unknown = unknown;
        this._permission = permission;
    }

    public get Name(){
        return this._name;
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

    public async exec(user: User, args: Array<CommandArgumentTypes>, channelHandler: ChannelHandler){
        throw new Error("Method not implemented.");
    };
}

export default Command;

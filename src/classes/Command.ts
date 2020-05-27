import {PermissionResolvable} from "discord.js";
import {CommandData, CommandOptions} from "../types";

class Command {
    private readonly _name: string;
    private readonly _description: string;
    private readonly _format: string;
    private readonly _group: string;
    private readonly _unknown: boolean;
    private readonly _permission: PermissionResolvable;
    private readonly _guildOnly: boolean;
    private readonly _examples: Array<string>

    constructor(name: string, options: CommandOptions) {
        this._name = name;
        this._description = options.description || "";
        this._format = options.format || "";
        this._group = options.group || "Basics";
        this._unknown = options.unknown || false;
        this._permission = options.permission || null;
        this._guildOnly = options.guildOnly || false;
        this._examples = options.examples || [];
    }

    public get Name() {
        return this._name;
    }
    public get Description() {
        return this._description;
    }
    public get Group() {
        return this._group;
    }
    public get Unknown() {
        return this._unknown;
    }
    public get Permission() {
        return this._permission;
    }
    public get GuildOnly() {
        return this._guildOnly;
    }
    public get Format() {
        return this._format;
    }
    public get Examples() {
        return this._examples;
    }

    public async exec(data: CommandData) {
        throw new Error("Method not implemented.");
    };
}

export default Command;

import {PermissionResolvable} from "discord.js";
import {CommandData, CommandOptions} from "../types";

class Command {
    public readonly name: string;
    public readonly description: string;
    public readonly format: string;
    public readonly unknown: boolean;
    public readonly hidden: boolean;
    public readonly permission: PermissionResolvable;
    public readonly guildOnly: boolean;
    public readonly examples: Array<string>

    constructor(name: string, options: CommandOptions) {
        this.name = name;
        this.description = options.description || "";
        this.format = options.format || "";
        this.unknown = options.unknown || false;
        this.hidden = options.hidden || false;
        this.permission = options.permission || null;
        this.guildOnly = options.guildOnly || false;
        this.examples = options.examples || [];
    }

    public async exec(data: CommandData) {
        throw new Error("Method not implemented.");
    };
}

export default Command;

import {Role, User} from "discord.js";

export type CommandArgumentTypes = string | boolean | number | User | Role;

export type CommandOptions = {
    description?: string;
    format?: string;
    group?: string;
    unknown?: boolean;
    permission?: string;
    guildOnly?: boolean;
    examples?: Array<string>
}
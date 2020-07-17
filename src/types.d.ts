import {DMChannel, Guild, GuildMember, NewsChannel, PermissionResolvable, Role, TextChannel, User} from "discord.js";
import ChannelHandler from "./classes/ChannelHandler";

export type CommandArgumentTypes = string | boolean | number | User | Role;

export type CommandChannelTypes = TextChannel | DMChannel | NewsChannel;

export type CommandOptions = {
    description?: string;
    format?: string;
    unknown?: boolean;
    hidden?: boolean;
    permission?: PermissionResolvable;
    guildOnly?: boolean;
    examples?: Array<string>
}

export type CommandData = {
    user: User;
    args: Array<CommandArgumentTypes>;
    channel: {
        cnl: CommandChannelTypes;
        handler: ChannelHandler;
    }
    guild?: Guild;
    member?: GuildMember;
}
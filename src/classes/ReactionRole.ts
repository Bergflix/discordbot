import BOT from "./BOT";
import {MessageReaction, User} from "discord.js";
import Log from "./Log";

class ReactionRole {
    private _message;
    private _emoji;
    private _roles: Array<string>;

    constructor(message, emoji, roles: Array<string>) {
        this._message = message;
        this._emoji = emoji;
        this._roles = roles;

        BOT.Client.on("messageReactionAdd", (reaction, user: User) => this._addRoles(reaction, user));
        BOT.Client.on("messageReactionRemove", (reaction, user: User) => this._removeRoles(reaction, user));
    }

    private _addRoles(reaction: MessageReaction, user: User){
        if(!user || user.bot || !reaction.message.guild) return;
        let guildMember = reaction.message.guild.member(user);

        this._roles.forEach(role => {
            if (guildMember.roles.cache.has(role)) return;
            guildMember.roles.add(role).then(() => {
                Log.sendInfo(`<@${user.id}> wurde die Rolle <@&${role}> gegeben`);
            }).catch(e => {
                console.error("Failed to add role to user", role, user.tag, e);
            });
        });
    }
    private _removeRoles(reaction: MessageReaction, user: User){
        if(!user || user.bot || !reaction.message.guild) return;
        let guildMember = reaction.message.guild.member(user);

        this._roles.forEach(role => {
            if (!guildMember.roles.cache.has(role)) return;
            guildMember.roles.remove(role).then(() => {
                Log.sendInfo(`<@${user.id}> wurde die Rolle <@&${role}> entzogen`);
            }).catch(e => {
                console.error("Failed to remove role from user", role, user.tag, e);
            });
        });
    }
}

export default ReactionRole;

import {Collection} from "discord.js";
import ReactionRole from "./ReactionRole";
import DB from "./DB";
import BOT from "./BOT";

class ReactionRoleHandler {
    private readonly _guild: string;
    private readonly _reactionRoles: Collection<string, Array<ReactionRole>>;

    constructor(guild: string) {
        this._guild = guild;
        this._reactionRoles = new Collection<string, Array<ReactionRole>>();

        this._loadRules().catch(e => console.error("Failed to load ReactionRoles", e));
    }

    private async _loadRules(){
        let data = await DB.Connection.find({selector: {type: "reactionroles", guild: this._guild}});
        // Check if data is available and get the rules
        if(!data.docs[0] || !data.docs[0].rules) return;
        let rules = data.docs[0].rules;

        // Fetch all channels
        for (let channelId in rules) {
            if(!rules.hasOwnProperty(channelId)) continue;

            let channel = await BOT.Client.channels.fetch(channelId, true);

            for (let messageId in rules[channelId]) {
                if(!rules[channelId].hasOwnProperty(messageId)) continue;

                // @ts-ignore
                let message = await channel.messages.fetch(messageId, true);
                let roleArr: Array<ReactionRole> = [];

                for(let reaction in rules[channelId][messageId]){
                    if(!rules[channelId][messageId].hasOwnProperty(reaction)) continue;

                    if(!message.reactions.cache.has(reaction)) await message.react(reaction);
                    let emoji = message.reactions.resolve(reaction).emoji;

                    roleArr.push(new ReactionRole(message, emoji, rules[channelId][messageId][reaction]));
                }

                this._reactionRoles.set(messageId, roleArr);
            }
        }
    }

    public addRule(){}
    public removeRule(){}
    public saveRules(){}
}

export default ReactionRoleHandler;
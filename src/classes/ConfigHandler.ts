import {Collection} from "discord.js";
import DB from "./DB";
import GuildConfig from "./GuildConfig";
import BOT from "./BOT";

class ConfigHandler {
    private _guildConfigs: Collection<string, GuildConfig>;

    constructor() {
        this._guildConfigs = new Collection<string, GuildConfig>();
    }

    public init(){
        BOT.Client.guilds.cache.each(guild => {
            this.fetchConfig(guild.id);
        });
    }

    public fetchConfig(guild: string){
        let db = DB.Connection;
        db.find({selector: {type: "config", guild}}).then(data => {
            if(!data.docs[0]) return;
            let conf = data.docs[0];
            this._guildConfigs.set(guild, new GuildConfig(guild, conf));
        });
    }

    public getConfig(guild: string){
        return this._guildConfigs.get(guild);
    }
}

export default new ConfigHandler();

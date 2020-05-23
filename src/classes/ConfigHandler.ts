import {Collection} from "discord.js";
import DB from "./DB";
import GuildConfig from "./GuildConfig";
import BOT from "./Bot";

class ConfigHandler {
    private static _instance: ConfigHandler;
    private _guildConfigs: Collection<string, GuildConfig>;

    constructor() {
        this._guildConfigs = new Collection<string, GuildConfig>();

        this._loadConfig();
    }

    private _loadConfig(){
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


    public static init(){
        this._instance = new this();
    }
    public static get Instance(){
        return this._instance;
    }
    public static Config(guild: string){
        return this.Instance.getConfig(guild);
    }
}

export default ConfigHandler;

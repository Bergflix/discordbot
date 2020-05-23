import {Client, PresenceStatusData} from "discord.js";

class BOT {
    private static _instance: BOT;
    private readonly _client: Client;

    constructor(status: PresenceStatusData) {
        this._client = new Client({
            presence: {
                status,
                activity: {
                    name: "Bergflix.de",
                    type: "WATCHING",
                    url: "https://bergflix.de"
                }
            }
        });
    }

    public get Client(){
        return this._client;
    }

    public static init(status: PresenceStatusData){
        this._instance = new this(status);
        return this._instance.Client;
    }

    public static get Instance(){
        return this._instance;
    }
    public static get Client(){
        return this.Instance.Client;
    }
}

export default BOT;
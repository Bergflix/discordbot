import {Client, PresenceStatusData} from "discord.js";

class BOT {
    private _client: Client;

    constructor() {
        this._client = null;
    }

    public init(status: PresenceStatusData){
        this._client = new Client({
            presence: {
                status,
                activity: {
                    name: process.env.ACTIVITY_NAME || "Bergflix.de",
                    type: process.env.ACTIVITY_TYPE || "STREAMING",
                    url: "https://bergflix.de"
                }
            }
        });
        return this.Client;
    }

    public get Client(){
        return this._client;
    }
}

export default new BOT();

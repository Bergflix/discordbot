import * as config from "../config.json";
import BOT from "./BOT";
import ChannelHandler from "./ChannelHandler";

class Log {
    private _channelHandler: ChannelHandler;

    public constructor() {
        this._channelHandler = null;
    }

    public init(){
        return new Promise((resolve, reject) => {
            BOT.Client.channels.fetch(config.logChannel).then(channel => {
                // @ts-ignore
                this._channelHandler = new ChannelHandler(channel);
                resolve(null);
            }).catch(e => reject(e));
        });
    }

    public sendInfo(message: string, title = "Info"){
        this._channelHandler.sendInfo(message, title);
    }
    public sendError(message: string){
      this._channelHandler.sendError(message);
    }
}

export default new Log();

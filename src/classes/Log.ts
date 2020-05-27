import * as config from "../config.json";
import BOT from "./BOT";
import ChannelHandler from "./ChannelHandler";

class Log {
    private static _instance: Log;
    private _channelHandler: ChannelHandler;
    private _ready: boolean;

    public constructor() {
        this._ready = false;
        this._loadChannel();
    }

    private _loadChannel(){
        BOT.Client.channels.fetch(config.logChannel).then(channel => {
            // @ts-ignore
            this._channelHandler = new ChannelHandler(channel);
            this._ready = true;
        }).catch(e => console.error("Error", e));
    }

    public sendInfo(message: string, title = "Info"){
        this._channelHandler.sendInfo(message, title);
    }
    public sendError(message: string){
      this._channelHandler.sendError(message);
    }


    public static init(){
        this._instance = new this();
        return new Promise(resolve => {
            (function loop(){
                if(Log.Instance._ready){
                    resolve();
                }else{
                    setTimeout(loop, 100);
                }
            })()
        });
    }
    public static get Instance(){
        return this._instance;
    }
    public static sendInfo(message: string, title = "Info"){
        this.Instance.sendInfo(message, title);
    }
    public static sendError(message: string){
      this.Instance.sendError(message);
    }
}

export default Log;

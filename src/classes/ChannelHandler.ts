import {MessageEmbed} from "discord.js";
import * as config from "../config.json";
import {CommandChannelTypes} from "../types";

class ChannelHandler {
    private readonly _channel: CommandChannelTypes;

    public sentMessage: boolean;

    constructor(channel: CommandChannelTypes) {
        this._channel = channel;
        this.sentMessage = false;
    }

    private async _sendEmbed(embed: MessageEmbed){
        return this._channel.send(embed);
    }
    public sendInfo(message: string, title = "Info"){
        this._sendEmbed(new MessageEmbed()
            .setColor("#cc0033")
            .setTitle(title)
            .setAuthor("Bergflix")
            .setThumbnail(config.icons.logo)
            .setDescription(message)
        ).then(() => {
            this.sentMessage = true;
        }).catch(e => {
            console.log("Error [Send Message]", e)
        });
    }
    public sendError(message: string){
      this.sendInfo(message, "Fataler Fehler");
    }

    public get Channel(){
        return this._channel;
    }
}

export default ChannelHandler;

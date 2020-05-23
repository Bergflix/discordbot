import {DMChannel, MessageEmbed, NewsChannel, TextChannel} from "discord.js";
import * as config from "../config.json";

class ChannelHandler {
    private readonly _channel: TextChannel | DMChannel | NewsChannel;

    constructor(channel: TextChannel | DMChannel | NewsChannel) {
        this._channel = channel;
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
        ).catch(e => {
            console.log("Error [Send Message]", e)
        });
    }
}

export default ChannelHandler;

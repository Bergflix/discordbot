import Command from "../Command";
import {CommandData} from "../../types";
import ConfigHandler from "../ConfigHandler";

class Unknown extends Command {
    constructor() {
        super("unknown", {
            description: "Platzhalterbefehö",
            format: "[Befehl]",
            unknown: true
        });
    }

    public async exec(data: CommandData){
        let prefix = data.guild ? ConfigHandler.getConfig(data.guild.id).Prefix : "!";
        data.channel.handler.sendInfo("Dieser Befehl ist leider nicht bekannt.\nVersuche den `"+prefix+"help`-Befehl auszuführen.", "Unbekannter Befehl")
    }
}

export default new Unknown();

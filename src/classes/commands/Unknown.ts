import Command from "../Command";
import ConfigHandler from "../ConfigHandler";

class Unknown extends Command {
    constructor() {
        super("unknown", {
            description: "Platzhalterbefehl",
            unknown: true,
            hidden: true
        });
    }

    public async exec(data){
        let prefix = data.guild ? ConfigHandler.getConfig(data.guild.id).Prefix : "!";
        data.channel.handler.sendInfo("Dieser Befehl ist leider nicht bekannt.\nVersuche den `"+prefix+"help`-Befehl auszuführen.", "Unbekannter Befehl")
    }
}

export default new Unknown();

import Command from "../Command";
import {CommandData} from "../../types";

class Unknown extends Command {
    constructor() {
        super("unknown", {
            description: "Platzhalterbefehö",
            format: "[Befehl]",
            group: "Utility",
            unknown: true
        });
    }

    public async exec(data: CommandData){
        data.channel.handler.sendInfo("Dieser Befehl ist leider nicht bekannt.\nVersuche den `help`-Befehl auszuführen.", "Unbekannter Befehl")
    }
}

export default Unknown;

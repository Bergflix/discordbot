import Command from "../Command";
import ConfigHandler from "../ConfigHandler";

class Prefix extends Command {
    constructor() {
        super("prefix", {
            description: "Setze den Befehl-Prefix um",
            guildOnly: true,
            examples: [
                "prefix !"
            ],
            permission: "ADMINISTRATOR",
            format: "<Prefix>"
        });
    }

    async exec(data): Promise<void> {
        if(!data.guild) return;
        if(data.args.length === 0 || data.args[0] === "") {
            data.channel.handler.sendError("Der Prefix konnte **nicht verändert** werden. Bitte gebe einen Prefix mit an.");
            return;
        }

        let config = ConfigHandler.getConfig(data.guild.id);
        config.setPrefix(data.args[0].toString());

        data.channel.handler.sendInfo(`Der Prefix wurde zu ${config.Prefix} geändert`);
    }
}

export default new Prefix();

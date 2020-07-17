import Command from "../Command";

class Clear extends Command {
    constructor() {
        super("clear", {
            description: "Leere den aktuellen Channel",
            guildOnly: true,
            permission: "MANAGE_CHANNELS"
        });
    }

    async exec(data): Promise<void> {
        try {
            await data.channel.handler.Channel.bulkDelete(100);
        } catch(e) {
            if(e.code === 50034) {
                data.channel.handler.sendError("Dieser Channel kann **nicht geleert** werden, da die Nachrichten teilweise schon über **14 Tage alt** sind.");
                return;
            }
        }
        data.channel.handler.sendInfo(`Dieser Channel wurde von <@${data.user.id}> geleert.`, "Channel geleert");
    }
}

export default new Clear();

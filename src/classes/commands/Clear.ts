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
        await data.channel.handler.Channel.bulkDelete(100);
        data.channel.handler.sendInfo(`Dieser Channel wurde von <@${data.user.id}> geleert.`, "Channel geleert");
    }
}

export default new Clear();

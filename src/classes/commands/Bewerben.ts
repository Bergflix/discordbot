import Command from "../Command";

class Bewerben extends Command {
    constructor() {
        super("bewerben", {
            description: "Sende eine Bewerbung an uns :)"
        });
    }

    public async exec(data){

        data.channel.handler.sendInfo("Baustelle! Bitte sende uns deine Bewerbung einfach privat.", "Hilfe");
    }
}

export default new Bewerben()

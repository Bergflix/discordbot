import Command from "../Command";
import CommandHandler from "../CommandHandler";
import * as config from "../../config.json";
import ConfigHandler from "../ConfigHandler";
import BOT from "../BOT";

class Help extends Command {
    constructor() {
        super("tech-support", {
            description: "wilder befehl.",
            unknown: false,
            hidden: true
        });
    }

    public async exec(data){
        let now = new Date();
        let hour = now.getHours();
        let day = now.getDay();
        let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    if(hour < 9 && hour > 18){
        if(days[day] === 'Sunday' || days[day] === 'Saturday'){
                data.channel.handler.sendInfo(":tools:FTF Tech Support:tools: .\nLeider erreichen sie uns gerade außerhalb unserer Geschäftszeiten. Schreiben sie uns ihr anliegen doch gerne Montags bis Freitags von 9:00 Uhr bis 18:30 Uhr.\nSollten sie dringende Anliegen haben, so wenden sie sich doch bitte an die Praktikanten dieses Servers. Wir freuen uns auf ihre Nachricht, und bedanken uns für ihre Aufmerksamkeit! \nUnd denken sie immer daran: IHRE Probleme sind UNSER Verdienst.", "Support geschlossen.")
            }
        } else {
            data.channel.handler.sendInfo(":tools:FTF Tech Support:tools:\n*Zum glück erreichen sie uns gerade innerhalb unserer Geschäftszeiten!*\nSenden sie bitte ihr Anliegen per Privatnachricht an: @Nikasukee#0001.\nDer genannte Mitarbeiter wird sich dann nach ausgiebiger Fehlerrecherche bei ihnen zur Problembehandlung melden!\n**Wir bedanken uns für ihre Aufmerksamkeit!**")
        }
    }
}

export default new Help();

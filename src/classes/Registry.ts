import CommandHandler from "./CommandHandler";
import Help from "./commands/Help";
import Clear from "./commands/Clear";
import Prefix from "./commands/Prefix";

class Registry {
    public static registerAll(){
        this.registerCommands();
    }

    public static registerCommands(){
        let cmdHandler = CommandHandler.Instance;
        cmdHandler.addCommand(new Help());
        cmdHandler.addCommand(new Clear());
        cmdHandler.addCommand(new Prefix());
    }
}

export default Registry;
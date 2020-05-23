import CommandHandler from "./CommandHandler";
import Help from "./commands/Help";

class Registry {
    public static registerAll(){
        this.registerCommands();
    }

    public static registerCommands(){
        CommandHandler.Instance.addCommand(new Help());
    }
}

export default Registry;
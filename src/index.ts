import DB from "./classes/DB";
import ConfigHandler from "./classes/ConfigHandler";
import Log from "./classes/Log";
import BOT from "./classes/BOT";
import CommandHandler from "./classes/CommandHandler";

// Init bot client
BOT.init("online").login(process.env.TOKEN).then(() => {

    // Load singletons and handlers
    Log.init().then(() => Log.sendInfo("Der Bergflix Bot wurde gestartet", "Neustart")).catch(console.error);
    ConfigHandler.init();
    CommandHandler.init().then(() => console.log("Commands loaded")).catch(console.error);

    console.log("Bot is ready");
}).catch(err => {
    console.error("Failed to load Bot", err);
    process.exit(1);
});

// Cleanup on exit
process.on("exit", code => {
    console.log("About to exit with code", code);
    BOT.Client.destroy();
    console.log("Destroyed bot client");
    DB.Connection.close();
    console.log("Closed database connection");
});

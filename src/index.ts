import DB from "./classes/DB";
import ConfigHandler from "./classes/ConfigHandler";
import Log from "./classes/Log";
import BOT from "./classes/Bot";
import CommandHandler from "./classes/CommandHandler";
import Registry from "./classes/Registry";

// Init db connection
DB.init();

// Init bot client
BOT.init("online");
BOT.Client.login(process.env.TOKEN).then(() => {

    // Load singletons and handlers
    Log.init().then(() => Log.sendInfo("Der Bergflix Bot wurde gestartet", "Neustart"));
    ConfigHandler.init();
    CommandHandler.init();
    Registry.registerAll();

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

/**
 *
 * Init constants
 */
const sqlite = require('sqlite');
const {SQLiteProvider, CommandoClient} = require('discord.js-commando');
const config = require('./config.json');
const path = require("path");
const {botMessage, botError, findReactionRoleRules} = require("./misc.js");
const token = process.env.TOKEN || config.token;

/**
 *
 * Create bot client
 */
const client = new CommandoClient({
    commandPrefix: "!",
    commandEditableDuration: 30,
    nonCommandEditable: true,
    owner: ["363748825141215242", "209273933461979136"],
    invite: "https://discord.gg/JP9UKrW",
    unknownCommandResponse: false
});

/**
 *
 * Load settings DB
 */
client.setProvider(sqlite.open(path.join(__dirname, "settings.sqlite3")).then(db => new SQLiteProvider(db))).catch(console.error);

/**
 *
 * Startup routine
 */
client.on("ready", async () => {
    try {
        await client.user.setPresence({game: {name: "Bergflix.de", url: "https://bergflix.de", type: "WATCHING"}, status: "online"});
        console.log("Bot presence successfully set");

        Object.keys(config.reactions).forEach(cnl => {
            Object.keys(config.reactions[cnl]).forEach(msg => {
                client.channels.get(cnl).fetchMessage(msg).catch(console.error);
            });
        });
        console.log("Cached reaction messages.");

        await botMessage(client.channels.get(config.channels.bot), "Neustart", "Der Discord-Bot wurde neu gestartet!");
        console.log(`Bot successfully started.`);
    } catch(e) {
        await botError(client.channels.get(config.channels.bot), e);
    }
});

/**
 *
 * React with Emote (x) to Message (y) in channel (xy) to get role (z)
 * - See config for this details
 */
client.on("messageReactionAdd", async (reaction, user) => {
    if(!user || user.bot || !reaction.message.guild) return;

    let roles = findReactionRoleRules(reaction.message, reaction.emoji);

    roles.forEach(role => {
        let roleObj = reaction.message.guild.roles.find(r => r.name === role);
        reaction.message.guild.member(user).roles.forEach(role => {if(role === roleObj) roleObj = null;});
        roleObj && handleRole(reaction.message.guild.member(user), roleObj);
    })
});

/**
 *
 * Remove role when reaction is removed
 */
client.on("messageReactionRemove", async (reaction, user) => {
    if(!user || user.bot || !reaction.message.guild) return;

    findReactionRoleRules(reaction.message, reaction.emoji).forEach(role => {
        let roleObj = reaction.message.guild.roles.find(r => r.name === role);
        roleObj && handleRole(reaction.message.guild.member(user), roleObj, true);
    })
});

function handleRole(member, role, remove = false){
    let promise;
    if(remove) promise = member.removeRole(role);
    else promise = member.addRole(role);

    promise.then(() => {
        return botMessage(client.channels.get(config.channels.bot), "Rollen", `<@${member.id}> wurde die Rolle ${role} ${remove ? "entzogen" : "gegeben"}.`);
    }).catch(e => {
        console.error("Error", e);
        botError(client.channels.get(config.channels.bot), e);
    });
}

/**
 *
 * Register all commands
 */
const Help = require("./override/help.js");
client.registry
    .registerDefaults()
    .registerGroups([
        ["basic", "Basics"]
    ])
    .registerCommandsIn(path.join(__dirname, 'commands'));
client.registry.reregisterCommand(Help, client.registry.findCommands('help', true)[0]);

const UnknownCommand = require("./override/unknown.js");
client.on("unknownCommand", msg => new UnknownCommand(client).run(msg, "", false));

/**
 *
 * Log bot onto Server
 */
client.login(token).then(() => console.log("Bot logged onto server")).catch(err => console.error("Error:", err));

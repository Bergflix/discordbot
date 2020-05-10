const {RichEmbed} = require("discord.js");
const config = require("./config.json");

function newEmbed(title = "", text = "", thumbnail = ""){
    return new RichEmbed()
        .setColor(0xCC0033)
        .setThumbnail(thumbnail || config.icons.logo)
        .setAuthor("Bergflix")
        .setTitle(title)
        .setDescription(text);
}

module.exports = {
    newEmbed: newEmbed,
    botMessage(channel, title, text){
        return channel.send(newEmbed(title, text));
    },
    botError(channel, error){
        return channel.send("@everyone", newEmbed("FEHLER", `Es trat ein **Fehler** auf:\n**${error}**`));
    },
    botAnswer(channel, title, text, thumbnail = ""){
        return channel.send(newEmbed(title, text, thumbnail));
    },
    botDmUser(user, title, text){
        return user.send(newEmbed(title, text));
    },
    findReactionRoleRules(message, emoji){
        let roles = [];
        Object.keys(config.reactions).forEach(cnl => {
            let tmpRoles = config.reactions[cnl][message.id];
            tmpRoles && tmpRoles.forEach(rule => {
                if(rule.emote === emoji.name || rule.emote === emoji.id) roles.push(rule.role);
            });
        });
        return roles;
    }
};

const Discord = require("discord.js");
const { readdirSync } = require("fs");
const { botColour } = require('../../config.json')
const version = ('1.0')

module.exports = {
    name: 'help',
    usage: "help <cmd>",
    description: 'Get Help',
    category: "Utility",
    aliases: "h",
    execute(message, client, args) {
        try {
            if (args[0]) {
                const command = client.commands.get(args[0]);
                if (!command) {
                    return message.channel.send("Unknown Command: " + args[0]);
                }
                const embed = new Discord.MessageEmbed()
                    .setAuthor(command.name, client.user.displayAvatarURL())
                    .addField("Description", command.description || "No Description", false)
                    .addField("Usage", command.usage || "Not Provied", false)
                    .addField("aliases", command.aliases || "No Aliases", false)
                    .setThumbnail(client.user.displayAvatarURL())
                    .setColor(botColour)
                    .setFooter(client.user.username, client.user.displayAvatarURL());
                return message.channel.send(embed);
            } else {
                const commands = client.commands;
                let helpem = new Discord.MessageEmbed()
                    .setDescription(`${client.user.username} | Command Amount: ${client.commands.size}`)
                    .setColor(botColour)
                    .setFooter(client.user.username, client.user.displayAvatarURL())


                let com = {};
                for (let comm of commands.array()) {
                    let category = comm.category || "No Category";
                    let name = comm.name;

                    if (!com[category]) {
                        com[category] = [];
                    }
                    com[category].push(name);

                }

                for (const [key, value] of Object.entries(com)) {
                    let category = key;

                    let desc = "`" + value.join("`, `") + "`";

                    helpem.addField(`${category.toUpperCase()} [${value.length}]`, desc);

                }
                return message.channel.send(helpem);

            }
        } catch (err) {
            console.log(err);
            message.reply(`There was a error when running the command`);
        }
    }
}

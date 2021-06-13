import * as Discord from "discord.js";
import * as ConfigFile from "./config";
import { IBotCommand } from "./api";

import { JsonDB } from 'node-json-db';
import { locationData } from "./data/locationData";

console.log("Running version " + ConfigFile.config.version);
const client: Discord.Client = new Discord.Client();

const userdb = new JsonDB("userData", true, true);
const botdb = new JsonDB("botData", true, true);

let commands: IBotCommand[] = [];

loadCommands(`${__dirname}/commands`);
// RECIPES - CRAFTING
// FUNCTIONS - USING ITEMS

// RED - SETTINGS
// GOLD - MONEY
// BLACK - TRAVELLING
// ORANGE - LOSING SOMETHING
// WHITE - STOCKS
// BLUE - GAIN ITEMS
// GREY - INFO
client.on("ready", () => {
    console.log("Starting up");

    // Set bot activity
    if (ConfigFile.config.locked == false) {
        client.user?.setActivity(`${ConfigFile.config.prefix}help with Raph`, {type: "PLAYING"});
    } else {
        client.user?.setActivity(`${ConfigFile.config.prefix}fix with Raph`, {type: "PLAYING"});
    }
    let guilds = client.guilds.cache.array();
    for (let i = 0; i < guilds.length; i++) {
        if (guilds[i].available) {
            guilds[i].members.fetch().then(members => {
                let memberAr = members.array();
                for (let u = 0; u < memberAr.length; u++) {
                    if (!memberAr[u].user.bot) {
                        if (!userdb.exists("/users/" + memberAr[u].id)) {
                            userdb.push("/users/" + memberAr[u].id, {money: 10, location: locationData.locations[0], maxHealth: 10, maxStorage: 30, health: 10, equipped: {}, items: {}});
                        }
                        if (!userdb.exists(`/users/${memberAr[u].id}/money`)) {
                            userdb.push("/users/" + memberAr[u].id, {money: 10}, false);
                        }
                        if (!userdb.exists(`/users/${memberAr[u].id}/items`)) {
                            userdb.push("/users/" + memberAr[u].id, {items: {}}, false);
                        }
                        if (!userdb.exists(`/users/${memberAr[u].id}/location`)) {
                            userdb.push("/users/" + memberAr[u].id, {location: locationData.locations[0]}, false);
                        }
                        if (!userdb.exists(`/users/${memberAr[u].id}/equpped`)) {
                            userdb.push("/users/" + memberAr[u].id, {equipped: {}}, false);
                        }
                        if (!userdb.exists(`/users/${memberAr[u].id}/maxHealth`)) {
                            userdb.push("/users/" + memberAr[u].id, {maxHealth: 10}, false);
                        }
                        if (!userdb.exists(`/users/${memberAr[u].id}/maxStorage`)) {
                            userdb.push("/users/" + memberAr[u].id, {maxStorage: 30}, false);
                        }
                        if (!userdb.exists(`/users/${memberAr[u].id}/health`)) {
                            userdb.push("/users/" + memberAr[u].id, {health: 10}, false);
                        }
                    }
                }
            });
        }
    }

    // Print that the bot is online
    console.log("Started up");
});

client.on("guildMemberAdd", member => {
    if (!userdb.exists("/users/" + member.id)) {
        if (!member.user.bot) {
            userdb.push("/users/" + member.id, {money: 10, location: locationData.locations[0], maxHealth: 10, maxStorage: 30, health: 10, equipped: {}, items: {}});
        }
    }
});

client.on("message", msg => {
    if (msg.author.bot && msg.content.startsWith("no ")) {
        msg.reply("Hah, failure")
        .then(msg => {
            (msg as Discord.Message).delete({timeout: 10000});
        });
    }
    // Ignore messages sent by the bot
    if (msg.author.bot) { return; }

    // Ignore messages sent in dms
    if (msg.channel.type == "dm") { return; }

    // Ignore messages sent without the prefix
    botdb.reload();
    let prefix = "";
    if (botdb.exists(`/prefixes/${msg.guild?.id}`)) {
        if (!msg.content.startsWith(botdb.getData(`/prefixes/${msg.guild?.id}`))) { return; }
        prefix = botdb.getData(`/prefixes/${msg.guild?.id}`);
    } else {
        if (!msg.content.startsWith(ConfigFile.config.prefix)) { return; }
        prefix = ConfigFile.config.prefix;
    }

    // Handle command
    handleCommand(msg, prefix);
});

async function handleCommand(msg: Discord.Message, prefix: string) {
    // Check if bot is locked, if it is only raph can run commands
    if (msg.author.id !== ConfigFile.config.raphid && ConfigFile.config.locked === true) {
        return;
    }
    // Split string into the command and args 
    let command = msg.content.split(" ")[0].replace(prefix, "").toLowerCase();
    let args = msg.content.split(" ").slice(1);

    // Loop through loaded commands
    for (const commandsClass of commands) {
        // Attempt to execute code
        try {
            let isCommand = false;
            for (const element of commandsClass.thisCommand()) {
                if (command == element) {
                    isCommand = true;
                }
            }
            // Check command class is the correct one
            if (!isCommand) {
                // Go to next iteration
                continue;
            }
            // Pause excecution while we run command
            await commandsClass.runCommand(args, msg, client, commands);
        } catch (exception) {
            // If there is an error, print exception
            console.log(exception);
        }
    }
}

// Loads commands
function loadCommandList(commandsPath: string, commandsArray: string[]) {
    // Loop through commands
    for (const commandName of commandsArray) {
        const commandsClass = require(`${__dirname}/${commandsPath}/${commandName}`).default;

        const command = new commandsClass() as IBotCommand;
        commands.push(command);
    }
}

// Loads all commands
function loadCommands(commandsPath: string) {
    // Exit if there are no commands
    if (!ConfigFile.config) { return; }

    loadCommandList("settingcommands", ConfigFile.config.settingcommands);
    loadCommandList("commands", ConfigFile.config.commands);
}

// Ticks every 5 seconds
client.setInterval(function() {
    tick();
}, 5000);

function tick() {
    userdb.reload();
    for (const element in userdb.getData(`/users/`)) {
        if (userdb.exists(`/users/${element}/cooldown`)) {
            if (ConfigFile.config.cooldown) {
                let cooldown = userdb.getData(`/users/${element}/cooldown`) - 5;
                if (cooldown <= 0) {
                    userdb.delete(`/users/${element}/cooldown`);
                } else {
                    userdb.push(`/users/${element}/cooldown`, cooldown);
                }
            } else {
                userdb.delete(`/users/${element}/cooldown`);
            }
        }
    }
}

client.login(ConfigFile.config.token);
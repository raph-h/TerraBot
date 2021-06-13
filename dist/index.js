"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Discord = require("discord.js");
const ConfigFile = require("./config");
const node_json_db_1 = require("node-json-db");
const locationData_1 = require("./data/locationData");
console.log("Running version " + ConfigFile.config.version);
const client = new Discord.Client();
const userdb = new node_json_db_1.JsonDB("userData", true, true);
const botdb = new node_json_db_1.JsonDB("botData", true, true);
let commands = [];
loadCommands(`${__dirname}/commands`);
client.on("ready", () => {
    var _a, _b;
    console.log("Starting up");
    if (ConfigFile.config.locked == false) {
        (_a = client.user) === null || _a === void 0 ? void 0 : _a.setActivity(`${ConfigFile.config.prefix}help with Raph`, { type: "PLAYING" });
    }
    else {
        (_b = client.user) === null || _b === void 0 ? void 0 : _b.setActivity(`${ConfigFile.config.prefix}fix with Raph`, { type: "PLAYING" });
    }
    let guilds = client.guilds.cache.array();
    for (let i = 0; i < guilds.length; i++) {
        if (guilds[i].available) {
            guilds[i].members.fetch().then(members => {
                let memberAr = members.array();
                for (let u = 0; u < memberAr.length; u++) {
                    if (!memberAr[u].user.bot) {
                        if (!userdb.exists("/users/" + memberAr[u].id)) {
                            userdb.push("/users/" + memberAr[u].id, { money: 10, location: locationData_1.locationData.locations[0], maxHealth: 10, maxStorage: 30, health: 10, equipped: {}, items: {} });
                        }
                        if (!userdb.exists(`/users/${memberAr[u].id}/money`)) {
                            userdb.push("/users/" + memberAr[u].id, { money: 10 }, false);
                        }
                        if (!userdb.exists(`/users/${memberAr[u].id}/items`)) {
                            userdb.push("/users/" + memberAr[u].id, { items: {} }, false);
                        }
                        if (!userdb.exists(`/users/${memberAr[u].id}/location`)) {
                            userdb.push("/users/" + memberAr[u].id, { location: locationData_1.locationData.locations[0] }, false);
                        }
                        if (!userdb.exists(`/users/${memberAr[u].id}/equpped`)) {
                            userdb.push("/users/" + memberAr[u].id, { equipped: {} }, false);
                        }
                        if (!userdb.exists(`/users/${memberAr[u].id}/maxHealth`)) {
                            userdb.push("/users/" + memberAr[u].id, { maxHealth: 10 }, false);
                        }
                        if (!userdb.exists(`/users/${memberAr[u].id}/maxStorage`)) {
                            userdb.push("/users/" + memberAr[u].id, { maxStorage: 30 }, false);
                        }
                        if (!userdb.exists(`/users/${memberAr[u].id}/health`)) {
                            userdb.push("/users/" + memberAr[u].id, { health: 10 }, false);
                        }
                    }
                }
            });
        }
    }
    console.log("Started up");
});
client.on("guildMemberAdd", member => {
    if (!userdb.exists("/users/" + member.id)) {
        if (!member.user.bot) {
            userdb.push("/users/" + member.id, { money: 10, location: locationData_1.locationData.locations[0], maxHealth: 10, maxStorage: 30, health: 10, equipped: {}, items: {} });
        }
    }
});
client.on("message", msg => {
    var _a, _b, _c;
    if (msg.author.bot && msg.content.startsWith("no ")) {
        msg.reply("Hah, failure")
            .then(msg => {
            msg.delete({ timeout: 10000 });
        });
    }
    if (msg.author.bot) {
        return;
    }
    if (msg.channel.type == "dm") {
        return;
    }
    botdb.reload();
    let prefix = "";
    if (botdb.exists(`/prefixes/${(_a = msg.guild) === null || _a === void 0 ? void 0 : _a.id}`)) {
        if (!msg.content.startsWith(botdb.getData(`/prefixes/${(_b = msg.guild) === null || _b === void 0 ? void 0 : _b.id}`))) {
            return;
        }
        prefix = botdb.getData(`/prefixes/${(_c = msg.guild) === null || _c === void 0 ? void 0 : _c.id}`);
    }
    else {
        if (!msg.content.startsWith(ConfigFile.config.prefix)) {
            return;
        }
        prefix = ConfigFile.config.prefix;
    }
    handleCommand(msg, prefix);
});
function handleCommand(msg, prefix) {
    return __awaiter(this, void 0, void 0, function* () {
        if (msg.author.id !== ConfigFile.config.raphid && ConfigFile.config.locked === true) {
            return;
        }
        let command = msg.content.split(" ")[0].replace(prefix, "").toLowerCase();
        let args = msg.content.split(" ").slice(1);
        for (const commandsClass of commands) {
            try {
                let isCommand = false;
                for (const element of commandsClass.thisCommand()) {
                    if (command == element) {
                        isCommand = true;
                    }
                }
                if (!isCommand) {
                    continue;
                }
                yield commandsClass.runCommand(args, msg, client, commands);
            }
            catch (exception) {
                console.log(exception);
            }
        }
    });
}
function loadCommandList(commandsPath, commandsArray) {
    for (const commandName of commandsArray) {
        const commandsClass = require(`${__dirname}/${commandsPath}/${commandName}`).default;
        const command = new commandsClass();
        commands.push(command);
    }
}
function loadCommands(commandsPath) {
    if (!ConfigFile.config) {
        return;
    }
    loadCommandList("settingcommands", ConfigFile.config.settingcommands);
    loadCommandList("commands", ConfigFile.config.commands);
}
client.setInterval(function () {
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
                }
                else {
                    userdb.push(`/users/${element}/cooldown`, cooldown);
                }
            }
            else {
                userdb.delete(`/users/${element}/cooldown`);
            }
        }
    }
}
client.login(ConfigFile.config.token);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBc0M7QUFDdEMsdUNBQXVDO0FBR3ZDLCtDQUFzQztBQUN0QyxzREFBbUQ7QUFFbkQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsR0FBRyxVQUFVLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQzVELE1BQU0sTUFBTSxHQUFtQixJQUFJLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQUVwRCxNQUFNLE1BQU0sR0FBRyxJQUFJLHFCQUFNLENBQUMsVUFBVSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztBQUNsRCxNQUFNLEtBQUssR0FBRyxJQUFJLHFCQUFNLENBQUMsU0FBUyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztBQUVoRCxJQUFJLFFBQVEsR0FBa0IsRUFBRSxDQUFDO0FBRWpDLFlBQVksQ0FBQyxHQUFHLFNBQVMsV0FBVyxDQUFDLENBQUM7QUFXdEMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsR0FBRyxFQUFFOztJQUNwQixPQUFPLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBRzNCLElBQUksVUFBVSxDQUFDLE1BQU0sQ0FBQyxNQUFNLElBQUksS0FBSyxFQUFFO1FBQ25DLE1BQUEsTUFBTSxDQUFDLElBQUksMENBQUUsV0FBVyxDQUFDLEdBQUcsVUFBVSxDQUFDLE1BQU0sQ0FBQyxNQUFNLGdCQUFnQixFQUFFLEVBQUMsSUFBSSxFQUFFLFNBQVMsRUFBQyxDQUFDLENBQUM7S0FDNUY7U0FBTTtRQUNILE1BQUEsTUFBTSxDQUFDLElBQUksMENBQUUsV0FBVyxDQUFDLEdBQUcsVUFBVSxDQUFDLE1BQU0sQ0FBQyxNQUFNLGVBQWUsRUFBRSxFQUFDLElBQUksRUFBRSxTQUFTLEVBQUMsQ0FBQyxDQUFDO0tBQzNGO0lBQ0QsSUFBSSxNQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDekMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDcEMsSUFBSSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxFQUFFO1lBQ3JCLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFO2dCQUNyQyxJQUFJLFFBQVEsR0FBRyxPQUFPLENBQUMsS0FBSyxFQUFFLENBQUM7Z0JBQy9CLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO29CQUN0QyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUU7d0JBQ3ZCLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUU7NEJBQzVDLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBQyxLQUFLLEVBQUUsRUFBRSxFQUFFLFFBQVEsRUFBRSwyQkFBWSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLFVBQVUsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRSxRQUFRLEVBQUUsRUFBRSxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUMsQ0FBQyxDQUFDO3lCQUNqSzt3QkFDRCxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxVQUFVLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxFQUFFOzRCQUNsRCxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUMsS0FBSyxFQUFFLEVBQUUsRUFBQyxFQUFFLEtBQUssQ0FBQyxDQUFDO3lCQUMvRDt3QkFDRCxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxVQUFVLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxFQUFFOzRCQUNsRCxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUMsS0FBSyxFQUFFLEVBQUUsRUFBQyxFQUFFLEtBQUssQ0FBQyxDQUFDO3lCQUMvRDt3QkFDRCxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxVQUFVLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLFdBQVcsQ0FBQyxFQUFFOzRCQUNyRCxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUMsUUFBUSxFQUFFLDJCQUFZLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFDLEVBQUUsS0FBSyxDQUFDLENBQUM7eUJBQ3pGO3dCQUNELElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLFVBQVUsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsVUFBVSxDQUFDLEVBQUU7NEJBQ3BELE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBQyxRQUFRLEVBQUUsRUFBRSxFQUFDLEVBQUUsS0FBSyxDQUFDLENBQUM7eUJBQ2xFO3dCQUNELElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLFVBQVUsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsWUFBWSxDQUFDLEVBQUU7NEJBQ3RELE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxHQUFHLFFBQVEs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
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.food = exports.fightTurn = exports.specialItems = void 0;
const discord_js_1 = require("discord.js");
const utils_1 = require("../utils");
exports.specialItems = [
    {
        "name": "Stone Spear",
        "function": function (msgObject, fight, args, userdb) {
            userdb.reload();
            if (!fight) {
                msgObject.reply("You can only use this item in a fight")
                    .then(msg => {
                    msg.delete({ timeout: 60000 });
                });
                return false;
            }
            else {
                fightTurn(1, userdb, msgObject, this.name);
                return true;
            }
        }
    },
    {
        "name": "Wooden Sword",
        "function": function (msgObject, fight, args, userdb) {
            userdb.reload();
            if (!fight) {
                msgObject.reply("You can only use this item in a fight")
                    .then(msg => {
                    msg.delete({ timeout: 60000 });
                });
                return false;
            }
            else {
                fightTurn(2, userdb, msgObject, this.name);
                return true;
            }
        }
    },
    {
        "name": "Metal Pickaxe",
        "function": function (msgObject, fight, args, userdb) {
            userdb.reload();
            if (fight) {
                fightTurn(4, userdb, msgObject, this.name);
            }
            else {
                let embed = new discord_js_1.MessageEmbed()
                    .setColor("BLUE")
                    .setTitle(`${msgObject.author.username}'s Mining Trip`)
                    .setFooter("mmm, free rocks");
                if (Math.random() * 2 > 1.5) {
                    let random = Math.floor(Math.random() * 100);
                    let item = "";
                    if (random < 75) {
                        item = "Rock";
                    }
                    else if (random < 98) {
                        item = "Metal Ore";
                    }
                    else if (random <= 100) {
                        item = "Rare Metal Ore";
                    }
                    embed.addField("You mined a: ", item);
                    utils_1.addItem(`/users/${msgObject.author.id}/items/${item}`, userdb, 1);
                    msgObject.reply(embed)
                        .then(msg => {
                        msg.delete({ timeout: 60000 });
                    });
                }
                else {
                    msgObject.reply("You couldn't find anything to mine")
                        .then(msg => {
                        msg.delete({ timeout: 60000 });
                    });
                }
            }
            return true;
        }
    },
    {
        "name": "Wooden Fishing Rod",
        "function": function (msgObject, fight, args, userdb) {
            userdb.reload();
            if (fight) {
                msgObject.reply("You reeled your opponent closer")
                    .then(msg => {
                    msg.delete({ timeout: 60000 });
                });
            }
            else {
                let random = Math.floor(Math.random() * 100);
                let embed = new discord_js_1.MessageEmbed()
                    .setColor("BLUE")
                    .setTitle(`${msgObject.author.username}'s Fishing Session`)
                    .setFooter("mmm, free aquatic objects");
                let item = "";
                if (random < 25) {
                    item = "";
                }
                else if (random < 75) {
                    item = "Fish";
                }
                else if (random < 98) {
                    item = "Rare Fish";
                }
                else if (random <= 100) {
                    embed.setColor("GOLD");
                    embed.addField("You fished up: ", Math.floor(Math.random() * 10) + " gold");
                    msgObject.reply(embed)
                        .then(msg => {
                        msg.delete({ timeout: 60000 });
                    });
                    return true;
                }
                if (item == "") {
                    msgObject.reply("You didn't fish up anything")
                        .then(msg => {
                        msg.delete({ timeout: 60000 });
                    });
                    return true;
                }
                utils_1.addItem(`/users/${msgObject.author.id}/items/${item}`, userdb, 1);
                embed.addField("You fished up: ", item);
                msgObject.reply(embed)
                    .then(msg => {
                    msg.delete({ timeout: 60000 });
                });
            }
            return true;
        }
    },
    {
        "name": "Apple",
        "function": function (msgObject, fight, args, userdb) {
            return food("You ate an apple and gained 1 health points", userdb, this.name, msgObject, 1);
        }
    },
    {
        "name": "Bread",
        "function": function (msgObject, fight, args, userdb) {
            return food("You ate a piece of bread and gained 2 health points", userdb, this.name, msgObject, 2);
        }
    },
    {
        "name": "Apple Pie",
        "function": function (msgObject, fight, args, userdb) {
            return food("You ate an apple pie, it fills you with health", userdb, this.name, msgObject, 5);
        }
    },
    {
        "name": "Ancient Part",
        "function": function (msgObject, fight, args, userdb) {
            return true;
        }
    },
    {
        "name": "Book",
        "function": function (msgObject, fight, args, userdb) {
            return true;
        }
    },
    {
        "name": "Mac-Book",
        "function": function (msgObject, fight, args, userdb) {
            return true;
        }
    },
    {
        "name": "PC",
        "function": function (msgObject, fight, args, userdb) {
            return true;
        }
    },
    {
        "name": "TerraBot",
        "function": function (msgObject, fight, args, userdb) {
            return true;
        }
    },
    {
        "name": "Small bag",
        "function": function (msgObject, fight, args, userdb) {
            userdb.reload();
            if (userdb.getData(`/users/${msgObject.author.id}/maxStorage`) > 30) {
                msgObject.reply("You already have the same or bigger bag than this one")
                    .then(msg => {
                    msg.delete({ timeout: 60000 });
                });
                return false;
            }
            userdb.push(`/users/${msgObject.author.id}/maxStorage`, 40);
            if (userdb.exists(`/users/${msgObject.author.id}/equipped/back`)) {
                utils_1.addItem(`/users/${msgObject.author.id}/items/${userdb.getData(`/users/${msgObject.author.id}/equipped/back`)}`, userdb, 1);
            }
            userdb.push(`/users/${msgObject.author.id}/equipped/back`, this.name);
            utils_1.removeItem(`/users/${msgObject.author.id}/items/${this.name}`, userdb, 1);
            msgObject.reply("You equipped a small bag")
                .then(msg => {
                msg.delete({ timeout: 60000 });
            });
            return true;
        }
    },
    {
        "name": "Medium bag",
        "function": function (msgObject, fight, args, userdb) {
            userdb.reload();
            if (userdb.getData(`/users/${msgObject.author.id}/maxStorage`) > 40) {
                msgObject.reply("You already have the same or bigger bag than this one")
                    .then(msg => {
                    msg.delete({ timeout: 60000 });
                });
                return false;
            }
            userdb.push(`/users/${msgObject.author.id}/maxStorage`, 50);
            if (userdb.exists(`/users/${msgObject.author.id}/equipped/back`)) {
                utils_1.addItem(`/users/${msgObject.author.id}/items/${userdb.getData(`/users/${msgObject.author.id}/equipped/back`)}`, userdb, 1);
            }
            userdb.push(`/users/${msgObject.author.id}/equipped/back`, this.name);
            utils_1.removeItem(`/users/${msgObject.author.id}/items/${this.name}`, userdb, 1);
            msgObject.reply("You equipped a medium bag")
                .then(msg => {
                msg.delete({ timeout: 60000 });
            });
            return true;
        }
    }
];
function fightTurn(damage, userdb, msgObject, name) {
    userdb.reload();
    let user = userdb.getData(`/users/${msgObject.author.id}`);
    let otherUser = userdb.getData(`/users/${user.fight}`);
    utils_1.hurt(damage, userdb, `/users/${user.fight}`);
    msgObject.reply("You striked your opponent with a " + name)
        .then(msg => {
        msg.delete({ timeout: 60000 });
    });
    userdb.reload();
    if (otherUser.health > 0) {
        msgObject.reply("Your opponent has " + (otherUser.health - damage) + " health")
            .then(msg => {
            msg.delete({ timeout: 60000 });
        });
        return;
    }
    userdb.push(`/users/${msgObject.author.id}/money`, user.money + Math.floor(otherUser.money / 2) + 5);
    userdb.push(`/users/${user.fight}/money`, otherUser.money - Math.floor(otherUser.money / 2));
    let embed = new discord_js_1.MessageEmbed()
        .setColor("RED")
        .setTitle(msgObject.author.username + " has won!")
        .setFooter("One shall lose while one shall win")
        .addField("Your remaining health: ", userdb.getData(`/users/${msgObject.author.id}/health`))
        .setDescription("You won " + Math.floor(otherUser.money / 2) + " gold");
    userdb.delete(`/users/${msgObject.author.id}/fight`);
    userdb.delete(`/users/${user.fight}/fight`);
    userdb.push(`/users/${user.fight}/health`, userdb.getData(`/users/${user.fight}/maxHealth`) / 2);
    msgObject.channel.send(embed)
        .then(msg => {
        msg.delete({ timeout: 60000 });
    });
}
exports.fightTurn = fightTurn;
;
function food(message, userdb, itemName, msgObject, health) {
    userdb.reload();
    utils_1.hurt(-health, userdb, `/users/${msgObject.author.id}`);
    utils_1.removeItem(`/users/${msgObject.author.id}/items/${itemName}`, userdb, 1);
    msgObject.reply(message + "")
        .then(msg => {
        msg.delete({ timeout: 60000 });
    });
    return true;
}
exports.food = food;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3BlY2lhbEl0ZW1EYXRhLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2RhdGEvc3BlY2lhbEl0ZW1EYXRhLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDJDQUFtRDtBQUVuRCxvQ0FBcUQ7QUFDMUMsUUFBQSxZQUFZLEdBQUc7SUFFdEI7UUFDSSxNQUFNLEVBQUUsYUFBYTtRQUNyQixVQUFVLEVBQUUsVUFBUyxTQUFrQixFQUFFLEtBQWMsRUFBRSxJQUFjLEVBQUUsTUFBVztZQUNoRixNQUFNLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDaEIsSUFBSSxDQUFDLEtBQUssRUFBRTtnQkFDUixTQUFTLENBQUMsS0FBSyxDQUFDLHVDQUF1QyxDQUFDO3FCQUN2RCxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUU7b0JBQ1AsR0FBZSxDQUFDLE1BQU0sQ0FBQyxFQUFDLE9BQU8sRUFBRSxLQUFLLEVBQUMsQ0FBQyxDQUFDO2dCQUM5QyxDQUFDLENBQUMsQ0FBQztnQkFDSCxPQUFPLEtBQUssQ0FBQzthQUNoQjtpQkFBTTtnQkFDSCxTQUFTLENBQUMsQ0FBQyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUMzQyxPQUFPLElBQUksQ0FBQzthQUNmO1FBQ0wsQ0FBQztLQUNKO0lBQ0Q7UUFDSSxNQUFNLEVBQUUsY0FBYztRQUN0QixVQUFVLEVBQUUsVUFBUyxTQUFrQixFQUFFLEtBQWMsRUFBRSxJQUFjLEVBQUUsTUFBVztZQUNoRixNQUFNLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDaEIsSUFBSSxDQUFDLEtBQUssRUFBRTtnQkFDUixTQUFTLENBQUMsS0FBSyxDQUFDLHVDQUF1QyxDQUFDO3FCQUN2RCxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUU7b0JBQ1AsR0FBZSxDQUFDLE1BQU0sQ0FBQyxFQUFDLE9BQU8sRUFBRSxLQUFLLEVBQUMsQ0FBQyxDQUFDO2dCQUM5QyxDQUFDLENB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
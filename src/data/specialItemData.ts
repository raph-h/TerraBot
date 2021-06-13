import { Message, MessageEmbed } from "discord.js";
import { JsonDB } from "node-json-db";
import { addItem, hurt, removeItem } from "../utils";
export let specialItems = [
    // Tools
    {
        "name": "Stone Spear",
        "function": function(msgObject: Message, fight: boolean, args: String[], userdb: any): boolean {
            userdb.reload();
            if (!fight) {
                msgObject.reply("You can only use this item in a fight")
                .then(msg => {
                    (msg as Message).delete({timeout: 60000});
                });
                return false;
            } else {
                fightTurn(1, userdb, msgObject, this.name);
                return true;
            }
        }
    },
    {
        "name": "Wooden Sword",
        "function": function(msgObject: Message, fight: boolean, args: String[], userdb: any): boolean {
            userdb.reload();
            if (!fight) {
                msgObject.reply("You can only use this item in a fight")
                .then(msg => {
                    (msg as Message).delete({timeout: 60000});
                });
                return false;
            } else {
                fightTurn(2, userdb, msgObject, this.name);
                return true;
            }
        }
    },
    {
        "name": "Metal Pickaxe",
        "function": function(msgObject: Message, fight: boolean, args: String[], userdb: any): boolean {
            userdb.reload();
            if (fight) {
                fightTurn(4, userdb, msgObject, this.name);
            } else {
                let embed = new MessageEmbed()
                        .setColor("BLUE")
                        .setTitle(`${msgObject.author.username}'s Mining Trip`)
                        .setFooter("mmm, free rocks")

                if (Math.random() * 2 > 1.5) {
                    let random = Math.floor(Math.random() * 100);
                    let item = "";
                    if (random < 75) {
                        item = "Rock";
                    } else if (random < 98) {
                        item = "Metal Ore";
                    } else if (random <= 100) {
                        item = "Rare Metal Ore";
                    }
                    embed.addField("You mined a: ", item);
                    addItem(`/users/${msgObject.author.id}/items/${item}`, userdb, 1);
                    msgObject.reply(embed)
                    .then(msg => {
                        (msg as Message).delete({timeout: 60000});
                    });
                } else {
                    msgObject.reply("You couldn't find anything to mine")
                    .then(msg => {
                        (msg as Message).delete({timeout: 60000});
                    });
                }
            }
            return true;
        }
    },
    {
        "name": "Wooden Fishing Rod",
        "function": function(msgObject: Message, fight: boolean, args: String[], userdb: any): boolean {
            userdb.reload();
            if (fight) {
                msgObject.reply("You reeled your opponent closer")
                .then(msg => {
                    (msg as Message).delete({timeout: 60000});
                });
            } else {
                let random = Math.floor(Math.random() * 100);
                let embed = new MessageEmbed()
                    .setColor("BLUE")
                    .setTitle(`${msgObject.author.username}'s Fishing Session`)
                    .setFooter("mmm, free aquatic objects")

                let item = "";
                if (random < 25) {
                    item = "";
                } else if (random < 75) {
                    item = "Fish";
                } else if (random < 98) {
                    item = "Rare Fish";
                } else if (random <= 100) {
                    embed.setColor("GOLD");
                    embed.addField("You fished up: ", Math.floor(Math.random() * 10) + " gold");
                    msgObject.reply(embed)
                    .then(msg => {
                        (msg as Message).delete({timeout: 60000});
                    });
                    return true;
                }
                if (item == "") {
                    msgObject.reply("You didn't fish up anything")
                    .then(msg => {
                        (msg as Message).delete({timeout: 60000});
                    });
                    return true;
                }
                addItem(`/users/${msgObject.author.id}/items/${item}`, userdb, 1);
                embed.addField("You fished up: ", item);
                msgObject.reply(embed)
                .then(msg => {
                    (msg as Message).delete({timeout: 60000});
                });
            }
            return true;
        }
    },
    // Food
    {
        "name": "Apple",
        "function": function(msgObject: Message, fight: boolean, args: String[], userdb: any): boolean {
            return food("You ate an apple and gained 1 health points", userdb, this.name, msgObject, 1);
        }
    },
    {
        "name": "Bread",
        "function": function(msgObject: Message, fight: boolean, args: String[], userdb: any): boolean {
            return food("You ate a piece of bread and gained 2 health points", userdb, this.name, msgObject, 2);
        }
    },
    {
        "name": "Apple Pie",
        "function": function(msgObject: Message, fight: boolean, args: String[], userdb: any): boolean {
            return food("You ate an apple pie, it fills you with health", userdb, this.name, msgObject, 5);
        }
    },
    // Tech
    {
        "name": "Ancient Part",
        "function": function(msgObject: Message, fight: boolean, args: String[], userdb: any): boolean {
            return true;
        }
    },
    {
        "name": "Book",
        "function": function(msgObject: Message, fight: boolean, args: String[], userdb: any): boolean {
            return true;
        }
    },
    {
        "name": "Mac-Book",
        "function": function(msgObject: Message, fight: boolean, args: String[], userdb: any): boolean {
            return true;
        }
    },
    {
        "name": "PC",
        "function": function(msgObject: Message, fight: boolean, args: String[], userdb: any): boolean {
            return true;
        }
    },
    {
        "name": "TerraBot",
        "function": function(msgObject: Message, fight: boolean, args: String[], userdb: any): boolean {
            return true;
        }
    },
    {
        "name": "Small bag",
        "function": function(msgObject: Message, fight: boolean, args: String[], userdb: any): boolean {
            userdb.reload();
            if (userdb.getData(`/users/${msgObject.author.id}/maxStorage`) > 30) {
                msgObject.reply("You already have the same or bigger bag than this one")
                .then(msg => {
                    (msg as Message).delete({timeout: 60000});
                });
                return false;
            }

            userdb.push(`/users/${msgObject.author.id}/maxStorage`, 40);
            if (userdb.exists(`/users/${msgObject.author.id}/equipped/back`)) {
                addItem(`/users/${msgObject.author.id}/items/${userdb.getData(`/users/${msgObject.author.id}/equipped/back`)}`, userdb, 1);
            }
            userdb.push(`/users/${msgObject.author.id}/equipped/back`, this.name);
            removeItem(`/users/${msgObject.author.id}/items/${this.name}`, userdb, 1);
            msgObject.reply("You equipped a small bag")
            .then(msg => {
                (msg as Message).delete({timeout: 60000});
            });
            return true;
        }
    },
    {
        "name": "Medium bag",
        "function": function(msgObject: Message, fight: boolean, args: String[], userdb: any): boolean {
            userdb.reload();
            if (userdb.getData(`/users/${msgObject.author.id}/maxStorage`) > 40) {
                msgObject.reply("You already have the same or bigger bag than this one")
                .then(msg => {
                    (msg as Message).delete({timeout: 60000});
                });
                return false;
            }

            userdb.push(`/users/${msgObject.author.id}/maxStorage`, 50);
            if (userdb.exists(`/users/${msgObject.author.id}/equipped/back`)) {
                addItem(`/users/${msgObject.author.id}/items/${userdb.getData(`/users/${msgObject.author.id}/equipped/back`)}`, userdb, 1);
            }
            userdb.push(`/users/${msgObject.author.id}/equipped/back`, this.name);
            removeItem(`/users/${msgObject.author.id}/items/${this.name}`, userdb, 1);
            msgObject.reply("You equipped a medium bag")
            .then(msg => {
                (msg as Message).delete({timeout: 60000});
            });
            return true;
        }
    }
];

export function fightTurn(damage: number, userdb: JsonDB, msgObject: Message, name: string) {
    userdb.reload();
    let user = userdb.getData(`/users/${msgObject.author.id}`);
    let otherUser = userdb.getData(`/users/${user.fight}`);
    hurt(damage, userdb, `/users/${user.fight}`);
    msgObject.reply("You striked your opponent with a " + name)
    .then(msg => {
        (msg as Message).delete({timeout: 60000});
    });
    userdb.reload();
    if (otherUser.health > 0) {
        msgObject.reply("Your opponent has " + (otherUser.health - damage) + " health")
        .then(msg => {
            (msg as Message).delete({timeout: 60000});
        });
        return;
    }
    userdb.push(`/users/${msgObject.author.id}/money`, user.money + Math.floor(otherUser.money / 2) + 5);
    userdb.push(`/users/${user.fight}/money`, otherUser.money - Math.floor(otherUser.money / 2));

    let embed = new MessageEmbed()
        .setColor("RED")
        .setTitle(msgObject.author.username + " has won!")
        .setFooter("One shall lose while one shall win")
        .addField("Your remaining health: ", userdb.getData(`/users/${msgObject.author.id}/health`) )
        .setDescription("You won " + Math.floor(otherUser.money / 2) + " gold");
    userdb.delete(`/users/${msgObject.author.id}/fight`);
    userdb.delete(`/users/${user.fight}/fight`);
    userdb.push(`/users/${user.fight}/health`, userdb.getData(`/users/${user.fight}/maxHealth`) / 2);
    msgObject.channel.send(embed)
    .then(msg => {
        (msg as Message).delete({timeout: 60000});
    });
};

export function food(message: string, userdb: JsonDB, itemName: string, msgObject: Message, health: number): boolean {
    userdb.reload();
    hurt(-health, userdb, `/users/${msgObject.author.id}`);
    removeItem(`/users/${msgObject.author.id}/items/${itemName}`, userdb, 1);
    msgObject.reply(message + "")
    .then(msg => {
        (msg as Message).delete({timeout: 60000});
    });
    return true;
}
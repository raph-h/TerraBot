import * as Discord from "discord.js";
import { JsonDB } from "node-json-db";
import {IBotCommand} from "../api";
import { craftData } from "../data/craftData";
import { craftModel } from "../models/craftModel";
import { addItem, itemsToString, removeItem } from "../utils";
const db = new JsonDB("userData", true, true);

export default class craft implements IBotCommand {
    private readonly _command = ["craft", "create"];

    help(): string {
        return "This command is to craft items";
    }

    thisCommand(): string[] {
        return this._command;
    }

    async runCommand(args: string[], msgObject: Discord.Message): Promise<void> {
        msgObject.delete();
        db.reload();

        if (db.exists(`/users/${msgObject.author.id}/cooldown`)) {
            if (db.getData(`/users/${msgObject.author.id}/cooldown`) > 0) {
                msgObject.reply(`You have a ${db.getData(`/users/${msgObject.author.id}/cooldown`)} second cooldown`)
                .then(msg => {
                    (msg as Discord.Message).delete({timeout: 60000});
                });
                return;
            }
        }

        let userItems = db.getData(`/users/${msgObject.author.id}/items`);
        let location = db.getData(`/users/${msgObject.author.id}/location`) as string;

        if (args.length < 1) {
            let embed = new Discord.MessageEmbed()
                .setColor("BLUE")
                .setTitle("Craftable items at " + location)
                .setFooter("Terracraft")
            craftData.forEach(element => {
                element = element as craftModel;
                if (location.toLowerCase() == element.craftLocation.toLowerCase()) {
                    let hasItems = true;
                    for (let i = 0; i < element.catalysts.length; i++) {
                        if (!Object.keys(userItems).includes(element.catalysts[i]) && element.catalysts[i] != "") {
                            hasItems = false;
                        }
                    }
                    if (hasItems) {
                        embed.addField(element.item, `Time: ${element.cooldown}\nMaterials: \n${itemsToString(element.materials) + element.catalysts.join(" - 1\n")}`);
                    }
                }
            });
            msgObject.reply(embed)
            .then(msg => {
                (msg as Discord.Message).delete({timeout: 60000});
            });
            return;
        }

        let craft: craftModel = null;
        craftData.forEach(element => {
            element = element as craftModel;
            if (element.item.toLowerCase() == args.join(" ").toLowerCase()) {
                craft = element;
            }
        });

        if (craft == null) {
            msgObject.reply("That is not an item you can craft")
                .then(msg => {
                    (msg as Discord.Message).delete({timeout: 60000});
                });
            return;
        }
        craft = craft as craftModel;

        if (craft.craftLocation.toLowerCase() != db.getData(`/users/${msgObject.author.id}/location`).toLowerCase()) {
            msgObject.reply("You can't craft this item here")
                .then(msg => {
                    (msg as Discord.Message).delete({timeout: 60000});
                });
            return;
        }

        let containsCatalysts = true;
        craft.catalysts.forEach(element => {
            if (element != "") {
                let containItems = false;
                Object.keys(userItems).forEach(itemName => {
                    if (itemName.toLowerCase() == element.toLowerCase()) {
                        containItems = true;
                    }
                });
                if (containItems == false) {
                    containsCatalysts = false;
                }
            }
        });

        if (!containsCatalysts) {
            msgObject.reply("You don't have specified items")
                .then(msg => {
                    (msg as Discord.Message).delete({timeout: 60000});
                });
            return;
        }

        let containsMats = true;
        Object.keys(craft.materials).forEach(element => {
            if (element != "") {
                let containItems = false;
                Object.keys(userItems).forEach(itemName => {
                    if (itemName.toLowerCase() == element.toLowerCase()) {
                        if (userItems[itemName] >= craft.materials[element]) {
                            containItems = true;
                        }
                    }
                });
                if (containItems == false) {
                    containsMats = false;
                }
            }
        });

        if (!containsMats) {
            msgObject.reply("You don't have specified materials")
                .then(msg => {
                    (msg as Discord.Message).delete({timeout: 60000});
                });
            return;
        }

        Object.keys(craft.materials).forEach(element => {
            if (element != "") {
                removeItem(`/users/${msgObject.author.id}/items/${element}`, db, craft.materials[element]);
            }
        });
        addItem(`/users/${msgObject.author.id}/items/${craft.item}`, db, craft.amount);
        db.push(`/users/${msgObject.author.id}/cooldown`, craft.cooldown);
        msgObject.reply(`You crafted ${craft.amount} ${craft.item}`)
            .then(msg => {
                (msg as Discord.Message).delete({timeout: 60000});
            });
        return;
    }
}
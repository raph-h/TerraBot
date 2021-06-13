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
const node_json_db_1 = require("node-json-db");
const craftData_1 = require("../data/craftData");
const utils_1 = require("../utils");
const db = new node_json_db_1.JsonDB("userData", true, true);
class craft {
    constructor() {
        this._command = ["craft", "create"];
    }
    help() {
        return "This command is to craft items";
    }
    thisCommand() {
        return this._command;
    }
    runCommand(args, msgObject) {
        return __awaiter(this, void 0, void 0, function* () {
            msgObject.delete();
            db.reload();
            if (db.exists(`/users/${msgObject.author.id}/cooldown`)) {
                if (db.getData(`/users/${msgObject.author.id}/cooldown`) > 0) {
                    msgObject.reply(`You have a ${db.getData(`/users/${msgObject.author.id}/cooldown`)} second cooldown`)
                        .then(msg => {
                        msg.delete({ timeout: 60000 });
                    });
                    return;
                }
            }
            let userItems = db.getData(`/users/${msgObject.author.id}/items`);
            let location = db.getData(`/users/${msgObject.author.id}/location`);
            if (args.length < 1) {
                let embed = new Discord.MessageEmbed()
                    .setColor("BLUE")
                    .setTitle("Craftable items at " + location)
                    .setFooter("Terracraft");
                craftData_1.craftData.forEach(element => {
                    element = element;
                    if (location.toLowerCase() == element.craftLocation.toLowerCase()) {
                        let hasItems = true;
                        for (let i = 0; i < element.catalysts.length; i++) {
                            if (!Object.keys(userItems).includes(element.catalysts[i]) && element.catalysts[i] != "") {
                                hasItems = false;
                            }
                        }
                        if (hasItems) {
                            embed.addField(element.item, `Time: ${element.cooldown}\nMaterials: \n${utils_1.itemsToString(element.materials) + element.catalysts.join(" - 1\n")}`);
                        }
                    }
                });
                msgObject.reply(embed)
                    .then(msg => {
                    msg.delete({ timeout: 60000 });
                });
                return;
            }
            let craft = null;
            craftData_1.craftData.forEach(element => {
                element = element;
                if (element.item.toLowerCase() == args.join(" ").toLowerCase()) {
                    craft = element;
                }
            });
            if (craft == null) {
                msgObject.reply("That is not an item you can craft")
                    .then(msg => {
                    msg.delete({ timeout: 60000 });
                });
                return;
            }
            craft = craft;
            if (craft.craftLocation.toLowerCase() != db.getData(`/users/${msgObject.author.id}/location`).toLowerCase()) {
                msgObject.reply("You can't craft this item here")
                    .then(msg => {
                    msg.delete({ timeout: 60000 });
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
                    msg.delete({ timeout: 60000 });
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
                    msg.delete({ timeout: 60000 });
                });
                return;
            }
            Object.keys(craft.materials).forEach(element => {
                if (element != "") {
                    utils_1.removeItem(`/users/${msgObject.author.id}/items/${element}`, db, craft.materials[element]);
                }
            });
            utils_1.addItem(`/users/${msgObject.author.id}/items/${craft.item}`, db, craft.amount);
            db.push(`/users/${msgObject.author.id}/cooldown`, craft.cooldown);
            msgObject.reply(`You crafted ${craft.amount} ${craft.item}`)
                .then(msg => {
                msg.delete({ timeout: 60000 });
            });
            return;
        });
    }
}
exports.default = craft;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JhZnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29tbWFuZHMvY3JhZnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBc0M7QUFDdEMsK0NBQXNDO0FBRXRDLGlEQUE4QztBQUU5QyxvQ0FBOEQ7QUFDOUQsTUFBTSxFQUFFLEdBQUcsSUFBSSxxQkFBTSxDQUFDLFVBQVUsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFFOUMsTUFBcUIsS0FBSztJQUExQjtRQUNxQixhQUFRLEdBQUcsQ0FBQyxPQUFPLEVBQUUsUUFBUSxDQUFDLENBQUM7SUEySXBELENBQUM7SUF6SUcsSUFBSTtRQUNBLE9BQU8sZ0NBQWdDLENBQUM7SUFDNUMsQ0FBQztJQUVELFdBQVc7UUFDUCxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDekIsQ0FBQztJQUVLLFVBQVUsQ0FBQyxJQUFjLEVBQUUsU0FBMEI7O1lBQ3ZELFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUNuQixFQUFFLENBQUMsTUFBTSxFQUFFLENBQUM7WUFFWixJQUFJLEVBQUUsQ0FBQyxNQUFNLENBQUMsVUFBVSxTQUFTLENBQUMsTUFBTSxDQUFDLEVBQUUsV0FBVyxDQUFDLEVBQUU7Z0JBQ3JELElBQUksRUFBRSxDQUFDLE9BQU8sQ0FBQyxVQUFVLFNBQVMsQ0FBQyxNQUFNLENBQUMsRUFBRSxXQUFXLENBQUMsR0FBRyxDQUFDLEVBQUU7b0JBQzFELFNBQVMsQ0FBQyxLQUFLLENBQUMsY0FBYyxFQUFFLENBQUMsT0FBTyxDQUFDLFVBQVUsU0FBUyxDQUFDLE1BQU0sQ0FBQyxFQUFFLFdBQVcsQ0FBQyxrQkFBa0IsQ0FBQzt5QkFDcEcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFO3dCQUNQLEdBQXVCLENBQUMsTUFBTSxDQUFDLEVBQUMsT0FBTyxFQUFFLEtBQUssRUFBQyxDQUFDLENBQUM7b0JBQ3RELENBQUMsQ0FBQyxDQUFDO29C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
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
const locationData_1 = require("../data/locationData");
const utils_1 = require("../utils");
const itemData_1 = require("../data/itemData");
const db = new node_json_db_1.JsonDB("userData", true, true);
class test {
    constructor() {
        this._command = ["travel"];
        this._cooldown = 60 * 5;
    }
    help() {
        return "Go to a different location";
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
            let location = db.getData(`/users/${msgObject.author.id}/location`);
            let locations = [];
            for (let i = 0; i < locationData_1.locationData.locations.length; i++) {
                if (locationData_1.locationData.locations[i].toLowerCase() == location.toLowerCase()) {
                    locations = locationData_1.locationData.roads[i].locations;
                }
            }
            if (args.length < 1) {
                let embed = new Discord.MessageEmbed()
                    .setColor("BLACK")
                    .setTitle(`Accessable Locations`)
                    .setFooter("Tourism")
                    .setDescription(locations.join(", "));
                msgObject.reply(embed);
                return;
            }
            if (utils_1.itemsToWeight(db.getData(`/users/${msgObject.author.id}/items`), itemData_1.itemData) > db.getData(`/users/${msgObject.author.id}/maxStorage`)) {
                msgObject.reply("Your carrying too much items, stop hoarding")
                    .then(msg => {
                    msg.delete({ timeout: 60000 });
                });
                return;
            }
            let destination = null;
            for (let i = 0; i < locations.length; i++) {
                if (locations[i].toLowerCase() == args.join(" ").toLowerCase()) {
                    destination = locations[i];
                }
            }
            if (destination == null) {
                msgObject.reply(`You can't travel to ${args.join("")} sadly`)
                    .then(msg => {
                    msg.delete({ timeout: 60000 });
                });
                return;
            }
            db.push(`/users/${msgObject.author.id}/location`, destination);
            let embed = new Discord.MessageEmbed()
                .setColor("BLACK")
                .setTitle(`Traveled to ${destination}`)
                .setDescription(`You now have a ${this._cooldown / 60} minute cooldown`)
                .setFooter("No Covid-19 here");
            msgObject.reply(embed).then(msg => {
                msg.delete({ timeout: 60000 });
            });
            db.push(`/users/${msgObject.author.id}/cooldown`, this._cooldown);
        });
    }
}
exports.default = test;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhdmVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbW1hbmRzL3RyYXZlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHNDQUFzQztBQUV0QywrQ0FBc0M7QUFDdEMsdURBQW9EO0FBQ3BELG9DQUF5QztBQUN6QywrQ0FBNEM7QUFDNUMsTUFBTSxFQUFFLEdBQUcsSUFBSSxxQkFBTSxDQUFDLFVBQVUsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFFOUMsTUFBcUIsSUFBSTtJQUF6QjtRQUNxQixhQUFRLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUN0QixjQUFTLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztJQXVFeEMsQ0FBQztJQXJFRyxJQUFJO1FBQ0EsT0FBTyw0QkFBNEIsQ0FBQztJQUN4QyxDQUFDO0lBRUQsV0FBVztRQUNQLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN6QixDQUFDO0lBRUssVUFBVSxDQUFDLElBQWMsRUFBRSxTQUEwQjs7WUFDdkQsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ25CLEVBQUUsQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUNaLElBQUksRUFBRSxDQUFDLE1BQU0sQ0FBQyxVQUFVLFNBQVMsQ0FBQyxNQUFNLENBQUMsRUFBRSxXQUFXLENBQUMsRUFBRTtnQkFDckQsSUFBSSxFQUFFLENBQUMsT0FBTyxDQUFDLFVBQVUsU0FBUyxDQUFDLE1BQU0sQ0FBQyxFQUFFLFdBQVcsQ0FBQyxHQUFHLENBQUMsRUFBRTtvQkFDMUQsU0FBUyxDQUFDLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQyxPQUFPLENBQUMsVUFBVSxTQUFTLENBQUMsTUFBTSxDQUFDLEVBQUUsV0FBVyxDQUFDLGtCQUFrQixDQUFDO3lCQUNwRyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUU7d0JBQ1AsR0FBdUIsQ0FBQyxNQUFNLENBQUMsRUFBQyxPQUFPLEVBQUUsS0FB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
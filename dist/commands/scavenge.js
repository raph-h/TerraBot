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
const itemData_1 = require("../data/itemData");
const locationData_1 = require("../data/locationData");
const utils_1 = require("../utils");
const db = new node_json_db_1.JsonDB("userData", true, true);
class scavenge {
    constructor() {
        this._command = ["scavenge", "search"];
        this._cooldown = 30;
    }
    help() {
        return "This command scavenges the area you are in";
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
            let lo = db.getData(`/users/${msgObject.author.id}/location`).toLowerCase();
            if (lo != locationData_1.locationData.locations[0].toLowerCase() || lo != locationData_1.locationData.locations[4].toLowerCase()) {
                msgObject.reply("You can't search here")
                    .then(msg => {
                    msg.delete({ timeout: 60000 });
                });
                return;
            }
            if (Math.random() < .3) {
                msgObject.reply("You found nothing")
                    .then(msg => {
                    msg.delete({ timeout: 60000 });
                });
                db.push(`/users/${msgObject.author.id}/cooldown`, this._cooldown);
                return;
            }
            let item = null;
            let chance = 0;
            for (let element of itemData_1.itemData[0]) {
                element = element;
                chance += element.chance;
            }
            chance = Math.random() * chance;
            for (let element of itemData_1.itemData[0]) {
                element = element;
                chance -= element.chance;
                if (chance <= 0 && item == null) {
                    item = element;
                }
            }
            if (item == null) {
                msgObject.reply("You found nothing")
                    .then(msg => {
                    msg.delete({ timeout: 60000 });
                });
                return;
            }
            utils_1.addItem(`/users/${msgObject.author.id}/items/${item.name}`, db, 1);
            let embed = new Discord.MessageEmbed()
                .setColor("BLUE")
                .setTitle(`${msgObject.author.username}'s Scavenge`)
                .setFooter("mmm, free items")
                .addField("You found: ", item.name);
            msgObject.reply(embed)
                .then(msg => {
                msg.delete({ timeout: 60000 });
            });
            db.push(`/users/${msgObject.author.id}/cooldown`, this._cooldown);
        });
    }
}
exports.default = scavenge;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NhdmVuZ2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29tbWFuZHMvc2NhdmVuZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBc0M7QUFFdEMsK0NBQXNDO0FBQ3RDLCtDQUE0QztBQUU1Qyx1REFBb0Q7QUFDcEQsb0NBQW1DO0FBRW5DLE1BQU0sRUFBRSxHQUFHLElBQUkscUJBQU0sQ0FBQyxVQUFVLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0FBRTlDLE1BQXFCLFFBQVE7SUFBN0I7UUFDcUIsYUFBUSxHQUFHLENBQUMsVUFBVSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQ2xDLGNBQVMsR0FBRyxFQUFFLENBQUM7SUFpRnBDLENBQUM7SUE5RUcsSUFBSTtRQUNBLE9BQU8sNENBQTRDLENBQUM7SUFDeEQsQ0FBQztJQUVELFdBQVc7UUFDUCxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDekIsQ0FBQztJQUVLLFVBQVUsQ0FBQyxJQUFjLEVBQUUsU0FBMEI7O1lBQ3ZELFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUNuQixFQUFFLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDWixJQUFJLEVBQUUsQ0FBQyxNQUFNLENBQUMsVUFBVSxTQUFTLENBQUMsTUFBTSxDQUFDLEVBQUUsV0FBVyxDQUFDLEVBQUU7Z0JBQ3JELElBQUksRUFBRSxDQUFDLE9BQU8sQ0FBQyxVQUFVLFNBQVMsQ0FBQyxNQUFNLENBQUMsRUFBRSxXQUFXLENBQUMsR0FBRyxDQUFDLEVBQUU7b0JBQzFELFNBQVMsQ0FBQyxLQUFLLENBQUMsY0FBYyxFQUFFLENBQUMsT0FBTyxDQUFDLFVBQVUsU0FBUyxDQUFDLE1BQU0sQ0FBQyxFQUFFLFdBQVcsQ0FBQyxrQkFBa0IsQ0FBQzt5QkFDcEcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFO3dCQUNQLEdBQXVCLENBQUMsTUFBTSxDQUFDLEVBQUMsT0FBTyxFQUFF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
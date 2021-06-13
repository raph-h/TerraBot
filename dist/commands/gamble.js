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
const db = new node_json_db_1.JsonDB("userData", true, true);
class gamble {
    constructor() {
        this._command = ["gamble", "bet"];
        this._cooldown = 10;
    }
    help() {
        return "This command is to gamble a chosen amount of money";
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
            if (args.length < 0) {
                msgObject.reply("You need to specify an amount to gamble")
                    .then(msg => {
                    msg.delete({ timeout: 60000 });
                });
                return;
            }
            if (args.join() == "") {
                msgObject.reply("You need to specify an amount to gamble")
                    .then(msg => {
                    msg.delete({ timeout: 60000 });
                });
                return;
            }
            if (parseInt(args[0]) == NaN) {
                msgObject.reply("You need to specify a number")
                    .then(msg => {
                    msg.delete({ timeout: 60000 });
                });
                return;
            }
            let bet = parseInt(args[0]);
            if (bet < 10) {
                msgObject.reply("You can't gamble less than 10 gold")
                    .then(msg => {
                    msg.delete({ timeout: 60000 });
                });
                return;
            }
            let userGold = db.getData(`/users/${msgObject.author.id}/money`);
            if (userGold < bet) {
                msgObject.reply("You can't gamble more than your available gold")
                    .then(msg => {
                    msg.delete({ timeout: 60000 });
                });
                return;
            }
            let win = false;
            if (bet > 1000) {
                if (Math.random() < 0.5) {
                    win = true;
                }
            }
            else if (bet > 100) {
                if (Math.random() < 0.3) {
                    win = true;
                }
            }
            else {
                if (Math.random() < 0.7) {
                    win = true;
                }
            }
            let embed = new Discord.MessageEmbed()
                .setColor("YELLOW")
                .setTitle(`${msgObject.author.username}'s Gamble`)
                .setFooter("oh no, gambling");
            if (win) {
                db.push(`/users/${msgObject.author.id}/money`, userGold + bet);
                embed.setDescription(`You won ${bet} gold`);
            }
            else {
                db.push(`/users/${msgObject.author.id}/money`, userGold - bet);
                embed.setDescription(`You lost ${bet} gold`);
            }
            msgObject.reply(embed)
                .then(msg => {
                msg.delete({ timeout: 60000 });
            });
            db.push(`/users/${msgObject.author.id}/cooldown`, this._cooldown);
        });
    }
}
exports.default = gamble;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FtYmxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbW1hbmRzL2dhbWJsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHNDQUFzQztBQUV0QywrQ0FBc0M7QUFDdEMsTUFBTSxFQUFFLEdBQUcsSUFBSSxxQkFBTSxDQUFDLFVBQVUsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFFOUMsTUFBcUIsTUFBTTtJQUEzQjtRQUNxQixhQUFRLEdBQUcsQ0FBQyxRQUFRLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDN0IsY0FBUyxHQUFHLEVBQUUsQ0FBQztJQWdHcEMsQ0FBQztJQTlGRyxJQUFJO1FBQ0EsT0FBTyxvREFBb0QsQ0FBQztJQUNoRSxDQUFDO0lBRUQsV0FBVztRQUNQLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN6QixDQUFDO0lBRUssVUFBVSxDQUFDLElBQWMsRUFBRSxTQUEwQjs7WUFDdkQsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ25CLEVBQUUsQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUNaLElBQUksRUFBRSxDQUFDLE1BQU0sQ0FBQyxVQUFVLFNBQVMsQ0FBQyxNQUFNLENBQUMsRUFBRSxXQUFXLENBQUMsRUFBRTtnQkFDckQsSUFBSSxFQUFFLENBQUMsT0FBTyxDQUFDLFVBQVUsU0FBUyxDQUFDLE1BQU0sQ0FBQyxFQUFFLFdBQVcsQ0FBQyxHQUFHLENBQUMsRUFBRTtvQkFDMUQsU0FBUyxDQUFDLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQyxPQUFPLENBQUMsVUFBVSxTQUFTLENBQUMsTUFBTSxDQUFDLEVBQUUsV0FBVyxDQUFDLGtCQUFrQixDQUFDO3lCQUNwRyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUU7d0JBQ1AsR0FBdUIsQ0FBQyxNQUFNLENBQUMsRUFBQyxPQUFPLEVBQUUsS0FBSyxFQUFDLENBQUMsQ0FBQztvQkFDdEQsQ0FBQyxDQUFDLENBQUM7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
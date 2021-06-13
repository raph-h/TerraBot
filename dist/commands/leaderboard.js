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
class leaderboard {
    constructor() {
        this._command = ["leaderboard", "lb"];
        this._cooldown = 10;
    }
    help() {
        return "This command is to see the richest people on the bot";
    }
    thisCommand() {
        return this._command;
    }
    runCommand(args, msgObject, client) {
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
            let leaderboard = [];
            let users = db.getData(`/users`);
            Object.keys(users).forEach(element => {
                if (users[element].money > 0) {
                    leaderboard.push({ name: element, money: users[element].money });
                }
            });
            leaderboard.sort((a, b) => b.money - a.money);
            let embed = new Discord.MessageEmbed()
                .setColor("GREY")
                .setFooter("Rich")
                .setTitle("Leaderboard");
            let desc = "";
            for (let i = 0; i < 5; i++) {
                let element = leaderboard[i];
                let clientName = (yield (client.users.fetch(element.name))).username;
                desc += `**${i + 1}.** ${clientName}\n`;
            }
            ;
            embed.setDescription(desc);
            msgObject.reply(embed)
                .then(msg => {
                msg.delete({ timeout: 120000 });
            });
            db.push(`/users/${msgObject.author.id}/cooldown`, this._cooldown);
        });
    }
}
exports.default = leaderboard;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGVhZGVyYm9hcmQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29tbWFuZHMvbGVhZGVyYm9hcmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBc0M7QUFDdEMsK0NBQXNDO0FBRXRDLE1BQU0sRUFBRSxHQUFHLElBQUkscUJBQU0sQ0FBQyxVQUFVLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0FBRTlDLE1BQXFCLFdBQVc7SUFBaEM7UUFDcUIsYUFBUSxHQUFHLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ2pDLGNBQVMsR0FBRyxFQUFFLENBQUM7SUFxRHBDLENBQUM7SUFuREcsSUFBSTtRQUNBLE9BQU8sc0RBQXNELENBQUM7SUFDbEUsQ0FBQztJQUVELFdBQVc7UUFDUCxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDekIsQ0FBQztJQUVLLFVBQVUsQ0FBQyxJQUFjLEVBQUUsU0FBMEIsRUFBRSxNQUFzQjs7WUFDL0UsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ25CLEVBQUUsQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUNaLElBQUksRUFBRSxDQUFDLE1BQU0sQ0FBQyxVQUFVLFNBQVMsQ0FBQyxNQUFNLENBQUMsRUFBRSxXQUFXLENBQUMsRUFBRTtnQkFDckQsSUFBSSxFQUFFLENBQUMsT0FBTyxDQUFDLFVBQVUsU0FBUyxDQUFDLE1BQU0sQ0FBQyxFQUFFLFdBQVcsQ0FBQyxHQUFHLENBQUMsRUFBRTtvQkFDMUQsU0FBUyxDQUFDLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQyxPQUFPLENBQUMsVUFBVSxTQUFTLENBQUMsTUFBTSxDQUFDLEVBQUUsV0FBVyxDQUFDLGtCQUFrQixDQUFDO3lCQUNwRyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUU7d0JBQ1AsR0FBdUIsQ0FBQyxNQUFNLENBQUMsRUFBQyxPQUFPLEVBQUUsS0FBSyxFQUFDLENBQUMsQ0FBQztvQkFDdEQsQ0FBQyxDQUFDLENBQUM7b0JBQ0gsT0FBTztpQkFDVjthQUNKO1lBQ0QsSUFBSSxXQUFXLEdBQXVDLEVBQUUsQ0FBQztZQUN6RCxJQUFJLEtBQUssR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ2pDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFO2dCQUNqQyxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxFQUFFO29CQUMxQixXQUFXLENBQUMsSUFBSSxDQUFDLEVBQUMsSUFBSSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssRUFBQyxDQUFDLENBQUE7aUJBQ2pFO1lBQ0wsQ0FBQyxDQUFDLENBQUM7WUFFSCxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7WUFFOUMsSUFBSSxLQUFLLEdBQUcsSUFBSSxPQUFPLENBQUMsWUFBWSxFQUFFO2lCQUNqQyxRQUFRLENBQUMsTUFBTSxDQUFDO2lCQUNoQixTQUFTLENBQUMsTUFBTSxDQUFDO2lCQUNqQixRQUFRLENBQUMsYUFBYSxDQUFDLENBQUM7WUFFN0IsSUFBSSxJQUFJLEdBQUcsRUFBRSxDQUFBO1lBRWIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDeEIsSUFBSSxPQUFPLEdBQUcsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUM3QixJQUFJLFVBQVUsR0FBRyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQztnQkFDckUsSUFBSSxJQUFJLEtBQUssQ0FBQyxHQUFHLENBQUMsT0FBTyxVQUFVLElBQUksQ0FBQzthQUMzQztZQUFBLENBQUM7WUFDRixLQUFLLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBRTNCLFNBQVMsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDO2lCQUNyQixJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUU7Z0JBQ1AsR0FBdUIsQ0FBQyxNQUFNLENBQUMsRUFBQyxPQUFPLEVBQUUsTUFBTSxFQUFDLENBQUMsQ0FBQztZQUN2RCxDQUFDLENBQUMsQ0FBQztZQUVILEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBVSxTQUFTLENBQUMsTUFBTSxDQUFDLEVBQUUsV0FBVyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUN0RSxDQUFDO0tBQUE7Q0FDSjtBQXZERCw4QkF1REMifQ==
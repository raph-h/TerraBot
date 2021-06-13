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
const botdb = new node_json_db_1.JsonDB("botData", true, true);
class stocks {
    constructor() {
        this._command = ["stocks", "stonks", "stock", "stonk"];
        this._cooldown = 5;
    }
    help() {
        return "This command is to buy, sell (with a 20% loss) or view stocks";
    }
    thisCommand() {
        return this._command;
    }
    runCommand(args, msgObject) {
        return __awaiter(this, void 0, void 0, function* () {
            msgObject.delete();
            db.reload();
            botdb.reload();
            let path = `/users/${msgObject.author.id}`;
            let embed = new Discord.MessageEmbed()
                .setColor("WHITE")
                .setFooter("STONKS")
                .setTitle(`${msgObject.author.username}'s Stocks`);
            let stocksPrice = botdb.getData("/stockprice");
            if (args.length < 1) {
                if (db.exists(path + "/stocks")) {
                    embed.addField("Stocks: ", db.getData(path + "/stocks"));
                }
                embed.setDescription(`Stock price: ${Math.floor(stocksPrice)}`);
                msgObject.reply(embed).then(msg => {
                    msg.delete({ timeout: 60000 });
                });
                return;
            }
            if (!(typeof Number(args[0]) === "number")) {
                msgObject.reply("You need to type the amount of stocks you want to buy or sell").then(msg => {
                    msg.delete({ timeout: 60000 });
                });
            }
            if (db.exists(`/users/${msgObject.author.id}/cooldown`)) {
                if (db.getData(`/users/${msgObject.author.id}/cooldown`) > 0) {
                    msgObject.reply(`You have a ${db.getData(`/users/${msgObject.author.id}/cooldown`)} second cooldown`)
                        .then(msg => {
                        msg.delete({ timeout: 60000 });
                    });
                    return;
                }
            }
            let stocksToBuy = Number(args[0]);
            let userGold = db.getData(path + "/money");
            let userStocks = 0;
            if (db.exists(path + "/stocks")) {
                userStocks = db.getData(path + "/stocks");
            }
            if (stocksToBuy > 0 && stocksToBuy < 10) {
                msgObject.reply("You need to buy more than 10 stocks").then(msg => {
                    msg.delete({ timeout: 60000 });
                });
                return;
            }
            else if (stocksToBuy >= 10) {
                let cost = stocksToBuy * stocksPrice;
                if (cost > userGold) {
                    msgObject.reply("You don't have enough gold").then(msg => {
                        msg.delete({ timeout: 60000 });
                    });
                    return;
                }
                stocksPrice += (Math.random() + 0.5) * stocksToBuy;
                db.push(path + "/money", Math.floor(userGold - cost));
                if (userStocks + stocksToBuy == 0) {
                    db.delete(path + "/stocks");
                }
                else {
                    db.push(path + "/stocks", userStocks + stocksToBuy);
                }
                embed.setDescription(`You bought ${stocksToBuy} stocks for ${Math.floor(cost)} gold`);
                embed.addField("Stocks: ", userStocks + stocksToBuy);
                embed.addField("Gold: ", Math.floor(userGold - cost));
            }
            else if (stocksToBuy < 0) {
                if ((userStocks + stocksToBuy) < 0) {
                    msgObject.reply("You don't have enough stocks").then(msg => {
                        msg.delete({ timeout: 60000 });
                    });
                    return;
                }
                let cost = (-stocksToBuy) * stocksPrice * 0.8;
                stocksPrice -= (Math.random() + 0.5) * -stocksToBuy;
                db.push(path + "/stocks", userStocks + stocksToBuy);
                db.push(path + "/money", Math.floor(userGold + cost));
                embed.setDescription(`You sold ${-stocksToBuy} stocks for ${Math.floor(cost)} gold`);
                embed.addField("Stocks: ", userStocks + stocksToBuy);
                embed.addField("Gold: ", Math.floor(userGold + cost));
            }
            msgObject.reply(embed).then(msg => {
                msg.delete({ timeout: 60000 });
            });
            botdb.push("/stockprice", stocksPrice);
            db.push(`/users/${msgObject.author.id}/cooldown`, this._cooldown);
        });
    }
}
exports.default = stocks;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RvY2tzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbW1hbmRzL3N0b2Nrcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHNDQUFzQztBQUN0QywrQ0FBc0M7QUFFdEMsTUFBTSxFQUFFLEdBQUcsSUFBSSxxQkFBTSxDQUFDLFVBQVUsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDOUMsTUFBTSxLQUFLLEdBQUcsSUFBSSxxQkFBTSxDQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFFaEQsTUFBcUIsTUFBTTtJQUEzQjtRQUNxQixhQUFRLEdBQUcsQ0FBQyxRQUFRLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQztRQUNsRCxjQUFTLEdBQUcsQ0FBQyxDQUFDO0lBb0duQyxDQUFDO0lBbEdHLElBQUk7UUFDQSxPQUFPLCtEQUErRCxDQUFDO0lBQzNFLENBQUM7SUFFRCxXQUFXO1FBQ1AsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3pCLENBQUM7SUFFSyxVQUFVLENBQUMsSUFBYyxFQUFFLFNBQTBCOztZQUN2RCxTQUFTLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDbkIsRUFBRSxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ1osS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ2YsSUFBSSxJQUFJLEdBQUcsVUFBVSxTQUFTLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxDQUFDO1lBQzNDLElBQUksS0FBSyxHQUFHLElBQUksT0FBTyxDQUFDLFlBQVksRUFBRTtpQkFDakMsUUFBUSxDQUFDLE9BQU8sQ0FBQztpQkFDakIsU0FBUyxDQUFDLFFBQVEsQ0FBQztpQkFDbkIsUUFBUSxDQUFDLEdBQUcsU0FBUyxDQUFDLE1BQU0sQ0FBQyxRQUFRLFdBQVcsQ0FBQyxDQUFBO1lBQ3RELElBQUksV0FBVyxHQUFHLEtBQUssQ0FBQyxPQUFPLENB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
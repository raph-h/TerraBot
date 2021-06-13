import * as Discord from "discord.js";
import { JsonDB } from "node-json-db";
import {IBotCommand} from "../api";
const db = new JsonDB("userData", true, true);
const botdb = new JsonDB("botData", true, true);

export default class stocks implements IBotCommand {
    private readonly _command = ["stocks", "stonks", "stock", "stonk"];
    private readonly _cooldown = 5;

    help(): string {
        return "This command is to buy, sell (with a 20% loss) or view stocks";
    }

    thisCommand(): string[] {
        return this._command;
    }

    async runCommand(args: string[], msgObject: Discord.Message): Promise<void> {
        msgObject.delete();
        db.reload();
        botdb.reload();
        let path = `/users/${msgObject.author.id}`;
        let embed = new Discord.MessageEmbed()
            .setColor("WHITE")
            .setFooter("STONKS")
            .setTitle(`${msgObject.author.username}'s Stocks`)
        let stocksPrice = botdb.getData("/stockprice");

        if (args.length < 1) {
            if (db.exists(path + "/stocks")) {
                embed.addField("Stocks: ", db.getData(path + "/stocks"));
            }
            embed.setDescription(`Stock price: ${Math.floor(stocksPrice)}`);
            msgObject.reply(embed).then(msg => {
                (msg as Discord.Message).delete({timeout: 60000});
            });
            return;
        }
        if (!(typeof Number(args[0]) === "number")) {
            msgObject.reply("You need to type the amount of stocks you want to buy or sell").then(msg => {
                (msg as Discord.Message).delete({timeout: 60000});
            });
        }

        if (db.exists(`/users/${msgObject.author.id}/cooldown`)) {
            if (db.getData(`/users/${msgObject.author.id}/cooldown`) > 0) {
                msgObject.reply(`You have a ${db.getData(`/users/${msgObject.author.id}/cooldown`)} second cooldown`)
                .then(msg => {
                    (msg as Discord.Message).delete({timeout: 60000});
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
                (msg as Discord.Message).delete({timeout: 60000});
            });
            return;
        } else if (stocksToBuy >= 10) {
            let cost = stocksToBuy * stocksPrice;
            if (cost > userGold) {
                msgObject.reply("You don't have enough gold").then(msg => {
                    (msg as Discord.Message).delete({timeout: 60000});
                });
                return;
            }
            stocksPrice += (Math.random() + 0.5) * stocksToBuy;
            db.push(path + "/money", Math.floor(userGold - cost));
            if (userStocks + stocksToBuy == 0) {
                db.delete(path + "/stocks");
            } else {
                db.push(path + "/stocks", userStocks + stocksToBuy);
            }
            embed.setDescription(`You bought ${stocksToBuy} stocks for ${Math.floor(cost)} gold`);
            embed.addField("Stocks: ", userStocks + stocksToBuy);
            embed.addField("Gold: ", Math.floor(userGold - cost));            
        } else if (stocksToBuy < 0) {
            if ((userStocks + stocksToBuy) < 0) {
                msgObject.reply("You don't have enough stocks").then(msg => {
                    (msg as Discord.Message).delete({timeout: 60000});
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
            (msg as Discord.Message).delete({timeout: 60000});
        });

        botdb.push("/stockprice", stocksPrice);
        db.push(`/users/${msgObject.author.id}/cooldown`, this._cooldown);
    }
}
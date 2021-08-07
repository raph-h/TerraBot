import * as Discord from "discord.js";
import {IBotCommand} from "../api";
import { JsonDB } from 'node-json-db';
import { itemModel } from "../models/itemModel";
import { itemData } from "../data/itemData";
import { locationData } from "../data/locationData";
import { addItem, convertToString, searchItem } from "../utils";
const db = new JsonDB("userData", true, true);


export default class buy implements IBotCommand {
    private readonly _command = ["buy"];

    help(): string {
        return "This command attempts to buy items";
    }

    thisCommand(): string[] {
        return this._command;
    }

    async runCommand(args: string[], msgObject: Discord.Message): Promise<void> {
        msgObject.delete();
        db.reload();

        if (args.length < 1) {
            msgObject.reply("You have to specify what item to buy")
            .then(msg => {
                (msg as Discord.Message).delete({timeout: 60000});
            });
            return;
        }

        let newItemName = args.join(" ");

        let item = searchItem(newItemName, itemData[db.getData(`/users/${msgObject.author.id}/location`)])

        if (item === null) {
            msgObject.reply("This item doesn't exist")
            .then(msg => {
                (msg as Discord.Message).delete({timeout: 60000});
            });
            return;
        }
        item = (item) as itemModel;
        if (item.buy < 0) {
            msgObject.reply("You can't buy this item")
            .then(msg => {
                (msg as Discord.Message).delete({timeout: 60000});
            });
            return;
        }

        let goldAmount: number = db.getData(`/users/${msgObject.author.id}/money`);

        if (goldAmount < item.buy) {
            msgObject.reply(`You're too poor to buy a ${item.name}, you need ${item.buy - goldAmount} more gold`)
            .then(msg => {
                (msg as Discord.Message).delete({timeout: 60000});
            });
            return;
        }

        db.push(`/users/${msgObject.author.id}/money`, goldAmount - item.buy);
        addItem(`/users/${msgObject.author.id}/items/${item.name}`, db, 1);
        let items = db.getData(`/users/${msgObject.author.id}/items`);

        let embed = new Discord.MessageEmbed()
                        .setColor("BLUE")
                        .setTitle(`${msgObject.author.username} successfully bought ${item.name}`)
                        .setFooter("Good doing business with you")
                        .addField("Items: ", convertToString(items))
                        .addField("Gold: ", goldAmount - item.buy);

        msgObject.reply(embed)
        .then(msg => {
            (msg as Discord.Message).delete({timeout: 60000});
        })
        .catch(console.error);
    }
}
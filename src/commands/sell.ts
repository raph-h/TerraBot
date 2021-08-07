import * as Discord from "discord.js";
import {IBotCommand} from "../api";
import { JsonDB } from 'node-json-db';
import { locations } from "../data/locationData";
import { itemData } from "../data/itemData";
import { itemModel } from "../models/itemModel";
import { itemsToString, removeItem } from "../utils";
const db = new JsonDB("userData", true, true);


export default class sell implements IBotCommand {
    private readonly _command = ["sell"];

    help(): string {
        return "This command attempts to sell items";
    }

    thisCommand(): string[] {
        return this._command;
    }

    async runCommand(args: string[], msgObject: Discord.Message): Promise<void> {
        msgObject.delete();
        db.reload();

        if (args.length < 1) {
            msgObject.reply("You have to specify what item to sell")
            .then(msg => {
                (msg as Discord.Message).delete({timeout: 60000});
            });
            return;
        }

        let location: string = db.getData(`/users/${msgObject.author.id}/location`) as string
        if (!(location == locations[0] || location == locations[3])) {
            msgObject.reply("You can't sell here")
            .then(msg => {
                (msg as Discord.Message).delete({timeout: 60000});
            });
            return;
        }

        let items: {} = db.getData(`/users/${msgObject.author.id}/items`);
        if (Object.keys(items).length < 1) {
            msgObject.reply("You don't have any items to sell")
            .then(msg => {
                (msg as Discord.Message).delete({timeout: 60000});
            });
            return;
        }

        let sellItemName = args.join(" ");
        let item = null;
        for (let u = 0; u < locations.length; u++) {
            location = locations[u];
            for (let i = 0; i < itemData[location].length; i++) {
                if (itemData[location][i].name.toLowerCase() == sellItemName.toLowerCase()) {
                    item = itemData[location][i];
                }
            }
        };
        
        if (item == null) {
            msgObject.reply("There is no such item as this")
            .then(msg => {
                (msg as Discord.Message).delete({timeout: 60000});
            });
            return;
        }

        if (!db.exists(`/users/${msgObject.author.id}/items/${item.name}`)) {
            msgObject.reply("You don't have this item")
            .then(msg => {
                (msg as Discord.Message).delete({timeout: 60000});
            });
            return;
        }
        item = item as itemModel;
        if (item.sell < 0) {
            msgObject.reply("You can't sell this item")
            .then(msg => {
                (msg as Discord.Message).delete({timeout: 60000});
            });
            return;
        }

        let goldAmount: number = db.getData(`/users/${msgObject.author.id}/money`);
        db.push(`/users/${msgObject.author.id}/money`, goldAmount + item.sell);
        removeItem(`/users/${msgObject.author.id}/items/${item.name}`, db, 1);

        items = db.getData(`/users/${msgObject.author.id}/items`);

        let embed = new Discord.MessageEmbed()
                        .setColor("YELLOW")
                        .setTitle(`${msgObject.author.username} successfully sold ${item.name}`)
                        .setFooter("Good doing business with you")
                        .addField("Items: ", itemsToString(items))
                        .addField("Gold: ", goldAmount + item.sell);

        msgObject.reply(embed)
        .then(msg => {
            (msg as Discord.Message).delete({timeout: 60000});
        })
        .catch(console.error);
    }
}
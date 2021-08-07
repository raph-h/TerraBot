import * as Discord from "discord.js";
import {IBotCommand} from "../api";
import { JsonDB } from 'node-json-db';
import { locationData, locations } from "../data/locationData";
import { itemData } from "../data/itemData";
import { itemModel } from "../models/itemModel";

const db = new JsonDB("userData", true, true);

export default class test implements IBotCommand {
    private readonly _command = ["shop"];

    help(): string {
        return "Shows items you can buy in the current location";
    }

    thisCommand(): string[] {
        return this._command;
    }

    async runCommand(args: string[], msgObject: Discord.Message): Promise<void> {
        msgObject.delete();
        db.reload();

        let location: string = db.getData(`/users/${msgObject.author.id}/location`);
        let shop = itemData[location];

        if (shop == null) {
            msgObject.reply("You can't buy anything here")
            .then(msg => {
                (msg as Discord.Message).delete({timeout: 60000});
            });
            return;
        }

        let embed = new Discord.MessageEmbed()
                        .setColor("GREY")
                        .setTitle(`Items you can buy at ${location.toLowerCase()}`)
                        .setFooter("So expensive am I right?");

        for (let element of shop) {
            element = element as itemModel;
            let buyText = element.buy + "";
            let sellText = element.sell + "";
            if (element.buy < 0) {
                buyText = "You can't buy this item";
            }
            if (element.buy < 0) {
                sellText = "You can't sell this item";
            }
            embed.addField(element.name, `${element.description}\nPrice: ${buyText}\nSell Price: ${sellText}\nStorage: ${element.weight}`);
        }
        
        msgObject.reply(embed)
        .then(msg => {
            (msg as Discord.Message).delete({timeout: 60000});
        })
        .catch(console.error);
    }
}
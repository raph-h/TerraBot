import * as Discord from "discord.js";
import {IBotCommand} from "../api";
import { JsonDB } from 'node-json-db';
import { itemsToString, itemsToWeight } from "../utils";
import { itemData } from "../data/itemData";
const db = new JsonDB("userData", true, true);


export default class pocket implements IBotCommand {
    private readonly _command = ["pocket", "poc"];

    help(): string {
        return "This command shows what is in your pocket";
    }

    thisCommand(): string[] {
        return this._command;
    }

    async runCommand(args: string[], msgObject: Discord.Message): Promise<void> {
        msgObject.delete();
        let user = msgObject.author;

        db.reload();
        let gold = db.getData(`/users/${user.id}/money`);
        let items = db.getData(`/users/${user.id}/items`);

        let space = db.getData(`/users/${user.id}/maxStorage`);
        let takenSpace = itemsToWeight(items, itemData);

        let embed = new Discord.MessageEmbed()
                        .setColor("GREY")
                        .setTitle(`${user.username}'s Pocket`)
                        .setFooter("Imagine being poor")
                        .addField("Gold: ", gold)
                        .addField("Space: ", `${takenSpace}/${space}`)
                        .addField("Items: ", itemsToString(items));
        msgObject.reply(embed)
        .then(msg => {
            (msg as Discord.Message).delete({timeout: 60000});
        })
        .catch(console.error);
    }
}
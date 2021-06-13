import * as Discord from "discord.js";
import {IBotCommand} from "../api";
import { JsonDB } from 'node-json-db';
import { itemsToString, removeItem } from "../utils";
const db = new JsonDB("userData", true, true);

export default class test implements IBotCommand {
    private readonly _command = ["throw", "trash"];

    help(): string {
        return "Throw your item away on the ground";
    }

    thisCommand(): string[] {
        return this._command;
    }

    async runCommand(args: string[], msgObject: Discord.Message): Promise<void> {
        msgObject.delete();
        db.reload();

        if (args.length < 1) {
            msgObject.reply("You have to specify what item to throw")
            .then(msg => {
                (msg as Discord.Message).delete({timeout: 60000});
            });
            return;
        }

        let newItemName = args.join(" ");
        let path = `/users/${msgObject.author.id}/items`;

        let item = null;

        for (let i = 0; i < Object.keys(db.getData(path)).length; i++) {
            let itemName = Object.keys(db.getData(path))[i];
            if (itemName.toLowerCase() == newItemName.toLowerCase()) {
                if (db.getData(path)[itemName] > 0) {
                    item = itemName;
                }
            }
        }
        if (item == null) {
            msgObject.reply("You don't have this item")
            .then(msg => {
                (msg as Discord.Message).delete({timeout: 60000});
            });
            return;
        }

        removeItem(path + "/" + item, db, 1);

        let embed = new Discord.MessageEmbed()
                        .setColor("ORANGE")
                        .setTitle(`${msgObject.author.username} threw ${newItemName} away`)
                        .setFooter("Wow, imagine trashing things")
                        .addField("Items: ", itemsToString(db.getData(path)));

        msgObject.reply(embed)
        .then(msg => {
            (msg as Discord.Message).delete({timeout: 60000});
        })
        .catch(console.error);
    }
}
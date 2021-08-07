import * as Discord from "discord.js";
import { JsonDB } from "node-json-db";
import {IBotCommand} from "../api";
import { specialItems } from "../data/specialItemData";
const db = new JsonDB("userData", true, true);

export default class use implements IBotCommand { // This command can apparently be spammed
    private readonly _command = ["use"];

    help(): string {
        return "This command is to use things";
    }

    thisCommand(): string[] {
        return this._command;
    }

    async runCommand(args: string[], msgObject: Discord.Message): Promise<void> {
        msgObject.delete();
        db.reload();
        let path = `/users/${msgObject.author.id}`;
        if (args.length < 1) {
            msgObject.reply("You have to specify what item to use")
                .then(msg => {
                    (msg as Discord.Message).delete({timeout: 60000});
                });
            return;
        }
        let item = args.join(" ");
        let specialItem = null;

        for (let i = 0; i < specialItems.length; i++) {
            if (specialItems[i].name.toLowerCase() == item.toLowerCase()) {
                specialItem = specialItems[i];
            }
        }

        if (specialItem == null) {
            msgObject.reply("You this item can't be used")
            .then(msg => {
                (msg as Discord.Message).delete({timeout: 60000});
            });
            return;
        }

        let userItems = db.getData(path + "/items");
        let hasItem = false;
        for (let i = 0; i < Object.keys(userItems).length; i++) {
            if (Object.keys(userItems)[i].toLowerCase() == specialItem.name.toLowerCase()) {
                hasItem = true;
            }
        }

        if (!hasItem) {
            msgObject.reply("You don't have this item")
            .then(msg => {
                (msg as Discord.Message).delete({timeout: 60000});
            });
            return;
        }

        let used = specialItem.function(msgObject, db.exists(`${path}/fight`), args, db);
        if (used) {db.push(`/users/${msgObject.author.id}/cooldown`, 10)}
    }
}
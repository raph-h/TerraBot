import * as Discord from "discord.js";
import {IBotCommand} from "../api";
import { JsonDB } from 'node-json-db';
import { itemsToString } from "../utils";
const db = new JsonDB("userData", true, true);


export default class info implements IBotCommand {
    private readonly _command = ["info", "profile"];

    help(): string {
        return "This command shows your or someones information";
    }

    thisCommand(): string[] {
        return this._command;
    }

    async runCommand(args: string[], msgObject: Discord.Message): Promise<void> {
        msgObject.delete();
        let user: Discord.User;
        if (args.length > 0) {
            if (msgObject.mentions.users.size > 0) {
                user = (msgObject.mentions.users.first()) as Discord.User;
            } else {
                user = msgObject.author;
            }
        } else {
            user = msgObject.author;
        }
    
        db.reload();
        let path = `/users/${user.id}`;
        
        let stocks = 0;
        if (db.exists(path + "/stocks")) {
            stocks = db.getData(path + "/stocks");
        }
        let embed = new Discord.MessageEmbed()
                        .setColor("GREY")
                        .setTitle(`${user.username}'s Information`)
                        .setFooter("FBI 1000")
                        .addField("Stocks: ", `${stocks}`)
                        .addField("Health: ", `${db.getData(path + "/health")}/${db.getData(path + "/maxHealth")}`)
                        .addField("Location: ", db.getData(path + "/location"))
                        .addField("Equipped Items: ", itemsToString(db.getData(path + "/equipped")));
        msgObject.reply(embed)
        .then(msg => {
            (msg as Discord.Message).delete({timeout: 120000});
        })
        .catch(console.error);
    }
}
import * as Discord from "discord.js";
import {IBotCommand} from "../api";
import { JsonDB } from 'node-json-db';
import { locationData } from "../data/locationData";
import { itemsToWeight } from "../utils";
import { itemData } from "../data/itemData";
const db = new JsonDB("userData", true, true);

export default class test implements IBotCommand {
    private readonly _command = ["travel"];
    private readonly _cooldown = 60 * 5;

    help(): string {
        return "Go to a different location";
    }

    thisCommand(): string[] {
        return this._command;
    }

    async runCommand(args: string[], msgObject: Discord.Message): Promise<void> {
        msgObject.delete();
        db.reload();
        if (db.exists(`/users/${msgObject.author.id}/cooldown`)) {
            if (db.getData(`/users/${msgObject.author.id}/cooldown`) > 0) {
                msgObject.reply(`You have a ${db.getData(`/users/${msgObject.author.id}/cooldown`)} second cooldown`)
                .then(msg => {
                    (msg as Discord.Message).delete({timeout: 60000});
                });
                return;
            }
        }
        let location: string = db.getData(`/users/${msgObject.author.id}/location`);
        let locations: string[] = locationData[location];
        if (args.length < 1) {
            let embed = new Discord.MessageEmbed()
                .setColor("BLACK")
                .setTitle(`Accessable Locations`)
                .setFooter("Tourism")
                .setDescription(locations.join(", "));
            msgObject.reply(embed);
            return;
        }

        if (itemsToWeight(db.getData(`/users/${msgObject.author.id}/items`), itemData) > db.getData(`/users/${msgObject.author.id}/maxStorage`)) {
            msgObject.reply("Your carrying too much items, stop hoarding")
                .then(msg => {
                    (msg as Discord.Message).delete({timeout: 60000});
                });
            return;
        }

        let destination = null;
        for (let i = 0; i < locations.length; i++) {
            if (locations[i].toLowerCase() == args.join(" ").toLowerCase()) {
                destination = locations[i];
            }
        }
        if (destination == null) {
            msgObject.reply(`You can't travel to ${args.join("")} sadly`)
                .then(msg => {
                    (msg as Discord.Message).delete({timeout: 60000});
                });
            return;
        }
        db.push(`/users/${msgObject.author.id}/location`, destination);
        let embed = new Discord.MessageEmbed()
                .setColor("BLACK")
                .setTitle(`Traveled to ${destination}`)
                .setDescription(`You now have a ${this._cooldown / 60} minute cooldown`)
                .setFooter("No Covid-19 here");
        msgObject.reply(embed).then(msg => {
            (msg as Discord.Message).delete({timeout: 60000});
        });
        db.push(`/users/${msgObject.author.id}/cooldown`, this._cooldown);
    }
}
import * as Discord from "discord.js";
import {IBotCommand} from "../api";
import { JsonDB } from 'node-json-db';
import { itemData } from "../data/itemData";
import { itemModel } from "../models/itemModel";
import { locationData } from "../data/locationData";
import { addItem } from "../utils";

const db = new JsonDB("userData", true, true);

export default class scavenge implements IBotCommand {
    private readonly _command = ["scavenge", "search"];
    private readonly _cooldown = 30;
    

    help(): string {
        return "This command scavenges the area you are in";
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

        let lo = (db.getData(`/users/${msgObject.author.id}/location`) as string).toLowerCase();
        
        if (lo != locationData.locations[0].toLowerCase() || lo != locationData.locations[4].toLowerCase()) {
            msgObject.reply("You can't search here")
            .then(msg => {
                (msg as Discord.Message).delete({timeout: 60000});
            });
            return;
        }

        if (Math.random() < .3) {
            msgObject.reply("You found nothing")
            .then(msg => {
                (msg as Discord.Message).delete({timeout: 60000});
            });
            db.push(`/users/${msgObject.author.id}/cooldown`, this._cooldown);
            return;
        }

        let item = null;
        let chance = 0;
        for (let element of itemData[0]) {
            element = element as itemModel;
            chance += element.chance;
        }
        
        chance = Math.random() * chance;

        for (let element of itemData[0]) {
            element = element as itemModel;
            chance -= element.chance;
            if (chance <= 0 && item == null) {
                item = element as itemModel;
            }
        }
        if (item == null) {
            msgObject.reply("You found nothing")
            .then(msg => {
                (msg as Discord.Message).delete({timeout: 60000});
            });
            return;
        }

        addItem(`/users/${msgObject.author.id}/items/${item.name}`, db, 1);

        let embed = new Discord.MessageEmbed()
                        .setColor("BLUE")
                        .setTitle(`${msgObject.author.username}'s Scavenge`)
                        .setFooter("mmm, free items")
                        .addField("You found: ", item.name);
        msgObject.reply(embed)
        .then(msg => {
            (msg as Discord.Message).delete({timeout: 60000});
        });

        db.push(`/users/${msgObject.author.id}/cooldown`, this._cooldown);
    }
}
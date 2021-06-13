import * as Discord from "discord.js";
import {IBotCommand} from "../api";
import { JsonDB } from 'node-json-db';
const db = new JsonDB("userData", true, true);

export default class gamble implements IBotCommand {
    private readonly _command = ["gamble", "bet"];
    private readonly _cooldown = 10;

    help(): string {
        return "This command is to gamble a chosen amount of money";
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

        if (args.length < 0) {
            msgObject.reply("You need to specify an amount to gamble")
                .then(msg => {
                    (msg as Discord.Message).delete({timeout: 60000});
                });
            return;
        }

        if (args.join() == "") {
            msgObject.reply("You need to specify an amount to gamble")
                .then(msg => {
                    (msg as Discord.Message).delete({timeout: 60000});
                });
            return;
        }

        if (parseInt(args[0]) == NaN) {
            msgObject.reply("You need to specify a number")
                .then(msg => {
                    (msg as Discord.Message).delete({timeout: 60000});
                });
            return;
        }
        let bet = parseInt(args[0]);
        if (bet < 10) {
            msgObject.reply("You can't gamble less than 10 gold")
                .then(msg => {
                    (msg as Discord.Message).delete({timeout: 60000});
                });
            return;
        }
        let userGold = db.getData(`/users/${msgObject.author.id}/money`);
        if (userGold < bet) {
            msgObject.reply("You can't gamble more than your available gold")
                .then(msg => {
                    (msg as Discord.Message).delete({timeout: 60000});
                });
            return;
        }
        let win = false
            
        if (bet > 1000) {
            if (Math.random() < 0.5) {
                win = true;
            }
        } else if (bet > 100) {
            if (Math.random() < 0.3) {
                win = true;
            }
        } else {
            if (Math.random() < 0.7) {
                win = true;
            }
        }
        let embed = new Discord.MessageEmbed()
            .setColor("YELLOW")
            .setTitle(`${msgObject.author.username}'s Gamble`)
            .setFooter("oh no, gambling");

        if (win) {
            db.push(`/users/${msgObject.author.id}/money`, userGold + bet);
            embed.setDescription(`You won ${bet} gold`);
        } else {
            db.push(`/users/${msgObject.author.id}/money`, userGold - bet);
            embed.setDescription(`You lost ${bet} gold`);
        }
        msgObject.reply(embed)
        .then(msg => {
            (msg as Discord.Message).delete({timeout: 60000});
        });

        db.push(`/users/${msgObject.author.id}/cooldown`, this._cooldown);
    }
}
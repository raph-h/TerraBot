import * as Discord from "discord.js";
import { JsonDB } from "node-json-db";
import {IBotCommand} from "../api";
const db = new JsonDB("userData", true, true);

export default class leaderboard implements IBotCommand {
    private readonly _command = ["leaderboard", "lb"];
    private readonly _cooldown = 10;

    help(): string {
        return "This command is to see the richest people on the bot";
    }

    thisCommand(): string[] {
        return this._command;
    }

    async runCommand(args: string[], msgObject: Discord.Message, client: Discord.Client): Promise<void> {
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
        let leaderboard: { name: string; money: number; }[] = [];
        let users = db.getData(`/users`);
        Object.keys(users).forEach(element => {
            if (users[element].money > 0) {
                leaderboard.push({name: element, money: users[element].money})
            }
        });

        leaderboard.sort((a, b) => b.money - a.money);
        
        let embed = new Discord.MessageEmbed()
            .setColor("GREY")
            .setFooter("Rich")
            .setTitle("Leaderboard");

        let desc = ""

        for (let i = 0; i < 5; i++) {
            let element = leaderboard[i];
            let clientName = (await (client.users.fetch(element.name))).username;
            desc += `**${i + 1}.** ${clientName}\n`;
        };
        embed.setDescription(desc);

        msgObject.reply(embed)
        .then(msg => {
            (msg as Discord.Message).delete({timeout: 120000});
        });

        db.push(`/users/${msgObject.author.id}/cooldown`, this._cooldown);
    }
}
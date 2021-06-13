import * as Discord from "discord.js";
import {IBotCommand} from "../api";
import { JsonDB } from "node-json-db";
const db = new JsonDB("userData", true, true);

export default class fight implements IBotCommand {
    private readonly _command = ["fight", "duel"];
    

    help(): string {
        return "This command is to fight other users";
    }

    thisCommand(): string[] {
        return this._command;
    }

    async runCommand(args: string[], msgObject: Discord.Message, client: Discord.Client): Promise<void> {
        msgObject.delete();
        let user: Discord.User;
        if (args.length > 0) {
            if (msgObject.mentions.users.size > 0) {
                user = (msgObject.mentions.users.first()) as Discord.User;
            } else {
                msgObject.reply("You need to specify someone to fight")
                .then(msg => {
                    (msg as Discord.Message).delete({timeout: 60000});
                });
                return;
            }
        } else {
            msgObject.reply("You need to specify someone to fight")
                .then(msg => {
                    (msg as Discord.Message).delete({timeout: 60000});
                });
            return;
        }
        if (user == msgObject.author) {
            msgObject.reply("You can't fight yourself")
                .then(msg => {
                    (msg as Discord.Message).delete({timeout: 60000});
                });
            return;
        }
        if (user.bot) {
            msgObject.reply("You can't fight a bot, they're too strong")
                .then(msg => {
                    (msg as Discord.Message).delete({timeout: 60000});
                });
            return;
        }

        if (db.exists(`/users/${msgObject.author.id}/fight`)) {
            msgObject.reply("You are already in a fight")
                .then(msg => {
                    (msg as Discord.Message).delete({timeout: 60000});
                });
            return;
        }

        if (db.exists(`/users/${user.id}/fight`)) {
            msgObject.reply(user.username + " are already in a fight")
                .then(msg => {
                    (msg as Discord.Message).delete({timeout: 60000});
                });
            return;
        }

        let msg = await msgObject.channel.send("Please react to this message to accept the fight " + user.toString());
        await (msg as Discord.Message).react("✅");
        await (msg as Discord.Message).react("❎");
        
        const filter = (reaction: Discord.MessageReaction, useri: Discord.User) => (reaction.emoji.name === "✅" || reaction.emoji.name === "❎") && useri.id === user.id;
        const results = await (msg as Discord.Message).awaitReactions(filter, {time: 10000});
        if (results.get("✅")?.count - 1 > 0) {
            db.push(`/users/${msgObject.author.id}/fight`, user.id);
            db.push(`/users/${user.id}/fight`, msgObject.author.id);

            msgObject.reply("Fight has started").then(msg => {
                (msg as Discord.Message).delete({timeout: 60000});
            });
            msg.delete();
        } else {
            msgObject.reply("Fight has been cancelled").then(msg => {
                (msg as Discord.Message).delete({timeout: 60000});
            });
            msg.delete();
        }
    }
}
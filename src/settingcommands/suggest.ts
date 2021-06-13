import * as Discord from "discord.js";
import {IBotCommand} from "../api";
import { JsonDB } from 'node-json-db';
const db = new JsonDB("botData", true, true);

export default class suggest implements IBotCommand {
    private readonly _command = ["suggest"];

    help(): string {
        return "This command is to suggest an idea to the creator";
    }

    thisCommand(): string[] {
        return this._command;
    }

    async runCommand(args: string[], msgObject: Discord.Message): Promise<void> {
        msgObject.delete();
        if (args.length < 1) {
            msgObject.reply("You have to write a suggestion")
            .then(msg => {
                (msg as Discord.Message).delete({timeout: 60000});
            });
            return;
        }
        let suggestion = args.join(" ");
        db.reload();

        db.push(`/suggestions/${msgObject.author.id}`, `${msgObject.author.username}: ${suggestion}`);
        msgObject.reply("Thanks for submitting a suggestion, the creator will read them soon")
            .then(msg => {
                (msg as Discord.Message).delete({timeout: 60000});
            });
    }
}
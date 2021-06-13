import * as Discord from "discord.js";
import {IBotCommand} from "../api";
import * as ConfigFile from "../config";
import { JsonDB } from 'node-json-db';
const db = new JsonDB("botData", true, true);

export default class prefix implements IBotCommand {
    private readonly _command = ["prefix", "setprefix"];

    help(): string {
        return "This command is to set a different prefix on your server";
    }

    thisCommand(): string[] {
        return this._command;
    }

    async runCommand(args: string[], msgObject: Discord.Message): Promise<void> {
        msgObject.delete();
        if (!msgObject.member?.hasPermission("MANAGE_CHANNELS")) {
            msgObject.reply("Nice try, you don't have permission to try and change my prefix")
            .then(msg => {
                (msg as Discord.Message).delete({timeout: 60000});
            });
            return;
        }
        if (args.length < 0) {
            msgObject.reply("You need to type a prefix")
            .then(msg => {
                (msg as Discord.Message).delete({timeout: 60000});
            });
            return;
        }
        let prefix = args.join("");

        if (prefix == "") {
            msgObject.reply("You need to type a prefix")
            .then(msg => {
                (msg as Discord.Message).delete({timeout: 60000});
            });
            return;
        }
        if (prefix === ConfigFile.config.prefix) {
            db.delete(`/prefixes/${msgObject.guild?.id}`);
        } else {
            db.push(`/prefixes/${msgObject.guild?.id}`, prefix);
        }
        msgObject.reply(`Prefix set as ${prefix}`)
        .then(msg => {
            (msg as Discord.Message).delete({timeout: 60000});
        });
    }
}
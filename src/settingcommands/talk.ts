import * as Discord from "discord.js";
import {IBotCommand} from "../api";
import * as ConfigFile from "../config";
import * as ReadLine from "readline";

export default class talk implements IBotCommand {
    private readonly _command = ["talk"];
    
    help(): string {
        return "";
    }

    thisCommand(): string[] {
        return this._command;
    }

    async runCommand(args: string[], msgObject: Discord.Message): Promise<void> {
        msgObject.delete();
        if (msgObject.author.id == ConfigFile.config.raphid) {
            const rl = ReadLine.createInterface({
                input: process.stdin,
                output: process.stdout,
            });
            rl.question("Type:\n", function(answer) {
                msgObject.channel.send(answer);
                rl.close();
            });
        }
    }
}
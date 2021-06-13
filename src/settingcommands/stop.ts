import * as Discord from "discord.js";
import {IBotCommand} from "../api";
import * as ConfigFile from "../config";

export default class stop implements IBotCommand {
    private readonly _command = ["stop", "exit"];

    help(): string {
        return "";
    }

    thisCommand(): string[] {
        return this._command;
    }

    async runCommand(args: string[], msgObject: Discord.Message): Promise<void> {
        msgObject.delete()
        .then(() => {
            if (msgObject.author.id == ConfigFile.config.raphid) {
                process.exit();
            }
        });
    }
}
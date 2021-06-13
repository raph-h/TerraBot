import * as Discord from "discord.js";
import {IBotCommand} from "../api";

export default class test implements IBotCommand {
    private readonly _command = ["test"];

    help(): string {
        return "This command is to test things";
    }

    thisCommand(): string[] {
        return this._command;
    }

    async runCommand(args: string[], msgObject: Discord.Message): Promise<void> {
        msgObject.delete();
        msgObject.reply(`Testing complete, preparing to dissect ${msgObject.author.username}`)
        .then(msg => {
            (msg as Discord.Message).delete({timeout: 60000});
        });
    }
}
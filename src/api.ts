import * as Discord from "discord.js";

export interface IBotCommand {
    help(): string;
    thisCommand(): string[];
    runCommand(args: string[], msgObject: Discord.Message, client: Discord.Client, botCommands: IBotCommand[]): Promise<void>;
}
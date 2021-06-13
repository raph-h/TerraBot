import * as Discord from "discord.js";
import {IBotCommand} from "../api";

export default class test implements IBotCommand {
    private readonly _command = ["help"];

    help(): string {
        return "This command tells you all usable commands";
    }

    thisCommand(): string[] {
        return this._command;
    }

    async runCommand(args: string[], msgObject: Discord.Message, client: Discord.Client, botCommands: IBotCommand[]): Promise<void> {
        msgObject.delete();
        msgObject.reply(`Sent a dm containing all commands`)
        .then(msg => {
            (msg as Discord.Message).delete({timeout: 60000});
        });
        let embed = new Discord.MessageEmbed()
                        .setColor("RED")
                        .setTitle("All commands")
                        .setFooter("Very helpful am I right?");

        for(const command of botCommands) {
            if (command.thisCommand().length > 0 && command.help() !== "") {
                embed.addField(command.thisCommand().join(", "), command.help());
            }
        }
        
        msgObject.author.send(embed).catch(console.error);
    }
}
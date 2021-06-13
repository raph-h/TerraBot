import * as Discord from "discord.js";
import {IBotCommand} from "../api";

export default class botinfo implements IBotCommand {
    private readonly _command = ["botinfo"];

    help(): string {
        return "This command is to test things";
    }

    thisCommand(): string[] {
        return this._command;
    }

    async runCommand(args: string[], msgObject: Discord.Message, client: Discord.Client): Promise<void> {
        msgObject.delete();
        let embed = new Discord.MessageEmbed()
            .setColor("RED")
            .setTitle("Information about me")
            .setFooter("Don't hack me :(");
        embed.addField("Add me to your server: ", `https://discord.com/oauth2/authorize?client_id=${client.user.id}&scope=bot+applications.commands`);
        embed.addField("My source code", "https://github.com/RaphGamingz/TerraBot");
    
        msgObject.reply(embed)
        .then(msg => {
            (msg as Discord.Message).delete({timeout: 60000});
        });
    }
}
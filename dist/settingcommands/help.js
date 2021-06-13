"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Discord = require("discord.js");
class test {
    constructor() {
        this._command = ["help"];
    }
    help() {
        return "This command tells you all usable commands";
    }
    thisCommand() {
        return this._command;
    }
    runCommand(args, msgObject, client, botCommands) {
        return __awaiter(this, void 0, void 0, function* () {
            msgObject.delete();
            msgObject.reply(`Sent a dm containing all commands`)
                .then(msg => {
                msg.delete({ timeout: 60000 });
            });
            let embed = new Discord.MessageEmbed()
                .setColor("RED")
                .setTitle("All commands")
                .setFooter("Very helpful am I right?");
            for (const command of botCommands) {
                if (command.thisCommand().length > 0 && command.help() !== "") {
                    embed.addField(command.thisCommand().join(", "), command.help());
                }
            }
            msgObject.author.send(embed).catch(console.error);
        });
    }
}
exports.default = test;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVscC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zZXR0aW5nY29tbWFuZHMvaGVscC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHNDQUFzQztBQUd0QyxNQUFxQixJQUFJO0lBQXpCO1FBQ3FCLGFBQVEsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBNkJ6QyxDQUFDO0lBM0JHLElBQUk7UUFDQSxPQUFPLDRDQUE0QyxDQUFDO0lBQ3hELENBQUM7SUFFRCxXQUFXO1FBQ1AsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3pCLENBQUM7SUFFSyxVQUFVLENBQUMsSUFBYyxFQUFFLFNBQTBCLEVBQUUsTUFBc0IsRUFBRSxXQUEwQjs7WUFDM0csU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ25CLFNBQVMsQ0FBQyxLQUFLLENBQUMsbUNBQW1DLENBQUM7aUJBQ25ELElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRTtnQkFDUCxHQUF1QixDQUFDLE1BQU0sQ0FBQyxFQUFDLE9BQU8sRUFBRSxLQUFLLEVBQUMsQ0FBQyxDQUFDO1lBQ3RELENBQUMsQ0FBQyxDQUFDO1lBQ0gsSUFBSSxLQUFLLEdBQUcsSUFBSSxPQUFPLENBQUMsWUFBWSxFQUFFO2lCQUNyQixRQUFRLENBQUMsS0FBSyxDQUFDO2lCQUNmLFFBQVEsQ0FBQyxjQUFjLENBQUM7aUJBQ3hCLFNBQVMsQ0FBQywwQkFBMEIsQ0FBQyxDQUFDO1lBRXZELEtBQUksTUFBTSxPQUFPLElBQUksV0FBVyxFQUFFO2dCQUM5QixJQUFJLE9BQU8sQ0FBQyxXQUFXLEVBQUUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLE9BQU8sQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLEVBQUU7b0JBQzNELEtBQUssQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztpQkFDcEU7YUFDSjtZQUVELFNBQVMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDdEQsQ0FBQztLQUFBO0NBQ0o7QUE5QkQsdUJBOEJDIn0=
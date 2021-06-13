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
class botinfo {
    constructor() {
        this._command = ["botinfo"];
    }
    help() {
        return "This command is to test things";
    }
    thisCommand() {
        return this._command;
    }
    runCommand(args, msgObject, client) {
        return __awaiter(this, void 0, void 0, function* () {
            msgObject.delete();
            let embed = new Discord.MessageEmbed()
                .setColor("RED")
                .setTitle("Information about me")
                .setFooter("Don't hack me :(");
            embed.addField("Add me to your server: ", `https://discord.com/oauth2/authorize?client_id=${client.user.id}&scope=bot+applications.commands`);
            embed.addField("My source code", "https://github.com/RaphGamingz/TerraBot");
            msgObject.reply(embed)
                .then(msg => {
                msg.delete({ timeout: 60000 });
            });
        });
    }
}
exports.default = botinfo;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYm90aW5mby5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zZXR0aW5nY29tbWFuZHMvYm90aW5mby50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHNDQUFzQztBQUd0QyxNQUFxQixPQUFPO0lBQTVCO1FBQ3FCLGFBQVEsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBd0I1QyxDQUFDO0lBdEJHLElBQUk7UUFDQSxPQUFPLGdDQUFnQyxDQUFDO0lBQzVDLENBQUM7SUFFRCxXQUFXO1FBQ1AsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3pCLENBQUM7SUFFSyxVQUFVLENBQUMsSUFBYyxFQUFFLFNBQTBCLEVBQUUsTUFBc0I7O1lBQy9FLFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUNuQixJQUFJLEtBQUssR0FBRyxJQUFJLE9BQU8sQ0FBQyxZQUFZLEVBQUU7aUJBQ2pDLFFBQVEsQ0FBQyxLQUFLLENBQUM7aUJBQ2YsUUFBUSxDQUFDLHNCQUFzQixDQUFDO2lCQUNoQyxTQUFTLENBQUMsa0JBQWtCLENBQUMsQ0FBQztZQUNuQyxLQUFLLENBQUMsUUFBUSxDQUFDLHlCQUF5QixFQUFFLGtEQUFrRCxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsa0NBQWtDLENBQUMsQ0FBQztZQUM5SSxLQUFLLENBQUMsUUFBUSxDQUFDLGdCQUFnQixFQUFFLHlDQUF5QyxDQUFDLENBQUM7WUFFNUUsU0FBUyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUM7aUJBQ3JCLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRTtnQkFDUCxHQUF1QixDQUFDLE1BQU0sQ0FBQyxFQUFDLE9BQU8sRUFBRSxLQUFLLEVBQUMsQ0FBQyxDQUFDO1lBQ3RELENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQztLQUFBO0NBQ0o7QUF6QkQsMEJBeUJDIn0=
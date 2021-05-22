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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const Discord = __importStar(require("discord.js"));
class serverinfo {
    constructor() {
        this._command = "serverinfo";
    }
    help() {
        return "This command shows the info of the server";
    }
    isThisCommand(command) {
        return command === this._command;
    }
    runCommand(args, msgObject, client) {
        return __awaiter(this, void 0, void 0, function* () {
            msgObject.delete();
            let embed = new Discord.RichEmbed()
                .setColor([0, 200, 200])
                .setTitle("Server Info")
                .setImage(msgObject.guild.iconURL)
                .setDescription("Welcome to our server, here is some information you might like to know!")
                .addField("Owner", msgObject.guild.owner.user.username)
                .addField("Server Count:", `Our server currently has ${msgObject.guild.memberCount} members`)
                .setFooter("This is pretty cool, right?");
            msgObject.channel.send(embed)
                .then(msg => {
                msg.delete(10000);
            })
                .catch(console.error);
        });
    }
}
exports.default = serverinfo;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmVyaW5mby5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21tYW5kcy9nZW5lcmFsL3NlcnZlcmluZm8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0RBQXNDO0FBR3RDLE1BQXFCLFVBQVU7SUFBL0I7UUFFcUIsYUFBUSxHQUFHLFlBQVksQ0FBQTtJQThCNUMsQ0FBQztJQTVCRyxJQUFJO1FBQ0EsT0FBTywyQ0FBMkMsQ0FBQztJQUN2RCxDQUFDO0lBRUQsYUFBYSxDQUFDLE9BQWU7UUFDekIsT0FBTyxPQUFPLEtBQUssSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUNyQyxDQUFDO0lBRUssVUFBVSxDQUFDLElBQWMsRUFBRSxTQUEwQixFQUFFLE1BQXNCOztZQUMvRSxTQUFTLENBQUMsTUFBTSxFQUFFLENBQUM7WUFFbkIsSUFBSSxLQUFLLEdBQUcsSUFBSSxPQUFPLENBQUMsU0FBUyxFQUFFO2lCQUM5QixRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO2lCQUN2QixRQUFRLENBQUMsYUFBYSxDQUFDO2lCQUN2QixRQUFRLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUM7aUJBQ2pDLGNBQWMsQ0FBQyx5RUFBeUUsQ0FBQztpQkFDekYsUUFBUSxDQUFDLE9BQU8sRUFBRSxTQUFTLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO2lCQUN0RCxRQUFRLENBQUMsZUFBZSxFQUFFLDRCQUE0QixTQUFTLENBQUMsS0FBSyxDQUFDLFdBQVcsVUFBVSxDQUFDO2lCQUM1RixTQUFTLENBQUMsNkJBQTZCLENBQUMsQ0FBQTtZQUU3QyxTQUFTLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7aUJBQ3hCLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRTtnQkFDUCxHQUF1QixDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUMzQyxDQUFDLENBQUM7aUJBQ0QsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM5QixDQUFDO0tBQUE7Q0FHSjtBQWhDRCw2QkFnQ0MifQ==
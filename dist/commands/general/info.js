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
class info {
    constructor() {
        this._command = "info";
    }
    help() {
        return "This command displays your info (or the mentioned user's)";
    }
    isThisCommand(command) {
        return command === this._command;
    }
    runCommand(args, msgObject, client) {
        return __awaiter(this, void 0, void 0, function* () {
            msgObject.delete();
            let mentionedUser;
            if (args.length > 0) {
                if (msgObject.mentions.users.size > 0) {
                    mentionedUser = msgObject.mentions.users.first();
                }
                else {
                    return;
                }
            }
            else {
                mentionedUser = msgObject.member.user;
            }
            let embed = new Discord.RichEmbed()
                .setColor([0, 200, 0])
                .setTitle(`${mentionedUser.username}'s Info`)
                .setThumbnail(mentionedUser.avatarURL)
                .setDescription("Here is some info:")
                .addField("Status", mentionedUser.presence.status)
                .addField("Playing", mentionedUser.presence.game)
                .addField("Joined Discord", mentionedUser.createdAt)
                .setFooter(mentionedUser.id);
            msgObject.channel.send(embed)
                .then(msg => {
                msg.delete(10000);
            })
                .catch(console.error);
        });
    }
}
exports.default = info;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5mby5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21tYW5kcy9nZW5lcmFsL2luZm8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0RBQXNDO0FBR3RDLE1BQXFCLElBQUk7SUFBekI7UUFFcUIsYUFBUSxHQUFHLE1BQU0sQ0FBQTtJQTBDdEMsQ0FBQztJQXhDRyxJQUFJO1FBQ0EsT0FBTywyREFBMkQsQ0FBQztJQUN2RSxDQUFDO0lBRUQsYUFBYSxDQUFDLE9BQWU7UUFDekIsT0FBTyxPQUFPLEtBQUssSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUNyQyxDQUFDO0lBRUssVUFBVSxDQUFDLElBQWMsRUFBRSxTQUEwQixFQUFFLE1BQXNCOztZQUMvRSxTQUFTLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDbkIsSUFBSSxhQUEyQixDQUFDO1lBRWhDLElBQUksSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7Z0JBQ2pCLElBQUksU0FBUyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFHLENBQUMsRUFBRTtvQkFDbkMsYUFBYSxHQUFHLFNBQVMsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDO2lCQUNwRDtxQkFBTTtvQkFDSCxPQUFPO2lCQUNWO2FBQ0o7aUJBQU07Z0JBQ0gsYUFBYSxHQUFHLFNBQVMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDO2FBQ3pDO1lBRUQsSUFBSSxLQUFLLEdBQUcsSUFBSSxPQUFPLENBQUMsU0FBUyxFQUFFO2lCQUM5QixRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO2lCQUNyQixRQUFRLENBQUMsR0FBRyxhQUFhLENBQUMsUUFBUSxTQUFTLENBQUM7aUJBQzVDLFlBQVksQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDO2lCQUNyQyxjQUFjLENBQUMsb0JBQW9CLENBQUM7aUJBQ3BDLFFBQVEsQ0FBQyxRQUFRLEVBQUcsYUFBOEIsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDO2lCQUNuRSxRQUFRLENBQUMsU0FBUyxFQUFHLGFBQThCLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQztpQkFDbEUsUUFBUSxDQUFDLGdCQUFnQixFQUFHLGFBQThCLENBQUMsU0FBUyxDQUFDO2lCQUNyRSxTQUFTLENBQUUsYUFBOEIsQ0FBQyxFQUFFLENBQUMsQ0FBQTtZQUVsRCxTQUFTLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7aUJBQ3hCLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRTtnQkFDUCxHQUF1QixDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUMzQyxDQUFDLENBQUM7aUJBQ0QsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM5QixDQUFDO0tBQUE7Q0FHSjtBQTVDRCx1QkE0Q0MifQ==
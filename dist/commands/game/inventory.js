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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Discord = __importStar(require("discord.js"));
const node_json_db_1 = __importDefault(require("node-json-db"));
var db = new node_json_db_1.default("DataBase", true, true);
class inventory {
    constructor() {
        this._command = "inventory";
    }
    help() {
        return "This command displays your inventory (or the mentioned user's)";
    }
    isThisCommand(command) {
        return command === this._command;
    }
    runCommand(args, msgObject, client) {
        return __awaiter(this, void 0, void 0, function* () {
            msgObject.delete();
            try {
                db.getData("/" + msgObject.author.id);
            }
            catch (error) {
                db.push("/" + msgObject.author.id, { money: 50, health: 100, items: [] });
            }
            ;
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
            let userMoney = db.getData(`/${mentionedUser.id}/money`);
            let userItems = (db.getData(`/${mentionedUser.id}`).items).join("\n");
            let userHealth = db.getData(`/${mentionedUser.id}/health`);
            if (userItems == "") {
                userItems = "Empty";
            }
            let inventoryEmbed = new Discord.RichEmbed()
                .setTitle(`${mentionedUser.username}'s Info`)
                .setColor([200, 0, 0])
                .addField("Health:", `${userHealth}`)
                .addField("Money:", `${userMoney}`)
                .addField("Items:", `${userItems}`);
            msgObject.channel.send(inventoryEmbed)
                .then(msg => {
                msg.delete(10000)
                    .catch(console.error);
            });
        });
    }
}
exports.default = inventory;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW52ZW50b3J5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvbW1hbmRzL2dhbWUvaW52ZW50b3J5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG9EQUFzQztBQUV0QyxnRUFBa0M7QUFFbEMsSUFBSSxFQUFFLEdBQUcsSUFBSSxzQkFBTSxDQUFDLFVBQVUsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFFNUMsTUFBcUIsU0FBUztJQUE5QjtRQUVxQixhQUFRLEdBQUcsV0FBVyxDQUFBO0lBc0QzQyxDQUFDO0lBcERHLElBQUk7UUFDQSxPQUFPLGdFQUFnRSxDQUFDO0lBQzVFLENBQUM7SUFFRCxhQUFhLENBQUMsT0FBZTtRQUN6QixPQUFPLE9BQU8sS0FBSyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3JDLENBQUM7SUFFSyxVQUFVLENBQUMsSUFBYyxFQUFFLFNBQTBCLEVBQUUsTUFBc0I7O1lBQy9FLFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUVuQixJQUFJO2dCQUNBLEVBQUUsQ0FBQyxPQUFPLENBQUMsR0FBRyxHQUFHLFNBQVMsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUM7YUFDekM7WUFBQyxPQUFNLEtBQUssRUFBRTtnQkFDWCxFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxTQUFTLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxFQUFDLEtBQUssRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFDLENBQUMsQ0FBQzthQUMzRTtZQUFBLENBQUM7WUFFRixJQUFJLGFBQTJCLENBQUM7WUFFaEMsSUFBSSxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtnQkFDakIsSUFBSSxTQUFTLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxJQUFJLEdBQUcsQ0FBQyxFQUFFO29CQUNuQyxhQUFhLEdBQUcsU0FBUyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLENBQUM7aUJBQ3BEO3FCQUFNO29CQUNILE9BQU87aUJBQ1Y7YUFDSjtpQkFBTTtnQkFDSCxhQUFhLEdBQUcsU0FBUyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7YUFDekM7WUFFRCxJQUFJLFNBQVMsR0FBVyxFQUFFLENBQUMsT0FBTyxDQUFDLElBQUksYUFBYSxDQUFDLEVBQUUsUUFBUSxDQUFDLENBQUE7WUFDaEUsSUFBSSxTQUFTLEdBQVksQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLElBQUksYUFBYSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFjLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFBO1lBQzNGLElBQUksVUFBVSxHQUFXLEVBQUUsQ0FBQyxPQUFPLENBQUMsSUFBSSxhQUFhLENBQUMsRUFBRSxTQUFTLENBQUMsQ0FBQTtZQUVsRSxJQUFJLFNBQVMsSUFBSSxFQUFFLEVBQUU7Z0JBQ2pCLFNBQVMsR0FBRyxPQUFPLENBQUE7YUFDdEI7WUFFRCxJQUFJLGNBQWMsR0FBRyxJQUFJLE9BQU8sQ0FBQyxTQUFTLEVBQUU7aUJBQ3ZDLFFBQVEsQ0FBQyxHQUFHLGFBQWEsQ0FBQyxRQUFRLFNBQVMsQ0FBQztpQkFDNUMsUUFBUSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztpQkFDckIsUUFBUSxDQUFDLFNBQVMsRUFBRSxHQUFHLFVBQVUsRUFBRSxDQUFDO2lCQUNwQyxRQUFRLENBQUMsUUFBUSxFQUFFLEdBQUcsU0FBUyxFQUFFLENBQUM7aUJBQ2xDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsR0FBRyxTQUFTLEVBQUUsQ0FBQyxDQUFBO1lBRXZDLFNBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQztpQkFDakMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFO2dCQUNQLEdBQXVCLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQztxQkFDakMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUM5QixDQUFDLENBQUMsQ0FBQztRQUNYLENBQUM7S0FBQTtDQUdKO0FBeERELDRCQXdEQyJ9
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
const itemData_1 = require("../../itemData");
var db = new node_json_db_1.default("DataBase", true, true);
class fish {
    constructor() {
        this._command = "fish";
    }
    help() {
        return "Fishes for fish if you have a fishing rod";
    }
    isThisCommand(command) {
        return command === this._command;
    }
    runCommand(args, msgObject, client) {
        return __awaiter(this, void 0, void 0, function* () {
            msgObject.delete();
            db.reload();
            try {
                db.getData(`/${msgObject.author.id}`);
            }
            catch (error) {
                db.push(`/${msgObject.author.id}`, { money: 50, health: 100, items: [] });
            }
            ;
            let index = db.getData(`/${msgObject.author.id}/items`).indexOf("Fishing Rod");
            if (index == -1) {
                msgObject.channel.send("You don't have a fishing rod")
                    .then(msg => {
                    msg.delete(10000);
                });
                return;
            }
            let item = null;
            itemData_1.itemData.items.forEach(element => {
                if (element.name == "Fish") {
                    item = element;
                }
            });
            if (Math.floor(Math.random() * 2) == 1) {
                db.push(`/${msgObject.author.id}/items[]`, item.name);
                let userItems = db.getData(`/${msgObject.author.id}/items`).join("\n");
                let userMoney = db.getData(`/${msgObject.author.id}/money`);
                let Embed = new Discord.RichEmbed()
                    .setTitle(`${msgObject.member.displayName} just caught: ${item.name}`)
                    .setColor([200, 0, 0])
                    .addField("Your Money", userMoney)
                    .addField("Your Items", userItems);
                msgObject.channel.send(Embed)
                    .then(msg => {
                    msg.delete(10000);
                });
                return;
            }
            else {
                msgObject.channel.send("You didn't get a bite")
                    .then(msg => {
                    msg.delete(10000);
                });
                return;
            }
        });
    }
}
exports.default = fish;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlzaC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21tYW5kcy9nYW1lL2Zpc2gudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0RBQXNDO0FBRXRDLGdFQUFrQztBQUVsQyw2Q0FBMEM7QUFFMUMsSUFBSSxFQUFFLEdBQUcsSUFBSSxzQkFBTSxDQUFDLFVBQVUsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFFNUMsTUFBcUIsSUFBSTtJQUF6QjtRQUVxQixhQUFRLEdBQUcsTUFBTSxDQUFBO0lBK0R0QyxDQUFDO0lBN0RHLElBQUk7UUFDQSxPQUFPLDJDQUEyQyxDQUFDO0lBQ3ZELENBQUM7SUFFRCxhQUFhLENBQUMsT0FBZTtRQUN6QixPQUFPLE9BQU8sS0FBSyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3JDLENBQUM7SUFFSyxVQUFVLENBQUMsSUFBYyxFQUFFLFNBQTBCLEVBQUUsTUFBc0I7O1lBQy9FLFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUNuQixFQUFFLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDWixJQUFJO2dCQUNBLEVBQUUsQ0FBQyxPQUFPLENBQUMsSUFBSSxTQUFTLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7YUFDekM7WUFBQyxPQUFNLEtBQUssRUFBRTtnQkFDWCxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksU0FBUyxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFDLEtBQUssRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFDLENBQUMsQ0FBQzthQUMzRTtZQUFBLENBQUM7WUFFRixJQUFJLEtBQUssR0FBSSxFQUFFLENBQUMsT0FBTyxDQUFDLElBQUksU0FBUyxDQUFDLE1BQU0sQ0FBQyxFQUFFLFFBQVEsQ0FBYyxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQztZQUM3RixJQUFJLEtBQUssSUFBSSxDQUFDLENBQUMsRUFBRTtnQkFDYixTQUFTLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyw4QkFBOEIsQ0FBQztxQkFDakQsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFO29CQUNQLEdBQXVCLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUMzQyxDQUFDLENBQUMsQ0FBQztnQkFDUCxPQUFPO2FBQ1Y7WUFFRCxJQUFJLElBQUksR0FBYyxJQUFJLENBQUM7WUFFM0IsbUJBQVEsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFO2dCQUM3QixJQUFJLE9BQU8sQ0FBQyxJQUFJLElBQUksTUFBTSxFQUFFO29CQUN4QixJQUFJLEdBQUcsT0FBTyxDQUFDO2lCQUNsQjtZQUNMLENBQUMsQ0FBQyxDQUFDO1lBRUgsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUU7Z0JBQ3BDLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxTQUFTLENBQUMsTUFBTSxDQUFDLEVBQUUsVUFBVSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFFdEQsSUFBSSxTQUFTLEdBQUksRUFBRSxDQUFDLE9BQU8sQ0FBQyxJQUFJLFNBQVMsQ0FBQyxNQUFNLENBQUMsRUFBRSxRQUFRLENBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ3JGLElBQUksU0FBUyxHQUFXLEVBQUUsQ0FBQyxPQUFPLENBQUMsSUFBSSxTQUFTLENBQUMsTUFBTSxDQUFDLEVBQUUsUUFBUSxDQUFDLENBQUM7Z0JBRXBFLElBQUksS0FBSyxHQUFHLElBQUksT0FBTyxDQUFDLFNBQVMsRUFBRTtxQkFDOUIsUUFBUSxDQUFDLEdBQUcsU0FBUyxDQUFDLE1BQU0sQ0FBQyxXQUFXLGlCQUFpQixJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7cUJBQ3JFLFFBQVEsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7cUJBQ3JCLFFBQVEsQ0FBQyxZQUFZLEVBQUUsU0FBUyxDQUFDO3FCQUNqQyxRQUFRLENBQUMsWUFBWSxFQUFFLFNBQVMsQ0FBQyxDQUFBO2dCQUN0QyxTQUFTLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7cUJBQ3hCLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRTtvQkFDUCxHQUF1QixDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDM0MsQ0FBQyxDQUFDLENBQUM7Z0JBQ1AsT0FBTzthQUNWO2lCQUFNO2dCQUNILFNBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLHVCQUF1QixDQUFDO3FCQUMxQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUU7b0JBQ1AsR0FBdUIsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQzNDLENBQUMsQ0FBQyxDQUFDO2dCQUNQLE9BQU87YUFDVjtRQUVMLENBQUM7S0FBQTtDQUdKO0FBakVELHVCQWlFQyJ9
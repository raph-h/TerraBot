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
class sell {
    constructor() {
        this._command = "sell";
    }
    help() {
        return "Attempts to sell an item";
    }
    isThisCommand(command) {
        return command === this._command;
    }
    runCommand(args, msgObject, client) {
        return __awaiter(this, void 0, void 0, function* () {
            db.reload();
            msgObject.delete();
            if (args.length < 1) {
                msgObject.channel.send("Sorry I couldn't read what you were thinking to sell")
                    .then(msg => {
                    msg.delete(10000);
                });
                return;
            }
            try {
                db.getData(`/${msgObject.author.id}`);
            }
            catch (error) {
                db.push(`/${msgObject.author.id}`, { money: 50, health: 100, items: [] });
            }
            ;
            let ItemName = args.join(" ");
            let item = null;
            itemData_1.itemData.items.forEach(element => {
                if (element.name.toLowerCase() == ItemName.toLowerCase()) {
                    item = element;
                }
            });
            if (item === null) {
                msgObject.channel.send(`Sorry ${msgObject.author.username}, ${ItemName} doesn't exist`)
                    .then(msg => {
                    msg.delete(5000);
                });
                return;
            }
            let index = db.getData(`/${msgObject.author.id}/items`).indexOf((item.name));
            if (index != -1) {
                db.delete(`/${msgObject.author.id}/items[${index}]`);
            }
            else {
                msgObject.channel.send("You don't have the item you want to sell")
                    .then(msg => {
                    msg.delete(10000);
                });
                return;
            }
            let userMoney = db.getData(`/${msgObject.author.id}/money`);
            db.push(`/${msgObject.author.id}/money`, userMoney + (item.price / 2));
            let userItems = db.getData(`/${msgObject.author.id}/items`).join("\n");
            let Embed = new Discord.RichEmbed()
                .setTitle(`${msgObject.member.displayName} just sold: ${item.name} for $${item.price / 2}`)
                .setColor([200, 0, 0])
                .addField("Your Money", userMoney + (item.price / 2))
                .addField("Your Items", userItems);
            msgObject.channel.send(Embed)
                .then(msg => {
                msg.delete(10000);
            });
            return;
        });
    }
}
exports.default = sell;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21tYW5kcy9nYW1lL3NlbGwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0RBQXNDO0FBRXRDLGdFQUFrQztBQUVsQyw2Q0FBMEM7QUFFMUMsSUFBSSxFQUFFLEdBQUcsSUFBSSxzQkFBTSxDQUFDLFVBQVUsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFFNUMsTUFBcUIsSUFBSTtJQUF6QjtRQUVxQixhQUFRLEdBQUcsTUFBTSxDQUFBO0lBMkV0QyxDQUFDO0lBekVHLElBQUk7UUFDQSxPQUFPLDBCQUEwQixDQUFDO0lBQ3RDLENBQUM7SUFFRCxhQUFhLENBQUMsT0FBZTtRQUN6QixPQUFPLE9BQU8sS0FBSyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3JDLENBQUM7SUFFSyxVQUFVLENBQUMsSUFBYyxFQUFFLFNBQTBCLEVBQUUsTUFBc0I7O1lBQy9FLEVBQUUsQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUNaLFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUVuQixJQUFJLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO2dCQUNqQixTQUFTLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxzREFBc0QsQ0FBQztxQkFDekUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFO29CQUNQLEdBQXVCLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUMzQyxDQUFDLENBQUMsQ0FBQztnQkFDUCxPQUFPO2FBQ1Y7WUFFRCxJQUFJO2dCQUNBLEVBQUUsQ0FBQyxPQUFPLENBQUMsSUFBSSxTQUFTLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7YUFDekM7WUFBQyxPQUFNLEtBQUssRUFBRTtnQkFDWCxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksU0FBUyxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUs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
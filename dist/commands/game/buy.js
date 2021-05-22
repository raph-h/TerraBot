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
class buy {
    constructor() {
        this._command = "buy";
    }
    help() {
        return "Attempts to buy an item";
    }
    isThisCommand(command) {
        return command === this._command;
    }
    runCommand(args, msgObject, client) {
        return __awaiter(this, void 0, void 0, function* () {
            db.reload();
            msgObject.delete();
            if (args.length < 1) {
                msgObject.channel.send("Sorry I couldn't read what you were thinking to buy")
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
            let newItemName = args.join(" ");
            let item = null;
            itemData_1.itemData.items.forEach(element => {
                if (element.name.toLowerCase() == newItemName.toLowerCase()) {
                    item = element;
                }
            });
            if (item === null) {
                msgObject.channel.send(`Sorry ${msgObject.author.username}, ${newItemName} doesn't exist`)
                    .then(msg => {
                    msg.delete(5000);
                });
                return;
            }
            let userMoney = db.getData(`/${msgObject.author.id}/money`);
            if (userMoney < item.price) {
                msgObject.channel.send(`Sorry ${msgObject.author.username}, but ${newItemName} costs ${item.price} and you only have ${userMoney}`)
                    .then(msg => {
                    msg.delete(5000);
                });
                return;
            }
            db.push(`/${msgObject.author.id}/money`, userMoney - item.price);
            db.push(`/${msgObject.author.id}/items[]`, item.name);
            let userItems = db.getData(`/${msgObject.author.id}/items`).join("\n");
            let Embed = new Discord.RichEmbed()
                .setTitle(`${msgObject.member.displayName} just bought: ${item.name} for $${item.price}`)
                .setColor([200, 0, 0])
                .addField("Your Money", userMoney - item.price)
                .addField("Your Items", userItems);
            msgObject.channel.send(Embed)
                .then(msg => {
                msg.delete(10000);
            });
            return;
        });
    }
}
exports.default = buy;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnV5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvbW1hbmRzL2dhbWUvYnV5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG9EQUFzQztBQUV0QyxnRUFBa0M7QUFFbEMsNkNBQTBDO0FBRTFDLElBQUksRUFBRSxHQUFHLElBQUksc0JBQU0sQ0FBQyxVQUFVLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0FBRTVDLE1BQXFCLEdBQUc7SUFBeEI7UUFFcUIsYUFBUSxHQUFHLEtBQUssQ0FBQTtJQXlFckMsQ0FBQztJQXZFRyxJQUFJO1FBQ0EsT0FBTyx5QkFBeUIsQ0FBQztJQUNyQyxDQUFDO0lBRUQsYUFBYSxDQUFDLE9BQWU7UUFDekIsT0FBTyxPQUFPLEtBQUssSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUNyQyxDQUFDO0lBRUssVUFBVSxDQUFDLElBQWMsRUFBRSxTQUEwQixFQUFFLE1BQXNCOztZQUMvRSxFQUFFLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDWixTQUFTLENBQUMsTUFBTSxFQUFFLENBQUM7WUFFbkIsSUFBSSxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtnQkFDakIsU0FBUyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMscURBQXFELENBQUM7cUJBQ3hFLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRTtvQkFDUCxHQUF1QixDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDM0MsQ0FBQyxDQUFDLENBQUM7Z0JBQ1AsT0FBTzthQUNWO1lBRUQsSUFBSTtnQkFDQSxFQUFFLENBQUMsT0FBTyxDQUFDLElBQUksU0FBUyxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO2FBQ3pDO1lBQUMsT0FBTSxLQUFLLEVBQUU7Z0JBQ1gsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLFNBQVMsQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLEVB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
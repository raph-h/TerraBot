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
class craft {
    constructor() {
        this._command = "craft";
    }
    help() {
        return "Attempts to craft an item";
    }
    isThisCommand(command) {
        return command === this._command;
    }
    runCommand(args, msgObject, client) {
        return __awaiter(this, void 0, void 0, function* () {
            db.reload();
            msgObject.delete();
            if (args.length < 1) {
                let craftEmbed = new Discord.RichEmbed()
                    .setTitle("Craftable Items")
                    .setColor([200, 0, 0]);
                itemData_1.craftingData.recipes.forEach(element => {
                    craftEmbed.addField(element.Item, `Items Needed: ${element.Materials}`);
                });
                msgObject.channel.send(craftEmbed)
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
            itemData_1.craftingData.recipes.forEach(element => {
                if (element.Item.toLowerCase() == ItemName.toLowerCase()) {
                    item = element;
                }
            });
            if (item == null) {
                msgObject.channel.send(`Sorry ${msgObject.author.username}, ${ItemName} doesn't exist or cannot be crafted`)
                    .then(msg => {
                    msg.delete(5000);
                });
                return;
            }
            let removedItem = [];
            let enoughItems;
            item.Materials.forEach(element => {
                let index = db.getData(`/${msgObject.author.id}/items`).indexOf((element));
                if (index != -1) {
                    if (item.UsesItem == true) {
                        removedItem.push((element));
                        db.delete(`/${msgObject.author.id}/items[${index}]`);
                    }
                }
                else {
                    enoughItems = false;
                }
            });
            if (enoughItems == false) {
                if (removedItem.length < 1) {
                    removedItem.forEach(e => {
                        db.push(`/${msgObject.author.id}/items[]`, e);
                    });
                }
                msgObject.channel.send("You don't have enough items")
                    .then(msg => {
                    msg.delete(10000);
                });
                return;
            }
            db.push(`/${msgObject.author.id}/items[]`, item.Item);
            let userItems = db.getData(`/${msgObject.author.id}/items`).join("\n");
            let userMoney = db.getData(`/${msgObject.author.id}/money`);
            let Embed = new Discord.RichEmbed()
                .setTitle(`${msgObject.member.displayName} just made: ${item.Item}`)
                .setColor([200, 0, 0])
                .addField("Your Money", userMoney)
                .addField("Your Items", userItems);
            msgObject.channel.send(Embed)
                .then(msg => {
                msg.delete(10000);
            });
            return;
        });
    }
}
exports.default = craft;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JhZnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tbWFuZHMvZ2FtZS9jcmFmdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxvREFBc0M7QUFFdEMsZ0VBQWtDO0FBRWxDLDZDQUE4QztBQUU5QyxJQUFJLEVBQUUsR0FBRyxJQUFJLHNCQUFNLENBQUMsVUFBVSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztBQUU1QyxNQUFxQixLQUFLO0lBQTFCO1FBRXFCLGFBQVEsR0FBRyxPQUFPLENBQUE7SUFpR3ZDLENBQUM7SUEvRkcsSUFBSTtRQUNBLE9BQU8sMkJBQTJCLENBQUM7SUFDdkMsQ0FBQztJQUVELGFBQWEsQ0FBQyxPQUFlO1FBQ3pCLE9BQU8sT0FBTyxLQUFLLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDckMsQ0FBQztJQUVLLFVBQVUsQ0FBQyxJQUFjLEVBQUUsU0FBMEIsRUFBRSxNQUFzQjs7WUFDL0UsRUFBRSxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ1osU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBRW5CLElBQUksSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7Z0JBQ2pCLElBQUksVUFBVSxHQUFHLElBQUksT0FBTyxDQUFDLFNBQVMsRUFBRTtxQkFDdkMsUUFBUSxDQUFDLGlCQUFpQixDQUFDO3FCQUMzQixRQUFRLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUE7Z0JBRXRCLHVCQUFZLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRTtvQkFDbkMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFDLGlCQUFpQixPQUFPLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQztnQkFDM0UsQ0FBQyxDQUFDLENBQUM7Z0JBRUgsU0FBUyxDQUFDLE9BQU8sQ0FBQyxJQUFJ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
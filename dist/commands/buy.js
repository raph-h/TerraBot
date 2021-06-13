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
const node_json_db_1 = require("node-json-db");
const itemData_1 = require("../data/itemData");
const locationData_1 = require("../data/locationData");
const utils_1 = require("../utils");
const db = new node_json_db_1.JsonDB("userData", true, true);
class buy {
    constructor() {
        this._command = ["buy"];
    }
    help() {
        return "This command attempts to buy items";
    }
    thisCommand() {
        return this._command;
    }
    runCommand(args, msgObject) {
        return __awaiter(this, void 0, void 0, function* () {
            msgObject.delete();
            db.reload();
            if (args.length < 1) {
                msgObject.reply("You have to specify what item to buy")
                    .then(msg => {
                    msg.delete({ timeout: 60000 });
                });
                return;
            }
            let newItemName = args.join(" ");
            let item = null;
            for (let i = 0; i < locationData_1.locationData.locations.length; i++) {
                if (db.getData(`/users/${msgObject.author.id}/location`) == locationData_1.locationData.locations[i]) {
                    item = utils_1.searchItem(newItemName, itemData_1.itemData[i]);
                }
            }
            if (item === null) {
                msgObject.reply("This item doesn't exist")
                    .then(msg => {
                    msg.delete({ timeout: 60000 });
                });
                return;
            }
            item = (item);
            if (item.buy < 0) {
                msgObject.reply("You can't buy this item")
                    .then(msg => {
                    msg.delete({ timeout: 60000 });
                });
                return;
            }
            let goldAmount = db.getData(`/users/${msgObject.author.id}/money`);
            if (goldAmount < item.buy) {
                msgObject.reply(`You're too poor to buy a ${item.name}, you need ${item.buy - goldAmount} more gold`)
                    .then(msg => {
                    msg.delete({ timeout: 60000 });
                });
                return;
            }
            db.push(`/users/${msgObject.author.id}/money`, goldAmount - item.buy);
            utils_1.addItem(`/users/${msgObject.author.id}/items/${item.name}`, db, 1);
            let items = db.getData(`/users/${msgObject.author.id}/items`);
            let embed = new Discord.MessageEmbed()
                .setColor("BLUE")
                .setTitle(`${msgObject.author.username} successfully bought ${item.name}`)
                .setFooter("Good doing business with you")
                .addField("Items: ", utils_1.convertToString(items))
                .addField("Gold: ", goldAmount - item.buy);
            msgObject.reply(embed)
                .then(msg => {
                msg.delete({ timeout: 60000 });
            })
                .catch(console.error);
        });
    }
}
exports.default = buy;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnV5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbW1hbmRzL2J1eS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHNDQUFzQztBQUV0QywrQ0FBc0M7QUFFdEMsK0NBQTRDO0FBQzVDLHVEQUFvRDtBQUNwRCxvQ0FBZ0U7QUFDaEUsTUFBTSxFQUFFLEdBQUcsSUFBSSxxQkFBTSxDQUFDLFVBQVUsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFHOUMsTUFBcUIsR0FBRztJQUF4QjtRQUNxQixhQUFRLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQTJFeEMsQ0FBQztJQXpFRyxJQUFJO1FBQ0EsT0FBTyxvQ0FBb0MsQ0FBQztJQUNoRCxDQUFDO0lBRUQsV0FBVztRQUNQLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN6QixDQUFDO0lBRUssVUFBVSxDQUFDLElBQWMsRUFBRSxTQUEwQjs7WUFDdkQsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ25CLEVBQUUsQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUVaLElBQUksSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7Z0JBQ2pCLFNBQVMsQ0FBQyxLQUFLLENBQUMsc0NBQXNDLENBQUM7cUJBQ3RELElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRTtvQkFDUCxHQUF1QixDQUFDLE1BQU0sQ0FBQyxFQUFDLE9BQU8sRUFBRSxLQUFLLEVBQUMsQ0FBQyxDQUFDO2dCQUN0RCxDQUFDLENBQUMsQ0FBQztnQkFDSCxPQUFPO2FBQ1Y7WUFFRCxJQUFJLFdBQVcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBRWpDLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztZQUVoQixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsMkJBQVksQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxF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
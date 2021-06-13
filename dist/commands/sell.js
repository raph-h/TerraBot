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
const locationData_1 = require("../data/locationData");
const itemData_1 = require("../data/itemData");
const utils_1 = require("../utils");
const db = new node_json_db_1.JsonDB("userData", true, true);
class sell {
    constructor() {
        this._command = ["sell"];
    }
    help() {
        return "This command attempts to sell items";
    }
    thisCommand() {
        return this._command;
    }
    runCommand(args, msgObject) {
        return __awaiter(this, void 0, void 0, function* () {
            msgObject.delete();
            db.reload();
            if (args.length < 1) {
                msgObject.reply("You have to specify what item to sell")
                    .then(msg => {
                    msg.delete({ timeout: 60000 });
                });
                return;
            }
            let location = db.getData(`/users/${msgObject.author.id}/location`);
            if (!(location.toLowerCase() == locationData_1.locationData.locations[0].toLowerCase() || location.toLowerCase() == locationData_1.locationData.locations[3].toLowerCase())) {
                msgObject.reply("You can't sell here")
                    .then(msg => {
                    msg.delete({ timeout: 60000 });
                });
                return;
            }
            let items = db.getData(`/users/${msgObject.author.id}/items`);
            if (Object.keys(items).length < 1) {
                msgObject.reply("You don't have any items to sell")
                    .then(msg => {
                    msg.delete({ timeout: 60000 });
                });
                return;
            }
            let sellItemName = args.join(" ");
            let item = null;
            for (let i = 0; i < itemData_1.itemData.length; i++) {
                for (let u = 0; u < itemData_1.itemData[i].length; u++) {
                    if (itemData_1.itemData[i][u].name.toLowerCase() == sellItemName.toLowerCase()) {
                        item = itemData_1.itemData[i][u];
                    }
                }
            }
            if (item == null) {
                msgObject.reply("There is no such item as this")
                    .then(msg => {
                    msg.delete({ timeout: 60000 });
                });
                return;
            }
            if (!db.exists(`/users/${msgObject.author.id}/items/${item.name}`)) {
                msgObject.reply("You don't have this item")
                    .then(msg => {
                    msg.delete({ timeout: 60000 });
                });
                return;
            }
            item = item;
            if (item.sell < 0) {
                msgObject.reply("You can't sell this item")
                    .then(msg => {
                    msg.delete({ timeout: 60000 });
                });
                return;
            }
            let goldAmount = db.getData(`/users/${msgObject.author.id}/money`);
            db.push(`/users/${msgObject.author.id}/money`, goldAmount + item.sell);
            utils_1.removeItem(`/users/${msgObject.author.id}/items/${item.name}`, db, 1);
            items = db.getData(`/users/${msgObject.author.id}/items`);
            let embed = new Discord.MessageEmbed()
                .setColor("YELLOW")
                .setTitle(`${msgObject.author.username} successfully sold ${item.name}`)
                .setFooter("Good doing business with you")
                .addField("Items: ", utils_1.itemsToString(items))
                .addField("Gold: ", goldAmount + item.sell);
            msgObject.reply(embed)
                .then(msg => {
                msg.delete({ timeout: 60000 });
            })
                .catch(console.error);
        });
    }
}
exports.default = sell;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tYW5kcy9zZWxsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsc0NBQXNDO0FBRXRDLCtDQUFzQztBQUN0Qyx1REFBb0Q7QUFDcEQsK0NBQTRDO0FBRTVDLG9DQUFxRDtBQUNyRCxNQUFNLEVBQUUsR0FBRyxJQUFJLHFCQUFNLENBQUMsVUFBVSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztBQUc5QyxNQUFxQixJQUFJO0lBQXpCO1FBQ3FCLGFBQVEsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBNEZ6QyxDQUFDO0lBMUZHLElBQUk7UUFDQSxPQUFPLHFDQUFxQyxDQUFDO0lBQ2pELENBQUM7SUFFRCxXQUFXO1FBQ1AsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3pCLENBQUM7SUFFSyxVQUFVLENBQUMsSUFBYyxFQUFFLFNBQTBCOztZQUN2RCxTQUFTLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDbkIsRUFBRSxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBRVosSUFBSSxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtnQkFDakIsU0FBUyxDQUFDLEtBQUssQ0FBQyx1Q0FBdUMsQ0FBQztxQkFDdkQsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFO29CQUNQLEdBQXVCLENBQUMsTUFBTSxDQUFDLEVBQUMsT0FBTyxFQUFFLEtBQUssRUFBQyxDQUFDLENBQUM7Z0JBQ3RELENBQUMsQ0FBQyxDQUFDO2dCQUNILE9BQU87YUFDVjtZQUVELElBQUksUUFBUSxHQUFXLEVBQUUsQ0FBQyxPQUFPLENBQUMsVUFBVSxTQUFTLENBQUMsTUFBTSxDQUFDLEVBQUUsV0FBVyxDQUFXLENBQUE7WUFDckYsSUFBSSxDQUFDLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxJQUFJLDJCQUFZLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcs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
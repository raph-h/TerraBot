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
const utils_1 = require("../utils");
const itemData_1 = require("../data/itemData");
const db = new node_json_db_1.JsonDB("userData", true, true);
class pocket {
    constructor() {
        this._command = ["pocket", "poc"];
    }
    help() {
        return "This command shows what is in your pocket";
    }
    thisCommand() {
        return this._command;
    }
    runCommand(args, msgObject) {
        return __awaiter(this, void 0, void 0, function* () {
            msgObject.delete();
            let user = msgObject.author;
            db.reload();
            let gold = db.getData(`/users/${user.id}/money`);
            let items = db.getData(`/users/${user.id}/items`);
            let space = db.getData(`/users/${user.id}/maxStorage`);
            let takenSpace = utils_1.itemsToWeight(items, itemData_1.itemData);
            let embed = new Discord.MessageEmbed()
                .setColor("GREY")
                .setTitle(`${user.username}'s Pocket`)
                .setFooter("Imagine being poor")
                .addField("Gold: ", gold)
                .addField("Space: ", `${takenSpace}/${space}`)
                .addField("Items: ", utils_1.itemsToString(items));
            msgObject.reply(embed)
                .then(msg => {
                msg.delete({ timeout: 60000 });
            })
                .catch(console.error);
        });
    }
}
exports.default = pocket;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9ja2V0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbW1hbmRzL3BvY2tldC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHNDQUFzQztBQUV0QywrQ0FBc0M7QUFDdEMsb0NBQXdEO0FBQ3hELCtDQUE0QztBQUM1QyxNQUFNLEVBQUUsR0FBRyxJQUFJLHFCQUFNLENBQUMsVUFBVSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztBQUc5QyxNQUFxQixNQUFNO0lBQTNCO1FBQ3FCLGFBQVEsR0FBRyxDQUFDLFFBQVEsRUFBRSxLQUFLLENBQUMsQ0FBQztJQWtDbEQsQ0FBQztJQWhDRyxJQUFJO1FBQ0EsT0FBTywyQ0FBMkMsQ0FBQztJQUN2RCxDQUFDO0lBRUQsV0FBVztRQUNQLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN6QixDQUFDO0lBRUssVUFBVSxDQUFDLElBQWMsRUFBRSxTQUEwQjs7WUFDdkQsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ25CLElBQUksSUFBSSxHQUFHLFNBQVMsQ0FBQyxNQUFNLENBQUM7WUFFNUIsRUFBRSxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ1osSUFBSSxJQUFJLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxVQUFVLElBQUksQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1lBQ2pELElBQUksS0FBSyxHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUMsVUFBVSxJQUFJLENBQUMsRUFBRSxRQUFRLENBQUMsQ0FBQztZQUVsRCxJQUFJLEtBQUssR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDLFVBQVUsSUFBSSxDQUFDLEVBQUUsYUFBYSxDQUFDLENBQUM7WUFDdkQsSUFBSSxVQUFVLEdBQUcscUJBQWEsQ0FBQyxLQUFLLEVBQUUsbUJBQVEsQ0FBQyxDQUFDO1lBRWhELElBQUksS0FBSyxHQUFHLElBQUksT0FBTyxDQUFDLFlBQVksRUFBRTtpQkFDckIsUUFBUSxDQUFDLE1BQU0sQ0FBQztpQkFDaEIsUUFBUSxDQUFDLEdBQUcsSUFBSSxDQUFDLFFBQVEsV0FBVyxDQUFDO2lCQUNyQyxTQUFTLENBQUMsb0JBQW9CLENBQUM7aUJBQy9CLFFBQVEsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDO2lCQUN4QixRQUFRLENBQUMsU0FBUyxFQUFFLEdBQUcsVUFBVSxJQUFJLEtBQUssRUFBRSxDQUFDO2lCQUM3QyxRQUFRLENBQUMsU0FBUyxFQUFFLHFCQUFhLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUMzRCxTQUFTLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQztpQkFDckIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFO2dCQUNQLEdBQXVCLENBQUMsTUFBTSxDQUFDLEVBQUMsT0FBTyxFQUFFLEtBQUssRUFBQyxDQUFDLENBQUM7WUFDdEQsQ0FBQyxDQUFDO2lCQUNELEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDMUIsQ0FBQztLQUFBO0NBQ0o7QUFuQ0QseUJBbUNDIn0=
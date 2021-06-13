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
const node_json_db_1 = require("node-json-db");
const specialItemData_1 = require("../data/specialItemData");
const db = new node_json_db_1.JsonDB("userData", true, true);
class use {
    constructor() {
        this._command = ["use"];
    }
    help() {
        return "This command is to use things";
    }
    thisCommand() {
        return this._command;
    }
    runCommand(args, msgObject) {
        return __awaiter(this, void 0, void 0, function* () {
            msgObject.delete();
            db.reload();
            let path = `/users/${msgObject.author.id}`;
            if (args.length < 1) {
                msgObject.reply("You have to specify what item to use")
                    .then(msg => {
                    msg.delete({ timeout: 60000 });
                });
                return;
            }
            let item = args.join(" ");
            let specialItem = null;
            for (let i = 0; i < specialItemData_1.specialItems.length; i++) {
                if (specialItemData_1.specialItems[i].name.toLowerCase() == item.toLowerCase()) {
                    specialItem = specialItemData_1.specialItems[i];
                }
            }
            if (specialItem == null) {
                msgObject.reply("You this item can't be used")
                    .then(msg => {
                    msg.delete({ timeout: 60000 });
                });
                return;
            }
            let userItems = db.getData(path + "/items");
            let hasItem = false;
            for (let i = 0; i < Object.keys(userItems).length; i++) {
                if (Object.keys(userItems)[i].toLowerCase() == specialItem.name.toLowerCase()) {
                    hasItem = true;
                }
            }
            if (!hasItem) {
                msgObject.reply("You don't have this item")
                    .then(msg => {
                    msg.delete({ timeout: 60000 });
                });
                return;
            }
            let used = specialItem.function(msgObject, db.exists(`${path}/fight`), args, db);
            if (used) {
                db.push(`/users/${msgObject.author.id}/cooldown`, 5);
            }
        });
    }
}
exports.default = use;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbW1hbmRzL3VzZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUNBLCtDQUFzQztBQUV0Qyw2REFBdUQ7QUFDdkQsTUFBTSxFQUFFLEdBQUcsSUFBSSxxQkFBTSxDQUFDLFVBQVUsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFFOUMsTUFBcUIsR0FBRztJQUF4QjtRQUNxQixhQUFRLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQXlEeEMsQ0FBQztJQXZERyxJQUFJO1FBQ0EsT0FBTywrQkFBK0IsQ0FBQztJQUMzQyxDQUFDO0lBRUQsV0FBVztRQUNQLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN6QixDQUFDO0lBRUssVUFBVSxDQUFDLElBQWMsRUFBRSxTQUEwQjs7WUFDdkQsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ25CLEVBQUUsQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUNaLElBQUksSUFBSSxHQUFHLFVBQVUsU0FBUyxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsQ0FBQztZQUMzQyxJQUFJLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO2dCQUNqQixTQUFTLENBQUMsS0FBSyxDQUFDLHNDQUFzQyxDQUFDO3FCQUNsRCxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUU7b0JBQ1AsR0FBdUIsQ0FBQyxNQUFNLENBQUMsRUFBQyxPQUFPLEVBQUUsS0FBSyxFQUFDLENBQUMsQ0FBQztnQkFDdEQsQ0FBQyxDQUFDLENBQUM7Z0JBQ1AsT0FBTzthQUNWO1lBQ0QsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUMxQixJQUFJLFdBQVcsR0FBRyxJQUFJLENBQUM7WUFFdkIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLDhCQUFZLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUMxQyxJQUFJLDhCQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxJQUFJLElBQUksQ0FBQyxXQUFXLEVBQUUsRUFBRTtvQkFDMUQsV0FBVyxHQUFHLDhCQUFZLENBQUMsQ0FBQyxDQUFDLENBQUM7aUJBQ2pDO2FBQ0o7WUFFRCxJQUFJLFdBQVcsSUFBSSxJQUFJLEVBQUU7Z0JBQ3JCLFNBQVMsQ0FBQyxLQUFLLENBQUMsNkJBQTZCLENBQUM7cUJBQzdDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRTtvQkFDUCxHQUF1QixDQUFDLE1BQU0sQ0FBQyxFQUFDLE9BQU8sRUFBRSxLQUFLLEVBQUMsQ0FBQyxDQUFDO2dCQUN0RCxDQUFDLENBQUMsQ0FBQztnQkFDSCxPQUFPO2FBQ1Y7WUFFRCxJQUFJLFNBQVMsR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDLElBQUksR0FBRyxRQUFRLENBQUMsQ0FBQztZQUM1QyxJQUFJLE9BQU8sR0FBRyxLQUFLLENBQUM7WUFDcEIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUNwRCxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFLElBQUksV0FBVyxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsRUFBRTtvQkFDM0UsT0FBTyxHQUFHLElBQUksQ0FBQztpQkFDbEI7YUFDSjtZQUVELElBQUksQ0FBQyxPQUFPLEVBQUU7Z0JBQ1YsU0FBUyxDQUFDLEtBQUssQ0FBQywwQkFBMEIsQ0FBQztxQkFDMUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFO29CQUNQLEdBQXVCLENBQUMsTUFBTSxDQUFDLEVBQUMsT0FBTyxFQUFFLEtBQUssRUFBQyxDQUFDLENBQUM7Z0JBQ3RELENBQUMsQ0FBQyxDQUFDO2dCQUNILE9BQU87YUFDVjtZQUVELElBQUksSUFBSSxHQUFHLFdBQVcsQ0FBQyxRQUFRLENBQUMsU0FBUyxFQUFFLEVBQUUsQ0FBQyxNQUFNLENBQUMsR0FBRyxJQUFJLFFBQVEsQ0FBQyxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQztZQUNqRixJQUFJLElBQUksRUFBRTtnQkFBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQVUsU0FBUyxDQUFDLE1BQU0sQ0FBQyxFQUFFLFdBQVcsRUFBRSxDQUFDLENBQUMsQ0FBQTthQUFDO1FBQ3BFLENBQUM7S0FBQTtDQUNKO0FBMURELHNCQTBEQyJ9
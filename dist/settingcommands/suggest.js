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
const db = new node_json_db_1.JsonDB("botData", true, true);
class suggest {
    constructor() {
        this._command = ["suggest"];
    }
    help() {
        return "This command is to suggest an idea to the creator";
    }
    thisCommand() {
        return this._command;
    }
    runCommand(args, msgObject) {
        return __awaiter(this, void 0, void 0, function* () {
            msgObject.delete();
            if (args.length < 1) {
                msgObject.reply("You have to write a suggestion")
                    .then(msg => {
                    msg.delete({ timeout: 60000 });
                });
                return;
            }
            let suggestion = args.join(" ");
            db.reload();
            db.push(`/suggestions/${msgObject.author.id}`, `${msgObject.author.username}: ${suggestion}`);
            msgObject.reply("Thanks for submitting a suggestion, the creator will read them soon")
                .then(msg => {
                msg.delete({ timeout: 60000 });
            });
        });
    }
}
exports.default = suggest;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3VnZ2VzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zZXR0aW5nY29tbWFuZHMvc3VnZ2VzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUVBLCtDQUFzQztBQUN0QyxNQUFNLEVBQUUsR0FBRyxJQUFJLHFCQUFNLENBQUMsU0FBUyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztBQUU3QyxNQUFxQixPQUFPO0lBQTVCO1FBQ3FCLGFBQVEsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBNEI1QyxDQUFDO0lBMUJHLElBQUk7UUFDQSxPQUFPLG1EQUFtRCxDQUFDO0lBQy9ELENBQUM7SUFFRCxXQUFXO1FBQ1AsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3pCLENBQUM7SUFFSyxVQUFVLENBQUMsSUFBYyxFQUFFLFNBQTBCOztZQUN2RCxTQUFTLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDbkIsSUFBSSxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtnQkFDakIsU0FBUyxDQUFDLEtBQUssQ0FBQyxnQ0FBZ0MsQ0FBQztxQkFDaEQsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFO29CQUNQLEdBQXVCLENBQUMsTUFBTSxDQUFDLEVBQUMsT0FBTyxFQUFFLEtBQUssRUFBQyxDQUFDLENBQUM7Z0JBQ3RELENBQUMsQ0FBQyxDQUFDO2dCQUNILE9BQU87YUFDVjtZQUNELElBQUksVUFBVSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDaEMsRUFBRSxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBRVosRUFBRSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsU0FBUyxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsRUFBRSxHQUFHLFNBQVMsQ0FBQyxNQUFNLENBQUMsUUFBUSxLQUFLLFVBQVUsRUFBRSxDQUFDLENBQUM7WUFDOUYsU0FBUyxDQUFDLEtBQUssQ0FBQyxxRUFBcUUsQ0FBQztpQkFDakYsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFO2dCQUNQLEdBQXVCLENBQUMsTUFBTSxDQUFDLEVBQUMsT0FBTyxFQUFFLEtBQUssRUFBQyxDQUFDLENBQUM7WUFDdEQsQ0FBQyxDQUFDLENBQUM7UUFDWCxDQUFDO0tBQUE7Q0FDSjtBQTdCRCwwQkE2QkMifQ==
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
const ConfigFile = require("../config");
const node_json_db_1 = require("node-json-db");
const db = new node_json_db_1.JsonDB("botData", true, true);
class prefix {
    constructor() {
        this._command = ["prefix", "setprefix"];
    }
    help() {
        return "This command is to set a different prefix on your server";
    }
    thisCommand() {
        return this._command;
    }
    runCommand(args, msgObject) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            msgObject.delete();
            if (!((_a = msgObject.member) === null || _a === void 0 ? void 0 : _a.hasPermission("MANAGE_CHANNELS"))) {
                msgObject.reply("Nice try, you don't have permission to try and change my prefix")
                    .then(msg => {
                    msg.delete({ timeout: 60000 });
                });
                return;
            }
            if (args.length < 0) {
                msgObject.reply("You need to type a prefix")
                    .then(msg => {
                    msg.delete({ timeout: 60000 });
                });
                return;
            }
            let prefix = args.join("");
            if (prefix == "") {
                msgObject.reply("You need to type a prefix")
                    .then(msg => {
                    msg.delete({ timeout: 60000 });
                });
                return;
            }
            if (prefix === ConfigFile.config.prefix) {
                db.delete(`/prefixes/${(_b = msgObject.guild) === null || _b === void 0 ? void 0 : _b.id}`);
            }
            else {
                db.push(`/prefixes/${(_c = msgObject.guild) === null || _c === void 0 ? void 0 : _c.id}`, prefix);
            }
            msgObject.reply(`Prefix set as ${prefix}`)
                .then(msg => {
                msg.delete({ timeout: 60000 });
            });
        });
    }
}
exports.default = prefix;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlZml4LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3NldHRpbmdjb21tYW5kcy9wcmVmaXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFFQSx3Q0FBd0M7QUFDeEMsK0NBQXNDO0FBQ3RDLE1BQU0sRUFBRSxHQUFHLElBQUkscUJBQU0sQ0FBQyxTQUFTLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0FBRTdDLE1BQXFCLE1BQU07SUFBM0I7UUFDcUIsYUFBUSxHQUFHLENBQUMsUUFBUSxFQUFFLFdBQVcsQ0FBQyxDQUFDO0lBNkN4RCxDQUFDO0lBM0NHLElBQUk7UUFDQSxPQUFPLDBEQUEwRCxDQUFDO0lBQ3RFLENBQUM7SUFFRCxXQUFXO1FBQ1AsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3pCLENBQUM7SUFFSyxVQUFVLENBQUMsSUFBYyxFQUFFLFNBQTBCOzs7WUFDdkQsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ25CLElBQUksQ0FBQyxDQUFBLE1BQUEsU0FBUyxDQUFDLE1BQU0sMENBQUUsYUFBYSxDQUFDLGlCQUFpQixDQUFDLENBQUEsRUFBRTtnQkFDckQsU0FBUyxDQUFDLEtBQUssQ0FBQyxpRUFBaUUsQ0FBQztxQkFDakYsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFO29CQUNQLEdBQXVCLENBQUMsTUFBTSxDQUFDLEVBQUMsT0FBTyxFQUFFLEtBQUssRUFBQyxDQUFDLENBQUM7Z0JBQ3RELENBQUMsQ0FBQyxDQUFDO2dCQUNILE9BQU87YUFDVjtZQUNELElBQUksSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7Z0JBQ2pCLFNBQVMsQ0FBQyxLQUFLLENBQUMsMkJBQTJCLENBQUM7cUJBQzNDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRTtvQkFDUCxHQUF1QixDQUFDLE1BQU0sQ0FBQyxFQUFDLE9BQU8sRUFBRSxLQUFLLEVBQUMsQ0FBQyxDQUFDO2dCQUN0RCxDQUFDLENBQUMsQ0FBQztnQkFDSCxPQUFPO2FBQ1Y7WUFDRCxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBRTNCLElBQUksTUFBTSxJQUFJLEVBQUUsRUFBRTtnQkFDZCxTQUFTLENBQUMsS0FBSyxDQUFDLDJCQUEyQixDQUFDO3FCQUMzQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUU7b0JBQ1AsR0FBdUIsQ0FBQyxNQUFNLENBQUMsRUFBQyxPQUFPLEVBQUUsS0FBSyxFQUFDLENBQUMsQ0FBQztnQkFDdEQsQ0FBQyxDQUFDLENBQUM7Z0JBQ0gsT0FBTzthQUNWO1lBQ0QsSUFBSSxNQUFNLEtBQUssVUFBVSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUU7Z0JBQ3JDLEVBQUUsQ0FBQyxNQUFNLENBQUMsYUFBYSxNQUFBLFNBQVMsQ0FBQyxLQUFLLDBDQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7YUFDakQ7aUJBQU07Z0JBQ0gsRUFBRSxDQUFDLElBQUksQ0FBQyxhQUFhLE1BQUEsU0FBUyxDQUFDLEtBQUssMENBQUUsRUFBRSxFQUFFLEVBQUUsTUFBTSxDQUFDLENBQUM7YUFDdkQ7WUFDRCxTQUFTLENBQUMsS0FBSyxDQUFDLGlCQUFpQixNQUFNLEVBQUUsQ0FBQztpQkFDekMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFO2dCQUNQLEdBQXVCLENBQUMsTUFBTSxDQUFDLEVBQUMsT0FBTyxFQUFFLEtBQUssRUFBQyxDQUFDLENBQUM7WUFDdEQsQ0FBQyxDQUFDLENBQUM7O0tBQ047Q0FDSjtBQTlDRCx5QkE4Q0MifQ==
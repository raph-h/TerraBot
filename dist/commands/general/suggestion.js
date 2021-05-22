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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_json_db_1 = __importDefault(require("node-json-db"));
var data = new node_json_db_1.default("Data", true, true);
class suggestion {
    constructor() {
        this._command = "suggestion";
    }
    help() {
        return "This command gives RaphGamingz a suggestion for the bot";
    }
    isThisCommand(command) {
        return command === this._command;
    }
    runCommand(args, msgObject, client) {
        return __awaiter(this, void 0, void 0, function* () {
            msgObject.delete();
            let suggestion = args.join(" ");
            data.push("/suggestion[]", {
                "tagname": msgObject.author.tag,
                "id": msgObject.author.id,
                "suggestion": suggestion
            });
        });
    }
}
exports.default = suggestion;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3VnZ2VzdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21tYW5kcy9nZW5lcmFsL3N1Z2dlc3Rpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFFQSxnRUFBa0M7QUFFbEMsSUFBSSxJQUFJLEdBQUcsSUFBSSxzQkFBTSxDQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFFMUMsTUFBcUIsVUFBVTtJQUEvQjtRQUVxQixhQUFRLEdBQUcsWUFBWSxDQUFBO0lBbUI1QyxDQUFDO0lBakJHLElBQUk7UUFDQSxPQUFPLHlEQUF5RCxDQUFDO0lBQ3JFLENBQUM7SUFFRCxhQUFhLENBQUMsT0FBZTtRQUN6QixPQUFPLE9BQU8sS0FBSyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3JDLENBQUM7SUFFSyxVQUFVLENBQUMsSUFBYyxFQUFFLFNBQTBCLEVBQUUsTUFBc0I7O1lBQy9FLFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUNuQixJQUFJLFVBQVUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ2hDLElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFO2dCQUN2QixTQUFTLEVBQUUsU0FBUyxDQUFDLE1BQU0sQ0FBQyxHQUFHO2dCQUMvQixJQUFJLEVBQUUsU0FBUyxDQUFDLE1BQU0sQ0FBQyxFQUFFO2dCQUN6QixZQUFZLEVBQUUsVUFBVTthQUMzQixDQUFDLENBQUM7UUFDUCxDQUFDO0tBQUE7Q0FDSjtBQXJCRCw2QkFxQkMifQ==
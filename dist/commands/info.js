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
const db = new node_json_db_1.JsonDB("userData", true, true);
class info {
    constructor() {
        this._command = ["info", "profile"];
    }
    help() {
        return "This command shows your or someones information";
    }
    thisCommand() {
        return this._command;
    }
    runCommand(args, msgObject) {
        return __awaiter(this, void 0, void 0, function* () {
            msgObject.delete();
            let user;
            if (args.length > 0) {
                if (msgObject.mentions.users.size > 0) {
                    user = (msgObject.mentions.users.first());
                }
                else {
                    user = msgObject.author;
                }
            }
            else {
                user = msgObject.author;
            }
            db.reload();
            let path = `/users/${user.id}`;
            let stocks = 0;
            if (db.exists(path + "/stocks")) {
                stocks = db.getData(path + "/stocks");
            }
            let embed = new Discord.MessageEmbed()
                .setColor("GREY")
                .setTitle(`${user.username}'s Information`)
                .setFooter("FBI 1000")
                .addField("Stocks: ", `${stocks}`)
                .addField("Health: ", `${db.getData(path + "/health")}/${db.getData(path + "/maxHealth")}`)
                .addField("Location: ", db.getData(path + "/location"))
                .addField("Equipped Items: ", utils_1.itemsToString(db.getData(path + "/equipped")));
            msgObject.reply(embed)
                .then(msg => {
                msg.delete({ timeout: 120000 });
            })
                .catch(console.error);
        });
    }
}
exports.default = info;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5mby5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tYW5kcy9pbmZvLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsc0NBQXNDO0FBRXRDLCtDQUFzQztBQUN0QyxvQ0FBeUM7QUFDekMsTUFBTSxFQUFFLEdBQUcsSUFBSSxxQkFBTSxDQUFDLFVBQVUsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFHOUMsTUFBcUIsSUFBSTtJQUF6QjtRQUNxQixhQUFRLEdBQUcsQ0FBQyxNQUFNLEVBQUUsU0FBUyxDQUFDLENBQUM7SUE0Q3BELENBQUM7SUExQ0csSUFBSTtRQUNBLE9BQU8saURBQWlELENBQUM7SUFDN0QsQ0FBQztJQUVELFdBQVc7UUFDUCxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDekIsQ0FBQztJQUVLLFVBQVUsQ0FBQyxJQUFjLEVBQUUsU0FBMEI7O1lBQ3ZELFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUNuQixJQUFJLElBQWtCLENBQUM7WUFDdkIsSUFBSSxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtnQkFDakIsSUFBSSxTQUFTLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxJQUFJLEdBQUcsQ0FBQyxFQUFFO29CQUNuQyxJQUFJLEdBQUcsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBaUIsQ0FBQztpQkFDN0Q7cUJBQU07b0JBQ0gsSUFBSSxHQUFHLFNBQVMsQ0FBQyxNQUFNLENBQUM7aUJBQzNCO2FBQ0o7aUJBQU07Z0JBQ0gsSUFBSSxHQUFHLFNBQVMsQ0FBQyxNQUFNLENBQUM7YUFDM0I7WUFFRCxFQUFFLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDWixJQUFJLElBQUksR0FBRyxVQUFVLElBQUksQ0FBQyxFQUFFLEVBQUUsQ0FBQztZQUUvQixJQUFJLE1BQU0sR0FBRyxDQUFDLENBQUM7WUFDZixJQUFJLEVBQUUsQ0FBQyxNQUFNLENBQUMsSUFBSSxHQUFHLFNBQVMsQ0FBQyxFQUFFO2dCQUM3QixNQUFNLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEdBQUcsU0FBUyxDQUFDLENBQUM7YUFDekM7WUFDRCxJQUFJLEtBQUssR0FBRyxJQUFJLE9BQU8sQ0FBQyxZQUFZLEVBQUU7aUJBQ3JCLFFBQVEsQ0FBQyxNQUFNLENBQUM7aUJBQ2hCLFFBQVEsQ0FBQyxHQUFHLElBQUksQ0FBQyxRQUFRLGdCQUFnQixDQUFDO2lCQUMxQyxTQUFTLENBQUMsVUFBVSxDQUFDO2lCQUNyQixRQUFRLENBQUMsVUFBVSxFQUFFLEdBQUcsTUFBTSxFQUFFLENBQUM7aUJBQ2pDLFFBQVEsQ0FBQyxVQUFVLEVBQUUsR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDLElBQUksR0FBRyxTQUFTLENBQUMsSUFBSSxFQUFFLENBQUMsT0FBTyxDQUFDLElBQUksR0FBRyxZQUFZLENBQUMsRUFBRSxDQUFDO2lCQUMxRixRQUFRLENBQUMsWUFBWSxFQUFFLEVBQUUsQ0FBQyxPQUFPLENBQUMsSUFBSSxHQUFHLFdBQVcsQ0FBQyxDQUFDO2lCQUN0RCxRQUFRLENBQUMsa0JBQWtCLEVBQUUscUJBQWEsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLElBQUksR0FBRyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDN0YsU0FBUyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUM7aUJBQ3JCLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRTtnQkFDUCxHQUF1QixDQUFDLE1BQU0sQ0FBQyxFQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUMsQ0FBQyxDQUFDO1lBQ3ZELENBQUMsQ0FBQztpQkFDRCxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzFCLENBQUM7S0FBQTtDQUNKO0FBN0NELHVCQTZDQyJ9
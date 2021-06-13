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
const db = new node_json_db_1.JsonDB("userData", true, true);
class fight {
    constructor() {
        this._command = ["fight", "duel"];
    }
    help() {
        return "This command is to fight other users";
    }
    thisCommand() {
        return this._command;
    }
    runCommand(args, msgObject, client) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            msgObject.delete();
            let user;
            if (args.length > 0) {
                if (msgObject.mentions.users.size > 0) {
                    user = (msgObject.mentions.users.first());
                }
                else {
                    msgObject.reply("You need to specify someone to fight")
                        .then(msg => {
                        msg.delete({ timeout: 60000 });
                    });
                    return;
                }
            }
            else {
                msgObject.reply("You need to specify someone to fight")
                    .then(msg => {
                    msg.delete({ timeout: 60000 });
                });
                return;
            }
            if (user == msgObject.author) {
                msgObject.reply("You can't fight yourself")
                    .then(msg => {
                    msg.delete({ timeout: 60000 });
                });
                return;
            }
            if (user.bot) {
                msgObject.reply("You can't fight a bot, they're too strong")
                    .then(msg => {
                    msg.delete({ timeout: 60000 });
                });
                return;
            }
            if (db.exists(`/users/${msgObject.author.id}/fight`)) {
                msgObject.reply("You are already in a fight")
                    .then(msg => {
                    msg.delete({ timeout: 60000 });
                });
                return;
            }
            if (db.exists(`/users/${user.id}/fight`)) {
                msgObject.reply(user.username + " are already in a fight")
                    .then(msg => {
                    msg.delete({ timeout: 60000 });
                });
                return;
            }
            let msg = yield msgObject.channel.send("Please react to this message to accept the fight " + user.toString());
            yield msg.react("✅");
            yield msg.react("❎");
            const filter = (reaction, useri) => (reaction.emoji.name === "✅" || reaction.emoji.name === "❎") && useri.id === user.id;
            const results = yield msg.awaitReactions(filter, { time: 10000 });
            if (((_a = results.get("✅")) === null || _a === void 0 ? void 0 : _a.count) - 1 > 0) {
                db.push(`/users/${msgObject.author.id}/fight`, user.id);
                db.push(`/users/${user.id}/fight`, msgObject.author.id);
                msgObject.reply("Fight has started").then(msg => {
                    msg.delete({ timeout: 60000 });
                });
                msg.delete();
            }
            else {
                msgObject.reply("Fight has been cancelled").then(msg => {
                    msg.delete({ timeout: 60000 });
                });
                msg.delete();
            }
        });
    }
}
exports.default = fight;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlnaHQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29tbWFuZHMvZmlnaHQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFFQSwrQ0FBc0M7QUFDdEMsTUFBTSxFQUFFLEdBQUcsSUFBSSxxQkFBTSxDQUFDLFVBQVUsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFFOUMsTUFBcUIsS0FBSztJQUExQjtRQUNxQixhQUFRLEdBQUcsQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFtRmxELENBQUM7SUFoRkcsSUFBSTtRQUNBLE9BQU8sc0NBQXNDLENBQUM7SUFDbEQsQ0FBQztJQUVELFdBQVc7UUFDUCxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDekIsQ0FBQztJQUVLLFVBQVUsQ0FBQyxJQUFjLEVBQUUsU0FBMEIsRUFBRSxNQUFzQjs7O1lBQy9FLFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUNuQixJQUFJLElBQWtCLENBQUM7WUFDdkIsSUFBSSxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtnQkFDakIsSUFBSSxTQUFTLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxJQUFJLEdBQUcsQ0FBQyxFQUFFO29CQUNuQyxJQUFJLEdBQUcsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBaUIsQ0FBQztpQkFDN0Q7cUJBQU07b0JBQ0gsU0FBUyxDQUFDLEtBQUssQ0FBQyxzQ0FBc0MsQ0FBQzt5QkFDdEQsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFO3dCQUNQLEdBQXVCLENBQUMsTUFBTSxDQUFDLEVBQUMsT0FBTyxFQUFFLEtBQUssRUFBQyxDQUFDLENBQUM7b0JBQ3RELENBQUMsQ0FBQyxDQUFDO29CQUNILE9BQU87aUJBQ1Y7YUFDSjtpQkFBTTtnQkFDSCxTQUFTLENBQUMsS0FBSyxDQUFDLHNDQUFzQyxDQUFDO3FCQUNsRCxJQUFJ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
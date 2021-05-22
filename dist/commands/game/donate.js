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
var db = new node_json_db_1.default("DataBase", true, true);
class donate {
    constructor() {
        this._command = "donate";
    }
    help() {
        return "Attempts to donate money";
    }
    isThisCommand(command) {
        return command === this._command;
    }
    runCommand(args, msgObject, client) {
        return __awaiter(this, void 0, void 0, function* () {
            msgObject.delete();
            if (args.length < 1) {
                msgObject.channel.send(`${msgObject.author.username} you need to specify how much you want to donate and mention the person`)
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
            let mentionedUser = null;
            if (msgObject.mentions.users.size > 0) {
                mentionedUser = msgObject.mentions.users.first();
            }
            else {
                msgObject.channel.send(`${msgObject.author.username} you need to mention a person`)
                    .then(msg => {
                    msg.delete(10000);
                });
                return;
            }
            let amount = 0;
            amount = parseInt(args[0]);
            if (isNaN(amount)) {
                msgObject.channel.send("Not a number")
                    .then(msg => {
                    msg.delete(10000);
                });
                return;
            }
            if (amount < 0) {
                msgObject.channel.send("Not a number")
                    .then(msg => {
                    msg.delete(10000);
                });
                return;
            }
            let money = db.getData(`/${msgObject.author.id}/money`);
            if (money - amount < 0) {
                msgObject.channel.send("Not enough money")
                    .then(msg => {
                    msg.delete(10000);
                });
                return;
            }
            db.push(`/${msgObject.author.id}/money`, money - amount);
            let mentionedMoney = db.getData(`/${mentionedUser.id}/money`);
            db.push(`/${mentionedUser.id}/money`, mentionedMoney + amount);
            let Embed = new Discord.RichEmbed()
                .setTitle(`${msgObject.author.username}'s Money`)
                .setDescription(money - amount)
                .setColor([200, 0, 0]);
            let MentionedEmbed = new Discord.RichEmbed()
                .setTitle(`${mentionedUser.username}'s Money`)
                .setDescription(mentionedMoney + amount)
                .setColor([200, 0, 0]);
            msgObject.channel.send(Embed)
                .then(msg => {
                msg.delete(10000);
            });
            msgObject.channel.send(MentionedEmbed)
                .then(msg => {
                msg.delete(10000);
            });
            return;
        });
    }
}
exports.default = donate;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9uYXRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvbW1hbmRzL2dhbWUvZG9uYXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG9EQUFzQztBQUV0QyxnRUFBa0M7QUFFbEMsSUFBSSxFQUFFLEdBQUcsSUFBSSxzQkFBTSxDQUFDLFVBQVUsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFFNUMsTUFBcUIsTUFBTTtJQUEzQjtRQUVxQixhQUFRLEdBQUcsUUFBUSxDQUFBO0lBeUZ4QyxDQUFDO0lBdkZHLElBQUk7UUFDQSxPQUFPLDBCQUEwQixDQUFDO0lBQ3RDLENBQUM7SUFFRCxhQUFhLENBQUMsT0FBZTtRQUN6QixPQUFPLE9BQU8sS0FBSyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3JDLENBQUM7SUFFSyxVQUFVLENBQUMsSUFBYyxFQUFFLFNBQTBCLEVBQUUsTUFBc0I7O1lBQy9FLFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUVuQixJQUFJLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO2dCQUNqQixTQUFTLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLFNBQVMsQ0FBQyxNQUFNLENBQUMsUUFBUSx5RUFBeUUsQ0FBQztxQkFDeEgsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFO29CQUNQLEdBQXVCLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUMzQyxDQUFDLENBQUMsQ0FBQztnQkFDUCxPQUFPO2FBQ1Y7WUFFRCxJQUFJO2dCQUNBLEVBQUUsQ0FBQyxPQUFPLENBQUMsSUFBSSxTQUFTLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7YUFDekM7WUFBQyxPQUFNLEtBQUssRUFBRTtnQkFDWCxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksU0FBUyxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFDLEtBQUssRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFDLENBQUMsQ0FBQzthQUMzRTtZQUFBLENBQUM7WUFFRixJQUFJLGFBQWEsR0FBaUIsSUFBSSxDQUFDO1lBRXZDLElBQUksU0FBUyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFHLENBQUMsRUFBRTtnQkFDbkMsYUFBYSxHQUFHLFNBQVMsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDO2FBQ3BEO2lCQUFNO2dCQUNILFNBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsU0FBUyxDQUFDLE1BQU0sQ0FBQyxRQUFRLCtCQUErQixDQUFDO3FCQUM5RSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUU7b0JBQ1AsR0FBdUIsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQzNDLENBQUMsQ0FBQyxDQUFDO2dCQUNQLE9BQU87YUFDVjtZQUVELElBQUksTUFBTSxHQUFHLENBQUMsQ0FBQztZQUNmLE1BQU0sR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDM0IsSUFBSSxLQUFLLENBQUMsTUFBTSxDQUFDLEVBQUU7Z0JBQ2YsU0FBUyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDO3FCQUNqQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUU7b0JBQ1AsR0FBdUIsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQzNDLENBQUMsQ0FBQyxDQUFDO2dCQUNQLE9BQU87YUFDVjtZQUNELElBQUksTUFBTSxHQUFHLENBQUMsRUFBRTtnQkFDWixTQUFTLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUM7cUJBQ2pDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRTtvQkFDUCxHQUF1QixDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDM0MsQ0FBQyxDQUFDLENBQUM7Z0JBQ1AsT0FBTzthQUNWO1lBRUQsSUFBSSxLQUFLLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxJQUFJLFNBQVMsQ0FBQyxNQUFNLENBQUMsRUFBRSxRQUFRLENBQUMsQ0FBQztZQUN4RCxJQUFJLEtBQUssR0FBRyxNQUFNLEdBQUcsQ0FBQyxFQUFFO2dCQUNwQixTQUFTLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQztxQkFDakMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFO29CQUNQLEdBQXVCLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUMzQyxDQUFDLENBQUMsQ0FBQztnQkFDWCxPQUFPO2FBQ1Y7WUFDRCxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksU0FBUyxDQUFDLE1BQU0sQ0FBQyxFQUFFLFFBQVEsRUFBRSxLQUFLLEdBQUcsTUFBTSxDQUFDLENBQUM7WUFDekQsSUFBSSxjQUFjLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxJQUFJLGFBQWEsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1lBQzlELEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxhQUFhLENBQUMsRUFBRSxRQUFRLEVBQUUsY0FBYyxHQUFHLE1BQU0sQ0FBQyxDQUFDO1lBRy9ELElBQUksS0FBSyxHQUFHLElBQUksT0FBTyxDQUFDLFNBQVMsRUFBRTtpQkFDOUIsUUFBUSxDQUFDLEdBQUcsU0FBUyxDQUFDLE1BQU0sQ0FBQyxRQUFRLFVBQVUsQ0FBQztpQkFDaEQsY0FBYyxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUM7aUJBQzlCLFFBQVEsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQTtZQUUxQixJQUFJLGNBQWMsR0FBRyxJQUFJLE9BQU8sQ0FBQyxTQUFTLEVBQUU7aUJBQ3ZDLFFBQVEsQ0FBQyxHQUFHLGFBQWEsQ0FBQyxRQUFRLFVBQVUsQ0FBQztpQkFDN0MsY0FBYyxDQUFDLGNBQWMsR0FBRyxNQUFNLENBQUM7aUJBQ3ZDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQTtZQUUxQixTQUFTLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7aUJBQ3BCLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRTtnQkFDUCxHQUF1QixDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUMzQyxDQUFDLENBQUMsQ0FBQztZQUNYLFNBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQztpQkFDN0IsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFO2dCQUNQLEdBQXVCLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzNDLENBQUMsQ0FBQyxDQUFDO1lBQ1AsT0FBTztRQUNmLENBQUM7S0FBQTtDQUNKO0FBM0ZELHlCQTJGQyJ9
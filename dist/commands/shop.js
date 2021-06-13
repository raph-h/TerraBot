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
const db = new node_json_db_1.JsonDB("userData", true, true);
class test {
    constructor() {
        this._command = ["shop"];
    }
    help() {
        return "Shows items you can buy in the current location";
    }
    thisCommand() {
        return this._command;
    }
    runCommand(args, msgObject) {
        return __awaiter(this, void 0, void 0, function* () {
            msgObject.delete();
            db.reload();
            let location = db.getData(`/users/${msgObject.author.id}/location`);
            let shop = null;
            for (let i = 0; i < locationData_1.locationData.locations.length; i++) {
                if (location.toLowerCase() == locationData_1.locationData.locations[i].toLowerCase()) {
                    shop = itemData_1.itemData[i];
                }
            }
            if (shop == null) {
                msgObject.reply("You can't buy anything here")
                    .then(msg => {
                    msg.delete({ timeout: 60000 });
                });
                return;
            }
            let embed = new Discord.MessageEmbed()
                .setColor("GREY")
                .setTitle(`Items you can buy at ${location.toLowerCase()}`)
                .setFooter("So expensive am I right?");
            for (let element of shop) {
                element = element;
                let buyText = element.buy + "";
                let sellText = element.sell + "";
                if (element.buy < 0) {
                    buyText = "You can't buy this item";
                }
                if (element.buy < 0) {
                    sellText = "You can't sell this item";
                }
                embed.addField(element.name, `${element.description}\nPrice: ${buyText}\nSell Price: ${sellText}\nStorage: ${element.weight}`);
            }
            msgObject.reply(embed)
                .then(msg => {
                msg.delete({ timeout: 60000 });
            })
                .catch(console.error);
        });
    }
}
exports.default = test;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hvcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tYW5kcy9zaG9wLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsc0NBQXNDO0FBRXRDLCtDQUFzQztBQUN0Qyx1REFBb0Q7QUFDcEQsK0NBQTRDO0FBRzVDLE1BQU0sRUFBRSxHQUFHLElBQUkscUJBQU0sQ0FBQyxVQUFVLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0FBRTlDLE1BQXFCLElBQUk7SUFBekI7UUFDcUIsYUFBUSxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7SUF1RHpDLENBQUM7SUFyREcsSUFBSTtRQUNBLE9BQU8saURBQWlELENBQUM7SUFDN0QsQ0FBQztJQUVELFdBQVc7UUFDUCxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDekIsQ0FBQztJQUVLLFVBQVUsQ0FBQyxJQUFjLEVBQUUsU0FBMEI7O1lBQ3ZELFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUNuQixFQUFFLENBQUMsTUFBTSxFQUFFLENBQUM7WUFFWixJQUFJLFFBQVEsR0FBVyxFQUFFLENBQUMsT0FBTyxDQUFDLFVBQVUsU0FBUyxDQUFDLE1BQU0sQ0FBQyxFQUFFLFdBQVcsQ0FBQyxDQUFDO1lBQzVFLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztZQUVoQixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsMkJBQVksQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUNwRCxJQUFJLFFBQVEsQ0FBQyxXQUFXLEVBQUUsSUFBSSwyQkFBWSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUUsRUFBRTtvQkFDbkUsSUFBSSxHQUFHLG1CQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7aUJBQ3RCO2FBQ0o7WUFFRCxJQUFJLElBQUksSUFBSSxJQUFJLEVBQUU7Z0JBQ2QsU0FBUyxDQUFDLEtBQUssQ0FBQyw2QkFBNkIsQ0FBQztxQkFDN0MsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFO29CQUNQLEdBQXVCLENBQUMsTUFBTSxDQUFDLEVBQUMsT0FBTyxFQUFFLEtBQUssRUFBQyxDQUFDLENBQUM7Z0JBQ3RELENBQUMsQ0FBQyxDQUFDO2dCQUNILE9BQU87YUFDVjtZQUVELElBQUksS0FBSyxHQUFHLElBQUksT0FBTyxDQUFDLFlBQVksRUFBRTtpQkFDckIsUUFBUSxDQUFDLE1BQU0sQ0FBQztpQkFDaEIsUUFBUSxDQUFDLHdCQUF3QixRQUFRLENBQUMsV0FBVyxFQUFFLEVBQUUsQ0FBQztpQkFDMUQsU0FBUyxDQUFDLDBCQUEwQixDQUFDLENBQUM7WUFFdkQsS0FBSyxJQUFJLE9BQU8sSUFBSSxJQUFJLEVBQUU7Z0JBQ3RCLE9BQU8sR0FBRyxPQUFvQixDQUFDO2dCQUMvQixJQUFJLE9BQU8sR0FBRyxPQUFPLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQztnQkFDL0IsSUFBSSxRQUFRLEdBQUcsT0FBTyxDQUFDLElBQUksR0FBRyxFQUFFLENBQUM7Z0JBQ2pDLElBQUksT0FBTyxDQUFDLEdBQUcsR0FBRyxDQUFDLEVBQUU7b0JBQ2pCLE9BQU8sR0FBRyx5QkFBeUIsQ0FBQztpQkFDdkM7Z0JBQ0QsSUFBSSxPQUFPLENBQUMsR0FBRyxHQUFHLENBQUMsRUFBRTtvQkFDakIsUUFBUSxHQUFHLDBCQUEwQixDQUFDO2lCQUN6QztnQkFDRCxLQUFLLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsR0FBRyxPQUFPLENBQUMsV0FBVyxZQUFZLE9BQU8saUJBQWlCLFFBQVEsY0FBYyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQzthQUNsSTtZQUVELFNBQVMsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDO2lCQUNyQixJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUU7Z0JBQ1AsR0FBdUIsQ0FBQyxNQUFNLENBQUMsRUFBQyxPQUFPLEVBQUUsS0FBSyxFQUFDLENBQUMsQ0FBQztZQUN0RCxDQUFDLENBQUM7aUJBQ0QsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMxQixDQUFDO0tBQUE7Q0FDSjtBQXhERCx1QkF3REMifQ==
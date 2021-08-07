import { JsonDB } from "node-json-db";
import { locations } from "./data/locationData";
import { itemModel } from "./models/itemModel";

export function convertToString(dic: any): string {
    let itemString = "";
    for (let i = 0; i < Object.keys(dic).length; i++) {
        itemString += dic[Object.keys(dic)[i]] + " - ";
        itemString += Object.keys(dic)[i] + "\n";
    }
    return itemString;
}

export function itemsToString(items: any): string {
    let s = convertToString(items);
    if (s == "") {
        s = "Nothing";
    }
    return s;
}

export function addItem(path: string, db: JsonDB, numberOfItems: number) {
    if (db.exists(path)) {
        db.push(path, db.getData(path) + numberOfItems, true);
    } else {
        db.push(path, numberOfItems, false);
    }
}

export function removeItem(path: string, db: JsonDB, numberOfItems: number) {
    let amount = db.getData(path) - numberOfItems;
    if (amount <= 0) {
        db.delete(path);
    } else {
        db.push(path, amount, true);
    }
}

export function searchItem(item: string, data: any[]): itemModel {
    let it = data[0];
    data.forEach(element => {
        if (element.name.toLowerCase() == item.toLowerCase()) {
            it = element;
        }
    });
    return it;
}

export function itemsToWeight(items: any, data: {[location: string]: itemModel[]}): number {
    let weight = 0;
    for (let i = 0; i < Object.keys(items).length; i++) {
        let item = null;
        for (let u = 0; u < locations.length; u++) {
            if (item == null) {
                item = searchItem(Object.keys(items)[i], data[locations[u]]);
            }
        }
        if (item != null) {
            weight += (item as itemModel).weight * items[Object.keys(items)[i]];
        }
    }
    return weight;
}

export function hurt(damage: number, db: JsonDB, userPath: string) {
    db.reload();
    if (db.getData(userPath + "/health") - damage > db.getData(userPath + "/maxHealth")) {
        db.push(userPath + "/health", db.getData(userPath + "/maxHealth"))
    } else {
        db.push(userPath + "/health", db.getData(userPath + "/health") - damage);
    }    
}
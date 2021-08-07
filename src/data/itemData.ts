import { itemModel } from "../models/itemModel";

export let itemData: {[location: string]: itemModel[]} = {
    "Camp": [
        {
            "name": "Wood Log",
            "description": "Cellulose from a tree",
            "buy": -1,
            "sell": 2,
            "chance": 30,
            "weight": 2,
            "special": false
        },
        {
            "name": "Rock",
            "description": "Mostly made from oxygen and silicon",
            "buy": -1,
            "sell": 5,
            "chance": 25,
            "weight": 5,
            "special": false
        },
        {
            "name": "Metal Ore",
            "description": "A semi conductive material",
            "buy": -1,
            "sell": 10,
            "chance": 10,
            "weight": 7,
            "special": false
        },
        {
            "name": "Rare Metal Ore",
            "description": "A special bar of metal",
            "buy": -1,
            "sell": 40,
            "chance": 1,
            "weight": 10,
            "special": false
        },
        {
            "name": "Wood Plank",
            "description": "Cellulose from a tree",
            "buy": 15,
            "sell": 12,
            "chance": 20,
            "weight": 2,
            "special": false
        },
        {
            "name": "Stone Brick",
            "description": "Mostly made from oxygen and silicon",
            "buy": 20,
            "sell": 15,
            "chance": 20,
            "weight": 5,
            "special": false
        },
        {
            "name": "Stone Spear",
            "description": "A spear with a pointed rock",
            "buy": 10,
            "sell": 5,
            "chance": 0,
            "weight": 2,
            "special": true
        },
    ],
    "Weaponry": [
        // Tools
        {
            "name": "Wooden Sword",
            "description": "A sharp thing",
            "buy": 20,
            "sell": 15,
            "chance": 0,
            "weight": 4,
            "special": true,
        },
        {
            "name": "Metal Pickaxe",
            "description": "The metal is too heavy to be made into a sword",
            "buy": 60,
            "sell": 40,
            "chance": 0,
            "weight": 8,
            "special": true,
        },
    ],
    "Forge": [
        {
            "name": "Metal Bar",
            "description": "A conductive material",
            "buy": 30,
            "sell": 25,
            "chance": 0,
            "weight": 6,
            "special": false
        },
        {
            "name": "Rare Metal Bar",
            "description": "A special bar of metal",
            "buy": 100,
            "sell": 90,
            "chance": 0,
            "weight": 10,
            "special": false
        },
    ],
    "Market": [
        // Food
        {
            "name": "Flour",
            "description": "An important ingredient",
            "buy": 1,
            "sell": 0,
            "chance": 0,
            "weight": 1,
            "special": false,
        },
        {
            "name": "Apple",
            "description": "A basic fruit",
            "buy": 1,
            "sell": 0,
            "chance": 0,
            "weight": 1,
            "special": true,
        },
        {
            "name": "Bread",
            "description": "BREAD",
            "buy": 3,
            "sell": 1,
            "chance": 0,
            "weight": 1,
            "special": true
        },
        {
            "name": "Apple Pie",
            "description": "A tasty food",
            "buy": 10,
            "sell": 3,
            "chance": 0,
            "weight": 1,
            "special": true,
        },
        // Bag upgrade
        {
            "name": "Small bag",
            "description": "A small bag for small people",
            "buy": 30,
            "sell": 10,
            "chance": 0,
            "weight": 1,
            "special": true,
        },
        {
            "name": "Medium bag",
            "description": "A medium bag for average people",
            "buy": 60,
            "sell": 20,
            "chance": 0,
            "weight": 2,
            "special": true,
        }
    ],
    "Ruins": [
        {
            "name": "Ancient Debris",
            "description": "A pile of old material",
            "buy": 0,
            "sell": 5,
            "chance": 99,
            "weight": 1,
            "special": false,
        },
        {
            "name": "Ancient Part",
            "description": "An ancient alien object",
            "buy": 0,
            "sell": 0,
            "chance": 1,
            "weight": 10,
            "special": true,
        },
    ],
    "River": [
        {
            "name": "Wooden Fishing Rod",
            "description": "Pure craftmanship for such a complex tool",
            "buy": 60,
            "sell": 20,
            "chance": 0,
            "weight": 3,
            "special": true,
        },
    ],
    "MISC": [
        // Tech
        {
            "name": "Wires",
            "description": "Thin metal",
            "buy": 20,
            "sell": 10,
            "chance": 0,
            "weight": 1,
            "special": false
        },
        {
            "name": "Electronics",
            "description": "A smart metal",
            "buy": 100,
            "sell": 90,
            "chance": 0,
            "weight": 3,
            "special": false
        },
        {
            "name": "Book",
            "description": "Knowledge is power",
            "buy": 5,
            "sell": 2,
            "chance": 0,
            "weight": 2,
            "special": true
        },
        {
            "name": "Mac-Book",
            "description": "The ultimate book",
            "buy": 2000,
            "sell": 1000,
            "chance": 0,
            "weight": 2,
            "special": true
        },
        {
            "name": "PC",
            "description": "Personal Computer",
            "buy": 3000,
            "sell": 2000,
            "chance": 0,
            "weight": 12,
            "special": true
        },
        {
            "name": "TerraBot",
            "description": "A discord bot",
            "buy": -1,
            "sell": -1,
            "chance": 0,
            "weight": 0,
            "special": true
        }
    ],
};
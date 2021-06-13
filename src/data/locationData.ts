export let locationData = {
    locations: ["Camp", "Weaponry", "Forge", "Market", "Ruins", "River"],
    roads: [
        { // Camp
            "locations": ["Market", "Weaponry", "River"]
        },
        { // Weaponry
            "locations": ["Forge", "Market", "Camp"]
        },
        { // Forge
            "locations": ["Weaponry", "Market"]
        },
        { // Market
            "locations": ["Camp", "Weaponry", "Forge"]
        }, 
        { // Ruins
            "locations": ["River"]
        },
        { // River
            "locations": ["Camp", "Ruins"]
        },
    ]
};
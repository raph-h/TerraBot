export let locations = ["Camp", "Weaponry", "Forge", "Market", "Ruins", "River"];

export let locationData: {[location: string]: string[]} = {
    "Camp": ["Market", "Weaponry", "River"],
    "Weaponry": ["Forge", "Market", "Camp"],
    "Forge": ["Weaponry", "Market"],
    "Market": ["Camp", "Weaponry", "Forge"],
    "Ruins": ["River"],
    "River": ["Camp", "Ruins"],
};
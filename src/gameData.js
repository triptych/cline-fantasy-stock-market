// Stock market data
export const stocks = {
    DSI: {
        name: 'DragonScale Industries',
        symbol: 'DSI',
        sector: 'combat',
        basePrice: 100,
        volatility: 0.15,
        description: 'Manufactures dragon-proof armor',
        emoji: '🐉'
    },
    DSW: {
        name: 'Dwarven Steel Works',
        symbol: 'DSW',
        sector: 'combat',
        basePrice: 85,
        volatility: 0.08,
        description: 'Premium weapons and armor',
        emoji: '⚔️'
    },
    WBC: {
        name: 'Wizard\'s Brew Co.',
        symbol: 'WBC',
        sector: 'magic',
        basePrice: 45,
        volatility: 0.12,
        description: 'Potion manufacturing and distribution',
        emoji: '🧪'
    },
    ESL: {
        name: 'Enchanted Scrolls Ltd.',
        symbol: 'ESL',
        sector: 'magic',
        basePrice: 120,
        volatility: 0.18,
        description: 'Magical document production',
        emoji: '📜'
    },
    CHC: {
        name: 'Castle Holdings Corp.',
        symbol: 'CHC',
        sector: 'realestate',
        basePrice: 200,
        volatility: 0.06,
        description: 'Luxury fortress development',
        emoji: '🏰'
    },
    ETE: {
        name: 'Elven Treehouse Estates',
        symbol: 'ETE',
        sector: 'realestate',
        basePrice: 150,
        volatility: 0.09,
        description: 'Sustainable magical housing',
        emoji: '🌳'
    },
    GAW: {
        name: 'Griffin Airways',
        symbol: 'GAW',
        sector: 'transport',
        basePrice: 75,
        volatility: 0.14,
        description: 'Aerial transportation services',
        emoji: '🦅'
    },
    TNI: {
        name: 'Teleportation Networks Inc.',
        symbol: 'TNI',
        sector: 'transport',
        basePrice: 180,
        volatility: 0.20,
        description: 'Magical transportation infrastructure',
        emoji: '✨'
    },
    MMC: {
        name: 'Mithril Mining Corp.',
        symbol: 'MMC',
        sector: 'resources',
        basePrice: 90,
        volatility: 0.11,
        description: 'Precious magical metal extraction',
        emoji: '⛏️'
    },
    PFE: {
        name: 'Phoenix Feather Exports',
        symbol: 'PFE',
        sector: 'resources',
        basePrice: 160,
        volatility: 0.13,
        description: 'Rare magical components',
        emoji: '🔥'
    }
};

// Market events that can affect stock prices
export const marketEvents = [
    { text: "Dragon attack reported in the northern kingdoms!", affects: ['DSI', 'DSW'], impact: 0.15 },
    { text: "New magical brewing technique discovered!", affects: ['WBC'], impact: 0.12 },
    { text: "Enchantment regulations tightened!", affects: ['ESL'], impact: -0.08 },
    { text: "Royal castle construction boom!", affects: ['CHC', 'DSW'], impact: 0.10 },
    { text: "Elven forest expansion approved!", affects: ['ETE'], impact: 0.09 },
    { text: "Storm season disrupts griffin flights!", affects: ['GAW'], impact: -0.12 },
    { text: "Teleportation breakthrough announced!", affects: ['TNI'], impact: 0.20 },
    { text: "New mithril vein discovered!", affects: ['MMC'], impact: -0.15 },
    { text: "Phoenix migration season begins!", affects: ['PFE'], impact: 0.14 }
];

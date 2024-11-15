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
    GOW: {
        name: 'Goblin Ordnance Works',
        symbol: 'GOW',
        sector: 'combat',
        basePrice: 65,
        volatility: 0.17,
        description: 'Explosive devices and siege weapons',
        emoji: '💣'
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
    MSI: {
        name: 'Mystic Staffs Inc.',
        symbol: 'MSI',
        sector: 'magic',
        basePrice: 140,
        volatility: 0.16,
        description: 'Premium magical implements',
        emoji: '🪄'
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
    UTD: {
        name: 'Underground Tower Developments',
        symbol: 'UTD',
        sector: 'realestate',
        basePrice: 175,
        volatility: 0.08,
        description: 'Subterranean luxury dwellings',
        emoji: '🗼'
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
    DRC: {
        name: 'Dragon Rider Carriers',
        symbol: 'DRC',
        sector: 'transport',
        basePrice: 95,
        volatility: 0.19,
        description: 'Premium dragon transport services',
        emoji: '🐲'
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
    },
    GEM: {
        name: 'Gemstone Enchantment Mining',
        symbol: 'GEM',
        sector: 'resources',
        basePrice: 130,
        volatility: 0.15,
        description: 'Magical gemstone extraction',
        emoji: '💎'
    },
    UFS: {
        name: 'Unicorn Food Supplies',
        symbol: 'UFS',
        sector: 'agriculture',
        basePrice: 55,
        volatility: 0.07,
        description: 'Magical creature feed production',
        emoji: '🦄'
    },
    MHF: {
        name: 'Magical Herb Farms',
        symbol: 'MHF',
        sector: 'agriculture',
        basePrice: 70,
        volatility: 0.10,
        description: 'Cultivation of magical plants',
        emoji: '🌿'
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
    { text: "Phoenix migration season begins!", affects: ['PFE'], impact: 0.14 },
    { text: "Goblin inventors unveil new siege weapon!", affects: ['GOW'], impact: 0.18 },
    { text: "Magical staff shortage due to wood elf strike!", affects: ['MSI'], impact: -0.13 },
    { text: "Underground crystal caves discovered!", affects: ['UTD', 'GEM'], impact: 0.16 },
    { text: "Dragon breeding season affects transport routes!", affects: ['DRC', 'GAW'], impact: -0.11 },
    { text: "Rare magical herb blight reported!", affects: ['MHF', 'WBC'], impact: -0.14 },
    { text: "Unicorn sanctuary expansion approved!", affects: ['UFS'], impact: 0.12 },
    { text: "Ancient magical gemstone deposit found!", affects: ['GEM'], impact: 0.17 },
    { text: "War preparations increase weapon demand!", affects: ['DSW', 'GOW'], impact: 0.13 },
    { text: "Magical transportation safety regulations updated!", affects: ['TNI', 'DRC'], impact: -0.09 },
    { text: "Enchanted forest growth accelerates!", affects: ['ETE', 'MHF'], impact: 0.11 },
    { text: "Dragon treaty negotiations affect multiple sectors!", affects: ['DSI', 'DRC', 'UFS'], impact: -0.10 }
];

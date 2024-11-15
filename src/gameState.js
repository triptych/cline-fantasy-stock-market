import { stocks } from './gameData.js';

// Initial game state
export const initialGameState = {
    gold: 1000,
    portfolio: {},
    currentPrices: {},
    priceHistory: {},
    day: 1,
    rank: 'Apprentice Trader',
    currentView: 'day',
    isPaused: true,
    updateInterval: 10000,
    lastUpdateTime: Date.now()
};

// Current game state
export let gameState = JSON.parse(JSON.stringify(initialGameState));
export let marketUpdateInterval = null;

// Initialize price history for each stock
export function initializePrices() {
    for (const symbol in stocks) {
        gameState.priceHistory[symbol] = [stocks[symbol].basePrice];
        gameState.currentPrices[symbol] = stocks[symbol].basePrice;
    }
}

// Calculate total net worth
export function calculateNetWorth() {
    let portfolioValue = 0;
    for (const symbol in gameState.portfolio) {
        portfolioValue += gameState.portfolio[symbol] * gameState.currentPrices[symbol];
    }
    return gameState.gold + portfolioValue;
}

// Update player rank based on net worth
export function updateRank() {
    const totalValue = calculateNetWorth();
    let newRank = 'Apprentice Trader';

    if (totalValue >= 10000) newRank = 'Legendary Tycoon';
    else if (totalValue >= 5000) newRank = 'Master Merchant';
    else if (totalValue >= 2500) newRank = 'Journeyman Merchant';

    gameState.rank = newRank;
    document.getElementById('rank').textContent = newRank;
}

// Get time period data for charts
export function getTimePeriodsData() {
    const allData = {};

    for (const symbol in gameState.priceHistory) {
        allData[symbol] = {
            day: gameState.priceHistory[symbol].slice(-1),
            week: gameState.priceHistory[symbol].slice(-7),
            month: gameState.priceHistory[symbol].slice(-30)
        };
    }

    return {
        data: allData,
        labels: {
            day: ['Today'],
            week: Array.from({length: Math.min(7, gameState.day)}, (_, i) => `Day ${gameState.day - 6 + i}`),
            month: Array.from({length: Math.min(30, gameState.day)}, (_, i) => `Day ${gameState.day - 29 + i}`)
        }
    };
}

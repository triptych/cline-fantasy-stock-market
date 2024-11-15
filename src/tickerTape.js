import { stocks } from './gameData.js';
import { gameState } from './gameState.js';
import { MARKET_UPDATED, NEWS_ADDED } from './marketLogic.js';

export function initializeTickerTape() {
    // Get the ticker content element
    const tickerContent = document.querySelector('.ticker-content');
    
    // Listen for market updates
    document.addEventListener(MARKET_UPDATED, () => {
        updateTickerContent(tickerContent);
    });

    // Listen for news updates
    document.addEventListener(NEWS_ADDED, (event) => {
        addNewsToTicker(tickerContent, event.detail);
    });

    // Initial update
    updateTickerContent(tickerContent);
}

function updateTickerContent(tickerContent) {
    // Clear existing content
    tickerContent.innerHTML = '';

    // Add trading day
    const daySpan = document.createElement('span');
    daySpan.textContent = `🏰 Kingdom Markets Trading Day ${gameState.day}`;
    tickerContent.appendChild(daySpan);

    // Add current prices and changes for each stock
    Object.entries(stocks).forEach(([symbol, stock]) => {
        const currentPrice = gameState.currentPrices[symbol];
        const previousPrice = gameState.priceHistory[symbol][gameState.priceHistory[symbol].length - 2] || currentPrice;
        const percentChange = ((currentPrice - previousPrice) / previousPrice * 100).toFixed(1);
        const changeSymbol = percentChange >= 0 ? '+' : '';

        const stockSpan = document.createElement('span');
        stockSpan.textContent = `${stock.emoji} ${symbol}: ${currentPrice}g (${changeSymbol}${percentChange}%)`;
        stockSpan.style.color = percentChange >= 0 ? 'var(--success-color)' : 'var(--danger-color)';
        tickerContent.appendChild(stockSpan);
    });
}

function addNewsToTicker(tickerContent, newsText) {
    const newsSpan = document.createElement('span');
    newsSpan.textContent = `📜 ${newsText}`;
    newsSpan.style.color = 'var(--accent-color)';
    
    // Insert news after the trading day span
    tickerContent.insertBefore(newsSpan, tickerContent.children[1]);
}

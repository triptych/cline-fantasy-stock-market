import { stocks } from './gameData.js';
import { gameState, calculateNetWorth, updateRank } from './gameState.js';
import { buyStock, sellStock, updateChart, MARKET_UPDATED, NEWS_ADDED } from './marketLogic.js';

// Listen for market updates
document.addEventListener(MARKET_UPDATED, () => {
    updateUI();
});

// Listen for news updates
document.addEventListener(NEWS_ADDED, (event) => {
    addNewsItem(event.detail);
});

// Update all UI elements
export function updateUI() {
    document.getElementById('gold').textContent = Math.round(gameState.gold);
    const portfolioValue = calculateNetWorth() - gameState.gold;
    document.querySelector('.player-stats').innerHTML = `
        <p>Gold: <span id="gold">${Math.round(gameState.gold)}</span></p>
        <p>Portfolio Value: <span>${Math.round(portfolioValue)}</span></p>
        <p>Rank: <span id="rank">${gameState.rank}</span></p>
    `;
    updatePortfolio();
    updateStockList();
    updateRank();
    updateChart();
}

// Update portfolio display
export function updatePortfolio() {
    const holdingsDiv = document.getElementById('holdings');
    holdingsDiv.innerHTML = '';

    for (const symbol in gameState.portfolio) {
        const quantity = gameState.portfolio[symbol];
        const currentPrice = gameState.currentPrices[symbol];
        const totalValue = quantity * currentPrice;

        const holdingItem = document.createElement('div');
        holdingItem.className = 'holding-item';
        holdingItem.innerHTML = `
            <div>
                <h3>${stocks[symbol].emoji} ${stocks[symbol].name} (${symbol})</h3>
                <p>Shares: ${quantity}</p>
                <p>Current Price: ${currentPrice.toFixed(2)} gold</p>
                <p>Total Value: ${totalValue.toFixed(2)} gold</p>
            </div>
            <button onclick="openTradeModal('${symbol}')">Trade</button>
        `;
        holdingsDiv.appendChild(holdingItem);
    }
}

// Update available stocks list
export function updateStockList() {
    const stocksDiv = document.getElementById('availableStocks');
    const selectedSector = document.getElementById('sectorFilter').value;
    stocksDiv.innerHTML = '';

    for (const symbol in stocks) {
        const stock = stocks[symbol];
        if (selectedSector === 'all' || stock.sector === selectedSector) {
            const stockCard = document.createElement('div');
            stockCard.className = 'stock-card';
            stockCard.innerHTML = `
                <h3>${stock.emoji} ${stock.name} (${symbol})</h3>
                <p>${stock.description}</p>
                <p>Price: ${gameState.currentPrices[symbol].toFixed(2)} gold</p>
                <button onclick="openTradeModal('${symbol}')">Trade</button>
            `;
            stocksDiv.appendChild(stockCard);
        }
    }
}

// Add news item to the news feed
function addNewsItem(text) {
    const newsDiv = document.getElementById('news');
    const newsItem = document.createElement('div');
    newsItem.className = 'news-item';
    newsItem.innerHTML = `
        <p><strong>Day ${gameState.day}:</strong> ${text}</p>
    `;
    newsDiv.insertBefore(newsItem, newsDiv.firstChild);
    if (newsDiv.children.length > 5) {
        newsDiv.removeChild(newsDiv.lastChild);
    }
}

// Handle trade modal
function openTradeModal(symbol) {
    const modal = document.getElementById('tradeModal');
    const stock = stocks[symbol];

    document.getElementById('modalCompany').textContent = `${stock.emoji} ${stock.name} (${symbol})`;
    document.getElementById('modalPrice').textContent = gameState.currentPrices[symbol].toFixed(2);
    document.getElementById('modalGold').textContent = gameState.gold.toFixed(2);

    const buyButton = document.getElementById('buyButton');
    const sellButton = document.getElementById('sellButton');

    buyButton.onclick = () => {
        const quantity = parseInt(document.getElementById('tradeAmount').value);
        if (buyStock(symbol, quantity)) {
            modal.style.display = 'none';
        }
    };

    sellButton.onclick = () => {
        const quantity = parseInt(document.getElementById('tradeAmount').value);
        if (sellStock(symbol, quantity)) {
            modal.style.display = 'none';
        }
    };

    modal.style.display = 'flex';
}

// Listen for openTrade event
document.addEventListener('openTrade', (event) => {
    openTradeModal(event.detail);
});

// Update time period buttons
export function updateTimeButtons(activeId) {
    ['dayView', 'weekView', 'monthView'].forEach(id => {
        document.getElementById(id).classList.toggle('active', id === activeId);
    });
}

// Close modal when clicking outside
window.onclick = (event) => {
    const modal = document.getElementById('tradeModal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
};

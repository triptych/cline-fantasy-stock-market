// Stock definitions remain unchanged
const stocks = {
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

// Initial game state
const initialGameState = {
    gold: 1000,
    portfolio: {},
    currentPrices: {},
    priceHistory: {},
    day: 1,
    rank: 'Apprentice Trader',
    currentView: 'day',
    isPaused: true, // Start paused by default
    updateInterval: 10000, // 10 seconds for gameplay
    lastUpdateTime: Date.now() // Track last update time
};

// Game state
let gameState = JSON.parse(JSON.stringify(initialGameState));
let marketUpdateInterval = null;

// Load saved state from localStorage
function loadSavedState() {
    const savedState = localStorage.getItem('fantasyStockMarketState');
    if (savedState) {
        gameState = JSON.parse(savedState);
        gameState.lastUpdateTime = Date.now(); // Reset last update time on load
        updateUI();
    } else {
        initializePrices();
    }
}

// Save state to localStorage
function saveStateToStorage() {
    localStorage.setItem('fantasyStockMarketState', JSON.stringify(gameState));
}

// Initialize price history for each stock
function initializePrices() {
    for (const symbol in stocks) {
        gameState.priceHistory[symbol] = [stocks[symbol].basePrice];
        gameState.currentPrices[symbol] = stocks[symbol].basePrice;
    }
}

// Market events that can affect stock prices
const marketEvents = [
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

// Game speed control
function togglePause() {
    gameState.isPaused = !gameState.isPaused;
    const pauseButton = document.getElementById('pauseGame');
    const speedIndicator = document.getElementById('gameSpeed');

    if (gameState.isPaused) {
        pauseButton.textContent = '▶️ Resume';
        pauseButton.classList.add('paused');
        speedIndicator.textContent = 'Paused';
        clearInterval(marketUpdateInterval);
        marketUpdateInterval = null;
    } else {
        pauseButton.textContent = '⏸️ Pause';
        pauseButton.classList.remove('paused');
        speedIndicator.textContent = 'Normal Speed';
        gameState.lastUpdateTime = Date.now(); // Reset last update time on resume
        startMarketUpdates();
    }
}

function startMarketUpdates() {
    if (marketUpdateInterval) {
        clearInterval(marketUpdateInterval);
    }

    // Ensure we don't process multiple updates at once when resuming
    marketUpdateInterval = setInterval(() => {
        if (!gameState.isPaused) {
            const now = Date.now();
            const timeSinceLastUpdate = now - gameState.lastUpdateTime;

            // Only update if enough time has passed
            if (timeSinceLastUpdate >= gameState.updateInterval) {
                updateMarket();
                gameState.lastUpdateTime = now;
            }
        }
    }, gameState.updateInterval);
}

// Chart initialization
let marketChart;
function initializeChart() {
    if (!gameState.priceHistory || Object.keys(gameState.priceHistory).length === 0) {
        initializePrices();
    }

    const ctx = document.getElementById('marketChart').getContext('2d');
    marketChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Today'],
            datasets: Object.keys(stocks).map(symbol => ({
                label: `${stocks[symbol].emoji} ${symbol}`,
                data: [gameState.currentPrices[symbol]],
                borderColor: getRandomColor(),
                fill: false,
                tension: 0.4
            }))
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                intersect: false,
                mode: 'index'
            },
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        font: {
                            family: "'Spectral', serif"
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    grid: {
                        color: 'rgba(255, 215, 0, 0.1)'
                    }
                },
                x: {
                    grid: {
                        color: 'rgba(255, 215, 0, 0.1)'
                    }
                }
            }
        }
    });
}

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function getTimePeriodsData() {
    const allData = {};
    const periods = {
        day: 1,
        week: 7,
        month: 30
    };

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

function updateMarket() {
    if (Math.random() < 0.3) {
        const event = marketEvents[Math.floor(Math.random() * marketEvents.length)];
        addNewsItem(event.text);

        event.affects.forEach(symbol => {
            const impactMultiplier = 1 + (event.impact * (Math.random() > 0.5 ? 1 : -1));
            gameState.currentPrices[symbol] *= impactMultiplier;
        });
    }

    for (const symbol in stocks) {
        const stock = stocks[symbol];
        const randomChange = 1 + (Math.random() * stock.volatility * 2 - stock.volatility);
        gameState.currentPrices[symbol] *= randomChange;
        gameState.currentPrices[symbol] = Math.round(gameState.currentPrices[symbol] * 100) / 100;
        gameState.priceHistory[symbol].push(gameState.currentPrices[symbol]);
    }

    gameState.day++;
    updateUI();
    updateChart();
    saveStateToStorage();
}

function buyStock(symbol, quantity) {
    const price = gameState.currentPrices[symbol];
    const totalCost = price * quantity;

    if (totalCost > gameState.gold) {
        alert("Not enough gold!");
        return false;
    }

    gameState.gold -= totalCost;
    gameState.portfolio[symbol] = (gameState.portfolio[symbol] || 0) + quantity;
    updateUI();
    saveStateToStorage();
    return true;
}

function sellStock(symbol, quantity) {
    if (!gameState.portfolio[symbol] || gameState.portfolio[symbol] < quantity) {
        alert("Not enough shares!");
        return false;
    }

    const price = gameState.currentPrices[symbol];
    gameState.gold += price * quantity;
    gameState.portfolio[symbol] -= quantity;

    if (gameState.portfolio[symbol] === 0) {
        delete gameState.portfolio[symbol];
    }

    updateUI();
    saveStateToStorage();
    return true;
}

function updateUI() {
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
}

function updatePortfolio() {
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

function updateStockList() {
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

function updateChart() {
    if (!marketChart) return;

    const timeData = getTimePeriodsData();
    if (!timeData || !timeData.labels || !timeData.data) return;

    marketChart.data.labels = timeData.labels[gameState.currentView] || ['Today'];
    marketChart.data.datasets.forEach(dataset => {
        const symbol = dataset.label.split(' ').pop();
        if (timeData.data[symbol] && timeData.data[symbol][gameState.currentView]) {
            dataset.data = timeData.data[symbol][gameState.currentView];
        } else {
            dataset.data = [gameState.currentPrices[symbol]];
        }
    });
    marketChart.update();
}

function updateRank() {
    const totalValue = calculateNetWorth();
    let newRank = 'Apprentice Trader';

    if (totalValue >= 10000) newRank = 'Legendary Tycoon';
    else if (totalValue >= 5000) newRank = 'Master Merchant';
    else if (totalValue >= 2500) newRank = 'Journeyman Merchant';

    gameState.rank = newRank;
    document.getElementById('rank').textContent = newRank;
}

function calculateNetWorth() {
    let portfolioValue = 0;
    for (const symbol in gameState.portfolio) {
        portfolioValue += gameState.portfolio[symbol] * gameState.currentPrices[symbol];
    }
    return gameState.gold + portfolioValue;
}

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

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    initializeChart();
    loadSavedState();
    updateUI();

    // Initialize pause state
    const pauseButton = document.getElementById('pauseGame');
    const speedIndicator = document.getElementById('gameSpeed');
    pauseButton.textContent = '▶️ Resume';
    pauseButton.classList.add('paused');
    speedIndicator.textContent = 'Paused';

    // Game menu buttons
    document.getElementById('saveGame').onclick = saveGame;
    document.getElementById('loadGame').onclick = () => {
        document.getElementById('loadGameInput').click();
    };
    document.getElementById('loadGameInput').onchange = (e) => {
        if (e.target.files.length > 0) {
            loadGame(e.target.files[0]);
        }
    };
    document.getElementById('resetGame').onclick = resetGame;
    document.getElementById('pauseGame').onclick = togglePause;

    // Time period view buttons
    document.getElementById('dayView').onclick = () => {
        gameState.currentView = 'day';
        updateTimeButtons('dayView');
        updateChart();
    };

    document.getElementById('weekView').onclick = () => {
        gameState.currentView = 'week';
        updateTimeButtons('weekView');
        updateChart();
    };

    document.getElementById('monthView').onclick = () => {
        gameState.currentView = 'month';
        updateTimeButtons('monthView');
        updateChart();
    };

    document.getElementById('closeModal').onclick = () => {
        document.getElementById('tradeModal').style.display = 'none';
    };

    document.getElementById('sectorFilter').onchange = updateStockList;
});

function updateTimeButtons(activeId) {
    ['dayView', 'weekView', 'monthView'].forEach(id => {
        document.getElementById(id).classList.toggle('active', id === activeId);
    });
}

window.onclick = (event) => {
    const modal = document.getElementById('tradeModal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
};

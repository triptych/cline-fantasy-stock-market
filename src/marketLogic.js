import { stocks, marketEvents } from './gameData.js';
import { gameState, initializePrices, getTimePeriodsData } from './gameState.js';
import { saveStateToStorage } from './storage.js';

let marketChart;
let marketUpdateInterval = null;

// Custom events
export const MARKET_UPDATED = 'marketUpdated';
export const NEWS_ADDED = 'newsAdded';

// Initialize chart
export function initializeChart() {
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

// Update market prices and trigger events
export function updateMarket() {
    // Increased chance of news (50% instead of 30%)
    if (Math.random() < 0.5) {
        const event = marketEvents[Math.floor(Math.random() * marketEvents.length)];
        document.dispatchEvent(new CustomEvent(NEWS_ADDED, { detail: event.text }));

        // Apply the impact directly without random direction
        event.affects.forEach(symbol => {
            const impactMultiplier = 1 + event.impact;
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
    document.dispatchEvent(new CustomEvent(MARKET_UPDATED));
    updateChart();
    saveStateToStorage();
}

// Update chart display
export function updateChart() {
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

// Buy stock
export function buyStock(symbol, quantity) {
    const price = gameState.currentPrices[symbol];
    const totalCost = price * quantity;

    if (totalCost > gameState.gold) {
        alert("Not enough gold!");
        return false;
    }

    gameState.gold -= totalCost;
    gameState.portfolio[symbol] = (gameState.portfolio[symbol] || 0) + quantity;
    document.dispatchEvent(new CustomEvent(MARKET_UPDATED));
    saveStateToStorage();
    return true;
}

// Sell stock
export function sellStock(symbol, quantity) {
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

    document.dispatchEvent(new CustomEvent(MARKET_UPDATED));
    saveStateToStorage();
    return true;
}

// Game speed control
export function togglePause() {
    gameState.isPaused = !gameState.isPaused;
    const pauseButton = document.getElementById('pauseGame');
    const speedIndicator = document.getElementById('gameSpeed');

    if (gameState.isPaused) {
        pauseButton.textContent = '▶️ Resume';
        pauseButton.classList.add('paused');
        speedIndicator.textContent = 'Paused';
        if (marketUpdateInterval) {
            clearInterval(marketUpdateInterval);
            marketUpdateInterval = null;
        }
    } else {
        pauseButton.textContent = '⏸️ Pause';
        pauseButton.classList.remove('paused');
        speedIndicator.textContent = 'Normal Speed';
        gameState.lastUpdateTime = Date.now();
        startMarketUpdates();
    }
}

// Start market update interval
export function startMarketUpdates() {
    if (marketUpdateInterval) {
        clearInterval(marketUpdateInterval);
    }

    marketUpdateInterval = setInterval(() => {
        if (!gameState.isPaused) {
            const now = Date.now();
            const timeSinceLastUpdate = now - gameState.lastUpdateTime;

            if (timeSinceLastUpdate >= gameState.updateInterval) {
                updateMarket();
                gameState.lastUpdateTime = now;
            }
        }
    }, gameState.updateInterval);
}

// Helper function for random chart colors
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

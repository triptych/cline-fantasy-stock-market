import { gameState, initializePrices, initialGameState } from './gameState.js';
import { MARKET_UPDATED } from './marketLogic.js';

// Load saved state from localStorage
export function loadSavedState() {
    const savedState = localStorage.getItem('fantasyStockMarketState');
    if (savedState) {
        Object.assign(gameState, JSON.parse(savedState));
        gameState.lastUpdateTime = Date.now(); // Reset last update time on load
        document.dispatchEvent(new CustomEvent(MARKET_UPDATED));
    } else {
        initializePrices();
    }
}

// Save state to localStorage
export function saveStateToStorage() {
    localStorage.setItem('fantasyStockMarketState', JSON.stringify(gameState));
}

// Save game to file
export function saveGame() {
    const gameStateJson = JSON.stringify(gameState, null, 2);
    const blob = new Blob([gameStateJson], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'fantasy_stock_market_save.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Load game from file
export function loadGame(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            const loadedState = JSON.parse(e.target.result);
            Object.assign(gameState, loadedState);
            gameState.lastUpdateTime = Date.now(); // Reset last update time
            document.dispatchEvent(new CustomEvent(MARKET_UPDATED));
            saveStateToStorage();
        } catch (error) {
            alert('Error loading save file: Invalid format');
        }
    };
    reader.readAsText(file);
}

// Reset game to initial state
export function resetGame() {
    if (confirm('Are you sure you want to reset the game? This will erase all progress.')) {
        // Reset game state
        Object.assign(gameState, JSON.parse(JSON.stringify(initialGameState)));
        initializePrices();
        document.dispatchEvent(new CustomEvent(MARKET_UPDATED));
        saveStateToStorage();

        // Reset UI elements
        const pauseButton = document.getElementById('pauseGame');
        const speedIndicator = document.getElementById('gameSpeed');
        pauseButton.textContent = '▶️ Resume';
        pauseButton.classList.add('paused');
        speedIndicator.textContent = 'Paused';
    }
}

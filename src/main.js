import { loadSavedState, saveGame, loadGame, resetGame } from './storage.js';
import { initializeChart, togglePause, updateChart } from './marketLogic.js';
import { gameState } from './gameState.js';
import { updateTimeButtons, updateUI, updateStockList } from './ui.js';

// Initialize game when DOM is loaded
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

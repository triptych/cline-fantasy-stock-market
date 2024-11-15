# Fantasy Stock Market Game

## Overview

A whimsical take on stock market trading set in a high-fantasy world. Players manage a portfolio of stocks from mythical companies and magical enterprises, making strategic decisions to maximize their gold reserves through careful trading.

## Core Mechanics

### Trading System

- Each game "day" represents one trading session
- Players can:
  - Buy stocks with available gold
  - Sell stocks from their portfolio
  - Hold their current positions
- Market updates occur at the end of each day
- Starting capital: 1000 gold pieces

### Market Simulation

- Stock prices affected by:
  - Random events (dragon attacks, magical discoveries)
  - Market trends (seasonal magic fluctuations)
  - Supply and demand mechanics
- Daily price fluctuations range from -15% to +15%
- Market news affects stock performance

## Fantasy Stocks

### Combat & Defense

- DragonScale Industries (DSI)
  - Manufactures dragon-proof armor
  - High volatility due to dragon attack events
- Dwarven Steel Works (DSW)
  - Premium weapons and armor
  - Stable performer with consistent dividends

### Magic & Potions

- Wizard's Brew Co. (WBC)
  - Potion manufacturing and distribution
  - Seasonal fluctuations based on magical ingredients
- Enchanted Scrolls Ltd. (ESL)
  - Magical document production
  - Tech-sector equivalent, high growth potential

### Real Estate & Infrastructure

- Castle Holdings Corp. (CHC)
  - Luxury fortress development
  - Blue-chip stock with steady growth
- Elven Treehouse Estates (ETE)
  - Sustainable magical housing
  - Green energy equivalent

### Transportation

- Griffin Airways (GAW)
  - Aerial transportation services
  - Affected by weather conditions
- Teleportation Networks Inc. (TNI)
  - Magical transportation infrastructure
  - High-risk, high-reward tech stock

### Resources & Mining

- Mithril Mining Corp. (MMC)
  - Precious magical metal extraction
  - Commodity-based pricing
- Phoenix Feather Exports (PFE)
  - Rare magical components
  - Luxury goods market segment

## Technical Implementation

### Frontend

- React.js for UI components
- Chart.js for stock price visualization
  - Line charts for price history
  - Candlestick charts for daily trading
  - Volume indicators
- Responsive design for desktop and tablet

### Charts & Graphs

- Real-time price updates
- Interactive tooltips showing:
  - Opening/Closing prices
  - Daily high/low
  - Trading volume
  - Market cap in gold pieces
- Technical indicators:
  - Moving averages
  - Trading volume
  - Price momentum

### Game Features

#### Portfolio Management

- Current holdings overview
- Profit/Loss tracking
- Transaction history
- Performance metrics

#### Market Information

- Daily news feed with market-moving events
- Company information and backgrounds
- Market sector performance
- Trading volume indicators

#### Game Progression

- Achievement system
  - Trading milestones
  - Portfolio diversity goals
  - Profit targets
- Trader ranks
  - Apprentice Trader
  - Journeyman Merchant
  - Master Merchant
  - Legendary Tycoon

#### Risk Management

- Portfolio diversification tracking
- Risk assessment tools
- Market volatility indicators

## User Interface Elements

### Main Dashboard

- Portfolio overview
- Active market trends
- Quick trade actions
- News feed
- Performance charts

### Trading Interface

- Stock search and filtering
- Order placement (Buy/Sell)
- Price alerts
- Market depth information

### Analytics

- Portfolio performance metrics
- Market sector analysis
- Historical trading data
- Profit/Loss statements

## Future Expansion Possibilities

- Multiplayer trading competitions
- Special events and seasonal markets
- Advanced trading tools (options, futures)
- Market manipulation events
- Economic cycles and kingdom politics

## Best Practices

- use plain vanilla html, css, js
- use semantic html
- use css grid
- import a popular charting library for the dynamic charts
- use arrow functions instead of function expressions
- use async/await instead of promises
- make the game responsive and mobile friendly

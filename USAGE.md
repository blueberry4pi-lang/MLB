# MLB Analyzer Usage Guide

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

## Basic Usage

```javascript
const { fetchMLBData, analyzePlayerStats } = require('./src/index');

// Fetch player data
async function getPlayerData() {
  try {
    const playerData = await fetchMLBData('people/8479354'); // Mike Trout
    const analysis = analyzePlayerStats(playerData);
    console.log(analysis);
  } catch (error) {
    console.error('Error:', error);
  }
}
```

## Available Functions

### fetchMLBData(endpoint)
Fetches data from the MLB API.

- **Parameters**: 
  - `endpoint` (string): API endpoint to query
- **Returns**: Promise resolving to the API response data

### analyzePlayerStats(playerData)
Analyzes player statistics.

- **Parameters**: 
  - `playerData` (object): Player data from MLB API
- **Returns**: Processed player statistics

### analyzeTeamPerformance(teamData)
Analyzes team performance.

- **Parameters**: 
  - `teamData` (object): Team data from MLB API
- **Returns**: Processed team statistics

## Project Structure

- `src/` - Source code
- `data/` - Data files
- `notebooks/` - Jupyter notebooks for analysis
- `tests/` - Test files
- `package.json` - Project dependencies and scripts

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a pull request
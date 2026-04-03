# Sorare Integration Guide

This document explains how to use the MLB analyzer to compare official MLB data with Sorare's scoring system for gameweek analysis.

## Overview

The Sorare integration allows you to:
- Compare official MLB player statistics with Sorare's scoring system
- Analyze player performance for gameweek predictions
- Identify discrepancies between official stats and Sorare points
- Make informed decisions for your Sorare MLB team

## Setup

### Prerequisites

1. **API Access**: Sorare's API may require authentication. You'll need to:
   - Obtain API keys or access tokens
   - Set environment variables (if required)

2. **Environment Variables** (if needed):
   ```bash
   export SORARE_API_KEY="your_api_key_here"
   export SORARE_ACCESS_TOKEN="your_access_token_here"
   ```

## Usage

### Basic Comparison

```javascript
const { compareMLBWithSorare } = require('./src/index');

// Example player data from MLB API
const mlbPlayerData = {
  person: {
    fullName: "Mike Trout"
  },
  currentTeam: {
    name: "Los Angeles Angels"
  },
  primaryPosition: {
    name: "OF"
  },
  stats: [
    {
      type: {
        displayName: "yearByYear"
      },
      splate: {
        singles: 35,
        doubles: 20,
        triples: 5,
        homeRuns: 31,
        runsBattedIn: 87,
        runs: 95,
        stolenBases: 15,
        walks: 80,
        hitByPitch: 10,
        strikeouts: 90,
        battingAverage: ".303"
      }
    }
  ]
};

// Compare with Sorare scoring
const comparison = compareMLBWithSorare(mlbPlayerData, {});
console.log(comparison);
```

### Gameweek Analysis

```javascript
const { analyzeGameweek } = require('./scripts/gameweek-analysis');

// Analyze current gameweek
analyzeGameweek(1)
  .then(results => {
    console.log('Gameweek Analysis Results:', results);
  })
  .catch(error => {
    console.error('Error:', error);
  });
```

## Scoring System

### Hitters (as provided by Sorare)
- Single: 2 points
- Double: 5 points
- Triple: 8 points
- Home Run: 10 points
- RBI: 3 points
- Run: 3 points
- Stolen Base: 5 points
- Walk: 2 points
- Hit By Pitch (HBP): 2 points
- Strikeout: -1 point

### Pitchers (as provided by Sorare)
- Inning Pitched: 3 points
- Strikeout: 2 points
- Walk: -1 point
- Hit Allowed: -0.5 points
- Earned Run: -2 points
- Hit Batsman: -1 point
- Win: 5 points
- Save: 10 points
- Hold: 5 points

## Data Sources

### MLB Data
- Official MLB API: `https://statsapi.web.nhl.com/api/v1/`
- Player statistics and team information

### Sorare Data
- Sorare API (requires authentication)
- Player points and team performance

## Features

1. **Stat Comparison**: Compare official MLB stats with Sorare scoring
2. **Score Calculation**: Automatic calculation of Sorare scores based on official stats
3. **Gameweek Analysis**: Analyze player performance for upcoming gameweeks
4. **Historical Data**: Include historical performance data for better predictions
5. **Projected Stats**: Include projected statistics for upcoming games

## Best Practices

1. **Regular Updates**: Keep player data updated for accurate comparisons
2. **Multiple Sources**: Cross-reference data from multiple sources
3. **Historical Trends**: Consider historical performance when making predictions
4. **Position Multipliers**: Apply appropriate multipliers based on player positions
5. **Error Handling**: Implement proper error handling for API failures

## Troubleshooting

### Common Issues

1. **API Access Denied**: Ensure you have proper authentication credentials
2. **Data Format Mismatch**: Verify data structures match expected formats
3. **Network Issues**: Check internet connectivity and API availability
4. **Rate Limiting**: Implement appropriate delays between API calls

### Debugging

```javascript
// Enable detailed logging
process.env.DEBUG = 'true';

// Check if data is being fetched correctly
console.log('MLB Player Data:', mlbPlayerData);
console.log('Comparison Result:', comparison);
```

## Future Enhancements

1. **Real-time Data Integration**: Connect to live data feeds
2. **Machine Learning**: Implement predictive models for player performance
3. **Team Composition**: Analyze optimal team lineups
4. **Market Analysis**: Compare player values with performance metrics
5. **Notification System**: Alert for significant stat changes or opportunities

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a pull request

## License

MIT License
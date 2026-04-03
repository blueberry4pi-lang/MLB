// Sorare-specific Configuration for MLB Analyzer

module.exports = {
  // Sorare API Configuration
  sorare: {
    baseUrl: 'https://api.sorare.com/api/v1',
    timeout: 10000,
    retries: 3,
    // Note: Sorare API access may require authentication
    // This would typically include API keys or authentication tokens
    apiKey: process.env.SORARE_API_KEY || null,
    accessToken: process.env.SORARE_ACCESS_TOKEN || null
  },

  // Scoring System Configuration
  scoring: {
    // Official MLB scoring system
    mlb: {
      runs: 3,
      homeRuns: 6,
      RBIs: 3,
      stolenBases: 2,
      hits: 1,
      walks: 1,
      strikeouts: -1,
      wins: 6,
      saves: 6,
      strikeoutsPitching: 3,
      earnedRuns: -1,
      homeRunsPitching: -3,
      walksPitching: -1,
      hitsPitching: -1,
      assists: 1,
      putouts: 1,
      errors: -1
    },

    // Sorare's specific MLB scoring system (as provided)
    sorare: {
      // Hitters
      single: 2,
      double: 5,
      triple: 8,
      homeRun: 10,
      RBI: 3,
      run: 3,
      stolenBase: 5,
      walk: 2,
      HBP: 2,
      strikeout: -1,

      // Pitchers
      inningPitched: 3,
      strikeoutPitching: 2,
      walkPitching: -1,
      hitAllowed: -0.5,
      earnedRun: -2,
      hitBatsman: -1,
      win: 5,
      save: 10,
      hold: 5
    }
  },

  // Position multipliers (if different from standard)
  positionMultipliers: {
    '1B': 1.0,
    '2B': 1.0,
    '3B': 1.0,
    'SS': 1.0,
    'OF': 1.0,
    'C': 1.0,
    'P': 1.0
  },

  // Gameweek settings
  gameweek: {
    current: 1,
    startDate: '2023-03-01',
    endDate: '2023-03-07',
    frequency: 'weekly'
  },

  // Data caching
  cache: {
    enabled: true,
    ttl: 3600000, // 1 hour in milliseconds
    maxSize: 1000
  },

  // Comparison settings
  comparison: {
    includeHistorical: true,
    includeProjected: true,
    timeRange: 'last_7_days'
  }
};
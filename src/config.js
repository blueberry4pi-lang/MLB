// MLB Analyzer Configuration

module.exports = {
  // API Configuration
  api: {
    baseUrl: 'https://statsapi.web.nhl.com/api/v1',
    timeout: 10000,
    retries: 3
  },

  // Data Configuration
  data: {
    cacheEnabled: true,
    cacheTimeout: 3600000, // 1 hour in milliseconds
    maxRetries: 3
  },

  // Analysis Configuration
  analysis: {
    defaultSeason: '2023',
    defaultLeague: 'MLB',
    supportedStats: ['batting', 'pitching', 'fielding']
  },

  // Output Configuration
  output: {
    format: 'json',
    prettyPrint: true,
    includeMetadata: true
  }
};
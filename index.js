// Main entry point for MLB Analyzer
const { fetchMLBData, analyzePlayerStats, analyzeTeamPerformance, compareMLBWithSorare, calculateSorareScore } = require('./src/index');

// Simple server setup for Portainer deployment
const http = require('http');
const url = require('url');
const port = process.env.PORT || 8513;

// Simple HTTP server
const server = http.createServer(async (req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });

  if (req.url === '/') {
    res.end(JSON.stringify({
      message: 'MLB Analyzer API',
      version: '1.0.0',
      endpoints: {
        '/api/players': 'Fetch player data',
        '/api/teams': 'Fetch team data',
        '/api/analyze': 'Analyze player performance',
        '/api/sorare': 'Compare with Sorare scoring'
      }
    }));
  } else if (req.url === '/api/players') {
    try {
      const players = await fetchMLBData('people');
      res.end(JSON.stringify(players));
    } catch (error) {
      res.writeHead(500);
      res.end(JSON.stringify({ error: 'Failed to fetch players' }));
    }
  } else if (req.url === '/api/sorare') {
    try {
      // Example of Sorare comparison
      const samplePlayer = {
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
              battingAverage: ".303",
              onBasePercentage: ".394",
              sluggingPercentage: ".510"
            }
          }
        ]
      };

      const comparison = compareMLBWithSorare(samplePlayer, {});
      res.end(JSON.stringify(comparison));
    } catch (error) {
      res.writeHead(500);
      res.end(JSON.stringify({ error: 'Failed to compare with Sorare' }));
    }
  } else {
    res.writeHead(404);
    res.end(JSON.stringify({ error: 'Not found' }));
  }
});

server.listen(port, () => {
  console.log(`MLB Analyzer server running on port ${port}`);
});

// Export for use in other modules
module.exports = { server, port, fetchMLBData, analyzePlayerStats, analyzeTeamPerformance, compareMLBWithSorare, calculateSorareScore };
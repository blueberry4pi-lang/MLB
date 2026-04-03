// Gameweek Analysis Script for Sorare MLB
const {
  fetchMLBData,
  compareMLBWithSorare,
  calculateSorareScore
} = require('../src/index');

// Function to analyze a gameweek
async function analyzeGameweek(gameweekNumber) {
  console.log(`Analyzing Gameweek ${gameweekNumber}...`);

  // This would typically fetch player data for the specific gameweek
  // For now, we'll simulate some data

  const samplePlayers = [
    {
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
    },
    {
      person: {
        fullName: "Clayton Kershaw"
      },
      currentTeam: {
        name: "Los Angeles Dodgers"
      },
      primaryPosition: {
        name: "P"
      },
      stats: [
        {
          type: {
            displayName: "yearByYear"
          },
          splate: {
            inningsPitched: 200,
            wins: 12,
            saves: 0,
            holds: 5,
            strikeouts: 180,
            earnedRuns: 45,
            hitBatsmen: 5,
            walks: 30,
            hitsAllowed: 85,
            homeRuns: 5
          }
        }
      ]
    }
  ];

  const results = [];

  for (const player of samplePlayers) {
    try {
      const comparison = compareMLBWithSorare(player, {});
      results.push(comparison);
      console.log(`\nPlayer: ${comparison.playerName}`);
      console.log(`Team: ${comparison.team}`);
      console.log(`Position: ${comparison.position}`);
      console.log(`Official Stats:`, comparison.officialStats);
      console.log(`Sorare Score: ${comparison.sorareScore}`);
    } catch (error) {
      console.error(`Error analyzing player ${player.person?.fullName}:`, error);
    }
  }

  return results;
}

// Function to compare different scoring systems
function compareScoringSystems(officialStats) {
  console.log('\n=== Scoring System Comparison ===');

  // Calculate score using Sorare's system
  const sorareScore = calculateSorareScore(officialStats, 'OF');
  console.log(`Sorare Score: ${sorareScore}`);

  // You could add other scoring systems here
  // For example: Fantasy Sports, ESPN, etc.

  return {
    sorareScore: sorareScore,
    // Add other scoring systems here
  };
}

// Main execution
async function main() {
  console.log('Starting Sorare MLB Gameweek Analysis...');

  try {
    // Analyze current gameweek
    const results = await analyzeGameweek(1);

    console.log('\n=== Analysis Complete ===');
    console.log('Results:', JSON.stringify(results, null, 2));

    // Example of comparing scoring systems
    const sampleStats = {
      runs: 5,
      homeRuns: 2,
      RBIs: 8,
      stolenBases: 1,
      hits: 10,
      walks: 3,
      strikeouts: 2
    };

    compareScoringSystems(sampleStats);

  } catch (error) {
    console.error('Error in gameweek analysis:', error);
  }
}

// Run the analysis if this file is executed directly
if (require.main === module) {
  main();
}

module.exports = {
  analyzeGameweek,
  compareScoringSystems
};
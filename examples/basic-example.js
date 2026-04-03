// Basic MLB Analyzer Example
const { fetchMLBData, analyzePlayerStats, analyzeTeamPerformance } = require('../src/index');

// Example: Fetch and analyze player data
async function examplePlayerAnalysis() {
  console.log('Fetching MLB player data...');

  try {
    // Note: This is a placeholder - actual MLB API endpoints would be used
    // For demonstration purposes, we'll simulate data
    const samplePlayerData = {
      person: {
        fullName: "Mike Trout",
        id: 8479354,
        birthDate: "1991-08-07",
        birthCity: "Los Angeles",
        birthCountry: "USA"
      },
      currentTeam: {
        id: 108,
        name: "Los Angeles Angels"
      },
      primaryPosition: {
        id: 2,
        name: "Center fielder",
        type: "Outfielder",
        abbreviation: "CF"
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

    const analysis = analyzePlayerStats(samplePlayerData);
    console.log('Player Analysis:', analysis);

  } catch (error) {
    console.error('Error in player analysis:', error);
  }
}

// Example: Fetch and analyze team data
async function exampleTeamAnalysis() {
  console.log('Fetching MLB team data...');

  try {
    // Note: This is a placeholder - actual MLB API endpoints would be used
    const sampleTeamData = {
      id: 108,
      name: "Los Angeles Angels",
      venue: {
        name: "Angel Stadium"
      },
      teamCode: "ana",
      fileCode: "laa",
      division: {
        id: 201,
        name: "AL West"
      },
      wins: 89,
      losses: 73
    };

    const analysis = analyzeTeamPerformance(sampleTeamData);
    console.log('Team Analysis:', analysis);

  } catch (error) {
    console.error('Error in team analysis:', error);
  }
}

// Run examples
examplePlayerAnalysis();
exampleTeamAnalysis();
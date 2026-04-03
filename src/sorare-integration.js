// Sorare Integration Module for MLB Data Analysis
const axios = require('axios');
const _ = require('lodash');

// Sorare MLB scoring system configuration (as provided by user)
const SORARE_MLB_SCORING = {
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
};

// Sorare MLB player position multipliers
const SORARE_POSITION_MULTIPLIERS = {
  // Batter positions
  '1B': 1.0,  // First Base
  '2B': 1.0,  // Second Base
  '3B': 1.0,  // Third Base
  'SS': 1.0,  // Shortstop
  'OF': 1.0,  // Outfielder
  'C': 1.0,   // Catcher

  // Pitcher positions
  'P': 1.0    // Pitcher
};

// Function to fetch Sorare player data
async function fetchSorarePlayerData(playerId) {
  try {
    // Note: This is a placeholder - Sorare API endpoint would be different
    // Sorare's API is typically private or requires authentication
    const response = await axios.get(`https://api.sorare.com/api/v1/players/${playerId}`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching Sorare player data:', error);
    throw error;
  }
}

// Function to fetch Sorare team data
async function fetchSorareTeamData(teamId) {
  try {
    // Note: This is a placeholder - Sorare API endpoint would be different
    const response = await axios.get(`https://api.sorare.com/api/v1/teams/${teamId}`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching Sorare team data:', error);
    throw error;
  }
}

// Function to calculate Sorare score for a player based on official stats
function calculateSorareScore(playerStats, position) {
  let score = 0;

  // Apply position multiplier
  const multiplier = SORARE_POSITION_MULTIPLIERS[position] || 1.0;

  // Batting stats (using Sorare's scoring system)
  if (playerStats.batting) {
    const batting = playerStats.batting;
    score += (batting.single || 0) * SORARE_MLB_SCORING.single;
    score += (batting.double || 0) * SORARE_MLB_SCORING.double;
    score += (batting.triple || 0) * SORARE_MLB_SCORING.triple;
    score += (batting.homeRun || 0) * SORARE_MLB_SCORING.homeRun;
    score += (batting.RBI || 0) * SORARE_MLB_SCORING.RBI;
    score += (batting.run || 0) * SORARE_MLB_SCORING.run;
    score += (batting.stolenBase || 0) * SORARE_MLB_SCORING.stolenBase;
    score += (batting.walk || 0) * SORARE_MLB_SCORING.walk;
    score += (batting.HBP || 0) * SORARE_MLB_SCORING.HBP;
    score += (batting.strikeout || 0) * SORARE_MLB_SCORING.strikeout;
  }

  // Pitching stats (using Sorare's scoring system)
  if (playerStats.pitching) {
    const pitching = playerStats.pitching;
    score += (pitching.inningPitched || 0) * SORARE_MLB_SCORING.inningPitched;
    score += (pitching.strikeoutPitching || 0) * SORARE_MLB_SCORING.strikeoutPitching;
    score += (pitching.walkPitching || 0) * SORARE_MLB_SCORING.walkPitching;
    score += (pitching.hitAllowed || 0) * SORARE_MLB_SCORING.hitAllowed;
    score += (pitching.earnedRun || 0) * SORARE_MLB_SCORING.earnedRun;
    score += (pitching.hitBatsman || 0) * SORARE_MLB_SCORING.hitBatsman;
    score += (pitching.win || 0) * SORARE_MLB_SCORING.win;
    score += (pitching.save || 0) * SORARE_MLB_SCORING.save;
    score += (pitching.hold || 0) * SORARE_MLB_SCORING.hold;
  }

  // Apply position multiplier
  score = score * multiplier;

  return Math.round(score * 100) / 100; // Round to 2 decimal places
}

// Function to compare official MLB stats with Sorare scoring
function compareMLBWithSorare(mlbPlayerData, sorarePlayerData) {
  const comparison = {
    playerName: mlbPlayerData.person?.fullName || 'Unknown',
    team: mlbPlayerData.currentTeam?.name || 'Unknown',
    position: mlbPlayerData.primaryPosition?.name || 'Unknown',
    officialStats: {},
    sorareScore: 0,
    difference: 0,
    timestamp: new Date().toISOString()
  };

  // Extract official stats from MLB data
  if (mlbPlayerData.stats && mlbPlayerData.stats.length > 0) {
    const latestStats = mlbPlayerData.stats[0];
    comparison.officialStats = {
      // Hitting stats
      single: latestStats.splate?.singles || 0,
      double: latestStats.splate?.doubles || 0,
      triple: latestStats.splate?.triples || 0,
      homeRun: latestStats.splate?.homeRuns || 0,
      RBI: latestStats.splate?.runsBattedIn || 0,
      run: latestStats.splate?.runs || 0,
      stolenBase: latestStats.splate?.stolenBases || 0,
      walk: latestStats.splate?.walks || 0,
      HBP: latestStats.splate?.hitByPitch || 0,
      strikeout: latestStats.splate?.strikeouts || 0,

      // Pitching stats
      inningPitched: latestStats.splate?.inningsPitched || 0,
      strikeoutPitching: latestStats.splate?.strikeouts || 0,
      walkPitching: latestStats.splate?.walks || 0,
      hitAllowed: latestStats.splate?.hitsAllowed || 0,
      earnedRun: latestStats.splate?.earnedRuns || 0,
      hitBatsman: latestStats.splate?.hitBatsmen || 0,
      win: latestStats.splate?.wins || 0,
      save: latestStats.splate?.saves || 0,
      hold: latestStats.splate?.holds || 0
    };
  }

  // Calculate Sorare score based on official stats
  comparison.sorareScore = calculateSorareScore(comparison.officialStats, comparison.position);

  // Note: In a real implementation, we would compare with actual Sorare scores
  // This is a placeholder for demonstration
  comparison.actualSorareScore = comparison.sorareScore; // Placeholder
  comparison.difference = 0; // Placeholder

  return comparison;
}

// Function to fetch and compare data for multiple players
async function comparePlayers(players) {
  const results = [];

  for (const player of players) {
    try {
      // In a real implementation, we'd fetch both MLB and Sorare data
      // For now, we'll simulate this
      const comparison = compareMLBWithSorare(player, {});
      results.push(comparison);
    } catch (error) {
      console.error(`Error comparing player ${player.person?.fullName}:`, error);
    }
  }

  return results;
}

// Export functions for use in other modules
module.exports = {
  SORARE_MLB_SCORING,
  SORARE_POSITION_MULTIPLIERS,
  fetchSorarePlayerData,
  fetchSorareTeamData,
  calculateSorareScore,
  compareMLBWithSorare,
  comparePlayers
};
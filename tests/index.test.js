const { fetchMLBData, analyzePlayerStats, analyzeTeamPerformance } = require('../src/index');

describe('MLB Analyzer', () => {
  test('should initialize successfully', () => {
    expect(typeof fetchMLBData).toBe('function');
    expect(typeof analyzePlayerStats).toBe('function');
    expect(typeof analyzeTeamPerformance).toBe('function');
  });

  test('should analyze player stats', () => {
    const samplePlayer = {
      person: {
        fullName: 'John Doe'
      },
      team: {
        name: 'Team A'
      },
      stats: {
        games: 100,
        runs: 50
      }
    };

    const result = analyzePlayerStats(samplePlayer);
    expect(result.playerName).toBe('John Doe');
    expect(result.team).toBe('Team A');
  });

  test('should analyze team performance', () => {
    const sampleTeam = {
      name: 'Team B',
      wins: 80,
      losses: 20
    };

    const result = analyzeTeamPerformance(sampleTeam);
    expect(result.teamName).toBe('Team B');
    expect(result.winPercentage).toBe(0.8);
  });
});
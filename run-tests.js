// Run all tests for MLB Analyzer
const { exec } = require('child_process');

console.log('Running MLB Analyzer tests...');

exec('npm test', (error, stdout, stderr) => {
  if (error) {
    console.error(`Error running tests: ${error}`);
    return;
  }

  if (stderr) {
    console.error(`Test stderr: ${stderr}`);
    return;
  }

  console.log('Test output:');
  console.log(stdout);

  console.log('Tests completed successfully!');
});
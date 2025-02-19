const fs = require('fs');

const bestTeams = require('./bestTeams/bestTeams.js');

const results = new bestTeams(
  JSON.parse(fs.readFileSync('../data/scores.json')), 
  6, // Max teams size
  3, // Min teams size
  6, // Amount of teams
  0.014 // Tolerance, or how much the teams can differ.
);

results.takeAverage();
// return console.log(results.teams);
if (findTeam(3000000)) {
  console.log("\nBalances teams found!");
  results.formatGoodTeams();
} else {
  console.log("\nNo balanced teams found!");
}

//1: 338
//2: 292.5
//3: 363.5
//4: 393
//5: 296
//6: 

function findTeam(iterations = 100) {
  //switch to an infinte loop where you still store ittereations for
  // exits numbers and chunking
  // then attempt to find 1% or 1.5%
  let withinTolerance = false;
  for (let i = 0; i < iterations; i++) {
    results.createTeams();
    withinTolerance = results.areAllTeamsWithinTolerance();
    if (withinTolerance) {
      process.stdout.write('\x1b[32m.\x1b[0m');
      console.log("\nProcess exited on iteration: " + i);
      break;
    } else {
      results.addTestedTeam();
      results.teamsInQuestion = [];
      let chunkSize = 1000;
      if (i % chunkSize === 0) {
        console.log("Chunk " + i/chunkSize + ": " + "\x1b[31mX\x1b[0m");
      }
    }
  }
  return withinTolerance;
}
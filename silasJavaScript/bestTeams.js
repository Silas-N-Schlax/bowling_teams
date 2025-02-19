const fs = require('fs');

function takeAverage (teams) {

}

function formatData() {
  let data = fs.readFileSync('../data/scores.json');
  let teams = JSON.parse(data);
  console.log(teams);
}


formatData();
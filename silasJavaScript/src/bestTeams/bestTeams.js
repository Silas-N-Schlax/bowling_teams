class bestTeams {
  constructor(data, max, min, amountOfTeams, tolerance) {
    this.teams = data.scores;
    this.teamMaxTeamSize = max;
    this.teamMinTeamSize = min;
    this.amountOfTeams = amountOfTeams;
    this.tolerance = tolerance;
    this.teamsInQuestion = []; 
    this.testedTeams = [];
  }

  takeAverage() {
    for (let i = 0; i < this.teams.length; i++) {
      let currentPlayer = this.teams[i];
    
      let average = ((currentPlayer.scores.reduce((a, b) => a + b, 0)) / currentPlayer.scores.length);

      if (average) {
        this.teams[i].average = {
          "average": Number(this.reduceAverage(average))
        }
      }
    }
  
  }

  reduceAverage(average) {
    return (Math.sqrt(average) % 16).toFixed(2);
  }

  createTeams(teamSizes = this.createTeamSizes(), allPlayers = this.allPlayers()) {
    let teams = [];
    for (let i = 0; i < teamSizes.length; i++) {
      let team = [];
      for (let j = 0; j < teamSizes[i]; j++) {
        let player = allPlayers[Math.floor(Math.random() * allPlayers.length)];
        team.push(player);
        allPlayers = allPlayers.filter((p) => p != player);
      }
      teams.push(team);
    }
    if (this.checkTeam(teams)) {
      this.teamsInQuestion = teams;
      return teams;
    }
    this.teamsInQuestion = this.createTeams();
  }

  areAllTeamsWithinTolerance() {
    let teamSkills = this.calculateTeamTotalSkill();
    let max = Math.max.apply(null, teamSkills);
    let min = Math.min.apply(null, teamSkills);
    return (max - min) / 100 < this.tolerance;
  }

  areAllTeamsWithinToleranceNumInPercent() {
    let teamSkills = this.calculateTeamTotalSkill();
    let max = Math.max.apply(null, teamSkills);
    let min = Math.min.apply(null, teamSkills);
    return (max - min).toFixed(4) + "%";
  }

  calculateTeamTotalSkill() {
    let teams = this.teamsInQuestion
    let skills = [];
    for (let i = 0; i < teams.length; i++) {
      let team = teams[i];
      let teamSkill = Number(team.reduce((a, b) => a + (b.average.average), 0).toFixed(2));
      skills.push(teamSkill);
    }
    return skills;
  }

  checkTeam(newTeams) {
    for (let i = 0; i > this.testedTeams.length; i++) {
      let teams = this.testedTeams[i];
      if (this.compareTeams(newTeams, teams)) {
        return false;
      }
    }
    return true
  }

  compareTeams(newTeams, teams) {
    // console.log(JSON.stringify(newTeams));
    // console.log(JSON.stringify(teams));
    return JSON.stringify(newTeams) === JSON.stringify(teams);
  }

  allPlayers() {
    let allPlayers = [];
    for (let i = 0; i < this.teams.length; i++) {
      allPlayers.push(this.teams[i]);
    }
    return allPlayers;
  }
  
  createTeamSizes() {
    let teamSizes = [];
    for (let i = 0; i < this.amountOfTeams; i++) {
      teamSizes.push(Math.floor(
        Math.random() * (this.teamMaxTeamSize - this.teamMinTeamSize + 1)
      ) + this.teamMinTeamSize);
    }  
    if (teamSizes.reduce((a, b) => a + b, 0) === this.teams.length && teamSizes.length === this.amountOfTeams) {
      return teamSizes;
    } else {
      return this.createTeamSizes();
    }
  
  }

  formatGoodTeams(teams = this.teamsInQuestion) {
    let teamsSkills = this.calculateTeamTotalSkill();
    for (let i = 0; i < teams.length; i++) {
      let team = teams[i];
      let teamSkill = teamsSkills[i];
      console.log(`
        Team ${i + 1}:
        Team Members: ${team.map((p) => p.playerName).join(", ")} 
        Total Skill: ${teamSkill}
  
       `)
    }
    console.log(`
      Margin of Error: ${this.areAllTeamsWithinToleranceNumInPercent()}
      
      `);
  }

  addTestedTeam() {
    this.testedTeams.push(this.teamsInQuestion);
  }
}

module.exports = bestTeams;


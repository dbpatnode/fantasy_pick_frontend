export const getTime = () => {
  var now = new Date();
  var isoDate = new Date(
    now.getTime() - now.getTimezoneOffset() * 60000
  ).toISOString();

  return isoDate;
};
export const sortByUserName = (list) => {
  return list.sort(function (a, b) {
    let nameA = a.toUpperCase();
    let nameB = b.toUpperCase();
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  });
};
export const sortByName = (list) => {
  return list.sort(function (a, b) {
    let nameA = a.league_name.toUpperCase();
    let nameB = b.league_name.toUpperCase();
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  });
};

export const sortByJoins = (list) => {
  return list.sort(function (a, b) {
    return b.join.length - a.join.length;
  });
};
export const sortByPoints = (list) => {
  return list.sort(function (a, b) {
    return b.user.wins - a.user.wins;
  });
};

export const sortByValue = (list) => {
  return list.sort(function (a, b) {
    return b - a;
  });
};
export const sortByPick = (list) => {
  return list.sort(function (a, b) {
    let nameA = a.match.id;
    let nameB = b.match.id;
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  });
};

export const findWinner = (p, matches) => {
  let match = matches.filter((m) => m.id === p.match.match_id);
  let status = match.map((m) => m.status)[0];
  if (status === "FINISHED") {
    let realWinner = match.map((m) => m.score.winner);
    let pickWinner = p.winner;
    return realWinner[0] === pickWinner;
  }
};
export const findScore = (p, matches) => {
  let match = matches.filter((m) => m.id === p.match.match_id);
  let status = match.map((m) => m.status)[0];
  if (status === "FINISHED") {
    let homeScore = match.map((m) => m.score.fullTime.homeTeam)[0];
    let awayScore = match.map((m) => m.score.fullTime.awayTeam)[0];
    return homeScore === p.homeTeam && awayScore === p.awayTeam;
  }
};
export const findScoreReturnValue = (p, matches) => {
  let match = matches.filter((m) => m.id === p.match.match_id);
  let status = match.map((m) => m.status)[0];
  if (status === "FINISHED") {
    let homeScore = match.map((m) => m.score.fullTime.homeTeam)[0];
    let awayScore = match.map((m) => m.score.fullTime.awayTeam)[0];
    // debugger;
    return homeScore === p.homeTeam && awayScore === p.awayTeam;
  }
};

export const findClub = (p) => {
  if (p.winner === "HOME_TEAM") {
    return removeFC(p.match.home_team_name);
  } else {
    return removeFC(p.match.away_team_name);
  }
};
export const removeFC = (name) => {
  return name
    .toString()
    .split(" ")
    .filter((a) => a !== "FC")
    .join(" ");
};

export const findMatch = (p, data, matches) => {
  let match = matches.filter((m) => m.id === p.match.match_id);

  switch (data) {
    case "away": {
      let name = match.map((m) => m.awayTeam.name);

      return removeFC(name);
    }
    case "home": {
      let name = match.map((m) => m.homeTeam.name);

      return removeFC(name);
    }
    case "status": {
      let status = match.map((m) => m.status);
      return status;
    }
  }
  return data;
};

export const capitalize = (string) => {
  if (string !== null) {
    return string.charAt(0).toUpperCase() + string.toLowerCase().slice(1);
  }
};

export const usersIdList = (picks, matches) => {
  let matchesIdList = [];

  let passedPicks = picks.map((pick) => pick.match.match_id);
  let fin = [...new Set(passedPicks)];
  for (let i = 0; i < fin.length; i++) {
    let match = matches.find((match) => match.id === fin[i]);
    matchesIdList.push(match);
  }
  let finished = matchesIdList.filter((match) => match.status === "FINISHED");

  let usersPassedPicks = [];
  for (let i = 0; i < finished.length; i++) {
    let pick = picks.filter((pick) => pick.match.match_id === finished[i].id);
    for (let j = 0; j < pick.length; j++) {
      usersPassedPicks.push(pick[j]);
    }
  }

  let Ids = usersPassedPicks.map((pick) => pick.user.id);
  return [...new Set(Ids)];
};

export const findIsoDate = () => {
  var now = new Date();
  var isoDate = new Date(
    now.getTime() - now.getTimezoneOffset() * 60000
  ).toISOString();
  return isoDate;
};

export const findMatchesForCurrentMatchDay = (matches) => {
  return matches.find((match) => match.utcDate > findIsoDate());
};

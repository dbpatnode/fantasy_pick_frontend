export const getTime = () => {
  var now = new Date();
  var isoDate = new Date(
    now.getTime() - now.getTimezoneOffset() * 60000
  ).toISOString();

  return isoDate;
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

export const findClub = (p) => {
  if (p.winner === "HOME_TEAM") {
    return p.match.home_team_name;
  } else {
    return p.match.away_team_name;
  }
};

export const findMatch = (p, data, matches) => {
  let match = matches.filter((m) => m.id === p.match.match_id);

  switch (data) {
    case "away": {
      return match.map((m) => m.awayTeam.name);
    }
    case "home": {
      return match.map((m) => m.homeTeam.name);
    }
    case "status": {
      return match.map((m) => m.status);
    }
  }
  return data;
};

export const capitalize = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const findUsersStats = (picks) => {
  let passedPicks = picks.filter((pick) => pick.match.status === "FINISHED");
  let usersPassedPicks = passedPicks.map((pick) => pick.user.id);
  let userToUpdate = usersPassedPicks.filter(
    (value, index) => usersPassedPicks.indexOf(value) === index
  );
  return userToUpdate;
};

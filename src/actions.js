export function setStandings(standings) {
  return {
    type: "ADD_STANDINGS",
    payload: standings,
  };
}

export function setMatches(matches) {
  return {
    type: "ADD_MATCHES",
    payload: matches,
  };
}

export const setUser = (user) => {
  return {
    type: "USER_LOGIN",
    payload: user,
  };
};
export const setLogout = () => {
  return {
    type: "USER_LOGOUT",
    payload: {},
  };
};
export const addPick = (pick) => {
  return {
    type: "ADD_PICK",
    payload: pick,
  };
};
export const addLeague = (league) => {
  return {
    type: "ADD_LEAGUE",
    payload: league,
  };
};
export const setLeagues = (leagues) => {
  return {
    type: "SET_LEAGUES",
    payload: { leagues },
  };
};
export const setPicks = (picks) => {
  return {
    type: "SET_PICKS",
    payload: { picks },
  };
};
export const addJoinToLeague = (join) => {
  return {
    type: "ADD_JOIN",
    payload: join,
  };
};
export const updateLeagueName = (league) => {
  return {
    type: "UPDATE_LEAGUE",
    payload: league,
  };
};
export const deleteLeague = (leagueId) => {
  return {
    type: "DELETE_LEAGUE",
    payload: leagueId,
  };
};

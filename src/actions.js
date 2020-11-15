const headers = {
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
    "X-Auth-Token": process.env.REACT_APP_MATCHES_API_KEY,
  },
};

export function fetchStandings() {
  return (dispatch) => {
    dispatch({ type: "START_ADDING_STANDINGS_REQUEST" });
    fetch(
      "https://thingproxy.freeboard.io/fetch/http://api.football-data.org/v2/competitions/PL/standings",
      // "https://cors-anywhere.herokuapp.com/http://api.football-data.org/v2/competitions/PL/standings",
      headers
    )
      .then((response) => response.json())
      .then((data) => {
        let standings = data;
        dispatch({ type: "ADD_STANDINGS", standings });
      });
  };
}
export function fetchMatches() {
  return (dispatch) => {
    dispatch({ type: "START_ADDING_MATCHES_REQUEST" });
    fetch(
      "https://thingproxy.freeboard.io/fetch/http://api.football-data.org/v2/competitions/PL/matches",
      // "https://cors-anywhere.herokuapp.com/http://api.football-data.org/v2/competitions/PL/matches",
      headers
    )
      .then((response) => response.json())
      .then((data) => {
        let matches = data.matches;
        dispatch({ type: "ADD_MATCHES", matches });
      });
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

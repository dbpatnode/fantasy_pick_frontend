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
      "https://cors-anywhere.herokuapp.com/http://api.football-data.org/v2/competitions/PL/standings",
      headers
    )
      .then((response) => response.json())
      .then((data) => {
        let standings = data;
        dispatch({ type: "ADD_STANDINGS", standings });
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

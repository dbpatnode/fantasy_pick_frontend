const API_ROOT = `http://localhost:3000/`;

const token = localStorage.token;

const headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
  Authorization: `Bearers ${token}`,
};
const headersForAPI = {
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
    "X-Auth-Token": process.env.REACT_APP_MATCHES_API_KEY,
  },
};

const fetchStandings = () => {
  return fetch(
    "https://thingproxy.freeboard.io/fetch/http://api.football-data.org/v2/competitions/PL/standings",
    // "https://cors-anywhere.herokuapp.com/http://api.football-data.org/v2/competitions/PL/standings",
    headersForAPI
  ).then((response) => response.json());
};
const fetchMatches = () => {
  return fetch(
    "https://thingproxy.freeboard.io/fetch/http://api.football-data.org/v2/competitions/PL/matches",
    // "https://cors-anywhere.herokuapp.com/http://api.football-data.org/v2/competitions/PL/matches",
    headersForAPI
  ).then((response) => response.json());
};
const fetchTeam = (id) => {
  return fetch(
    `https://thingproxy.freeboard.io/fetch/http://api.football-data.org/v2/teams/${id}`,
    headersForAPI
  ).then((response) => response.json());
};

const login = (user) => {
  return fetch(`${API_ROOT}/login`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({
      user,
    }),
  }).then((res) => res.json());
};

const signup = (user) => {
  return fetch(`${API_ROOT}/users`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({ user }),
  }).then((res) => res.json());
};
const updateStats = (id, user) => {
  return fetch(`${API_ROOT}/users/${id}`, {
    method: "PATCH",
    headers: headers,
    body: JSON.stringify({ user }),
  }).then((res) => res.json());
};

const reauth = () => {
  return fetch(`${API_ROOT}/reauth`, {
    method: "GET",
    headers: headers,
  }).then((res) => res.json());
};
const addPick = (pick) => {
  return fetch(`${API_ROOT}/picks`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({ pick }),
  }).then((res) => res.json());
};
const getLeagues = () => {
  return fetch(`${API_ROOT}/leagues`, {
    headers: headers,
  }).then((res) => res.json());
};
const getPicks = () => {
  return fetch(`${API_ROOT}/picks`, {
    headers: headers,
  }).then((res) => res.json());
};
const addLeague = (league) => {
  return fetch(`${API_ROOT}/leagues`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({ league }),
  }).then((res) => res.json());
};
const updateLeague = (id, league) => {
  return fetch(`${API_ROOT}/leagues/${id}`, {
    method: "PATCH",
    headers: headers,
    body: JSON.stringify({ league }),
  }).then((res) => res.json());
};
const deleteLeague = (id) => {
  return fetch(`${API_ROOT}/leagues/${id}`, {
    method: "DELETE",
    headers: headers,
  }).then((res) => res.json());
};
const joinToLeague = (join) => {
  return fetch(`${API_ROOT}/joins`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({ join }),
  }).then((res) => res.json());
};

export default {
  auth: {
    login: login,
    signup: signup,
    reauth: reauth,
  },
  pick: {
    addPick: addPick,
  },
  leagues: {
    addLeague: addLeague,
    getLeagues: getLeagues,
    joinToLeague: joinToLeague,
    updateLeague: updateLeague,
    deleteLeague: deleteLeague,
  },
  user: {
    updateStats: updateStats,
  },
  picks: {
    getPicks: getPicks,
  },
  standings: {
    fetchStandings: fetchStandings,
  },
  matches: {
    fetchMatches: fetchMatches,
  },
  teams: {
    fetchTeam: fetchTeam,
  },
};

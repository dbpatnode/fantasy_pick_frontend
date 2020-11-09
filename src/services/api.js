const API_ROOT = `http://localhost:3000/`;

const token = localStorage.token;

const headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
  Authorization: `Bearers ${token}`,
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
  },
  user: {
    updateStats: updateStats,
  },
  picks: {
    getPicks: getPicks,
  },
};

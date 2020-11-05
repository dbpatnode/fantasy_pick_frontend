const initialState = {
  user: {},
  token: "",
  fetch: false,
  standings: [],
  competition: [],
  matches: [],
};

export const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "USER_LOGIN": {
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
      };
    }
    case "USER_LOGOUT": {
      return {
        ...state,
        user: {},
        token: "",
      };
    }
    case "START_ADDING_STANDINGS_REQUEST": {
      return {
        ...state,
        fetch: true,
      };
    }
    case "ADD_STANDINGS": {
      return {
        ...state,
        standings: action.standings.standings[0].table,
        competition: action.standings.competition,
      };
    }
    case "ADD_MATCHES": {
      return {
        ...state,
        matches: action.matches,
      };
    }

    default:
      return state;
  }
};

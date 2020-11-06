const initialState = {
  isUser: false,
  user: {},
  token: "",
  fetch: false,
  standings: [],
  competition: [],
  matches: [],
  picks: [],
  leagues: [],
  joins: [],
};

export const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "USER_LOGIN": {
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isUser: true,
      };
    }
    case "USER_LOGOUT": {
      return {
        ...state,
        user: {},
        token: "",
        isUser: false,
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
    case "ADD_PICK": {
      return {
        ...state,
        picks: [...state.picks, action.payload],
      };
    }
    case "ADD_LEAGUES": {
      return {
        ...state,
        leagues: [...state.leagues, action.payload.leagues],
      };
    }
    case "ADD_LEAGUE": {
      return {
        ...state,
        leagues: [...state.leagues, action.payload],
      };
    }
    case "ADD_JOIN": {
      return {
        ...state,
        joins: [...state.joins, action.payload],
      };
    }

    default:
      return state;
  }
};

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
  userLeagues: [],
  userPicks: [],
};

export const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "USER_LOGIN": {
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isUser: true,
        userLeagues: action.payload.user.joined_leagues,
        userPicks: action.payload.user.picks,
      };
    }
    case "USER_LOGOUT": {
      return {
        ...state,
        isUser: false,
        user: {},
        token: "",
        fetch: false,
        competition: [],
        picks: [],
        leagues: [],
        userLeagues: [],
        userPicks: [],
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
    case "SET_PICKS": {
      return {
        ...state,
        picks: action.payload.picks,
      };
    }
    case "ADD_PICK": {
      return {
        ...state,
        picks: [...state.picks, action.payload],
        userPicks: [...state.userPicks, action.payload],
      };
    }
    case "SET_LEAGUES": {
      return {
        ...state,
        leagues: action.payload.leagues,
      };
    }
    case "ADD_LEAGUE": {
      return {
        ...state,
        leagues: [...state.leagues, action.payload],
        userLeagues: [...state.userLeagues, action.payload],
      };
    }
    case "ADD_JOIN": {
      let leagueToUpdate = state.leagues.find(
        (league) => league.id === action.payload.league_id
      );

      let updatedList = [
        ...state.leagues.filter(
          (league) => league.id !== action.payload.league_id
        ),
        leagueToUpdate,
      ];
      return {
        ...state,
        userLeagues: action.payload.user.joined_leagues,
        leagues: updatedList,
      };
    }

    default:
      return state;
  }
};

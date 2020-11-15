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
    case "UPDATE_LEAGUE": {
      let updatedList = [
        ...state.leagues.filter((league) => league.id !== action.payload.id),
        action.payload,
      ];
      let updatedUserList = [
        ...state.userLeagues.filter(
          (league) => league.id !== action.payload.id
        ),
        action.payload,
      ];

      return {
        ...state,
        leagues: updatedList,
        userLeagues: updatedUserList,
      };
    }
    case "ADD_JOIN": {
      let updatedList = [
        ...state.leagues.filter((league) => league.id !== action.payload.id),
        action.payload,
      ];
      let join = action.payload.join.filter(
        (join) => join.user_id === state.user.id
      );
      let joinToUpdate = {
        id: join[0].id,
        league_name: action.payload.league_name,
        user_id: join[0].user_id,
      };
      return {
        ...state,
        userLeagues: [...state.userLeagues, joinToUpdate],
        leagues: updatedList,
      };
    }

    default:
      return state;
  }
};

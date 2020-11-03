const initialState = {
  fetch: false,
  standings: [],
  competition: [],
};

export const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "START_ADDING_STANDINGS_REQUEST": {
      return {
        ...state,
        fetch: true,
      };
    }
    case "ADD_STANDINGS": {
      // debugger;
      return {
        ...state,
        standings: [...state.standings, action.standings.standings],
        competition: [...state.standings, action.standings.competition],
      };
    }

    default:
      return state;
  }
};

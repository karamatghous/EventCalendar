import { SET_EVENT, UPDATE_EVENT, DELETE_EVENT } from "../actions/types";

const INITIAL_STATE = {
  events: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_EVENT:
      return {
        ...state,
        events: [...state.events, action.payload],
      };

    case UPDATE_EVENT:
      return {
        ...state,
        events: state.events.map((event) => {
          if (event.id === action.payload.id) {
            return action.payload;
          }
          return event;
        }),
      };

    case DELETE_EVENT:
      return {
        ...state,
        events: state.events.filter((event) => event.id !== action.payload.id),
      };

    default:
      return state;
  }
};

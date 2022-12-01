import { combineReducers } from "redux";
import eventReducer from "./eventReducer";

const combinedReducer = combineReducers({
  event_reducer: eventReducer,
});

const rootReducer = (state, action) => {
  return combinedReducer(state, action);
};

export default rootReducer;

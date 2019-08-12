import { combineReducers } from "redux";

import gameReducer from "./gameReducer";

export default combineReducers({
  test: () => 5,
  game: gameReducer
});

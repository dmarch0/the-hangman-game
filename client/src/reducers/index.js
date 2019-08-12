import { combineReducers } from "redux";

import gameReducer from "./gameReducer";
import userReducer from "./userReducer";

export default combineReducers({
  test: () => 5,
  game: gameReducer,
  user: userReducer
});

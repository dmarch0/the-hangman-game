import { all } from "redux-saga/effects";

import wordFetchSaga from "./wordFetch";
import gameWatcher from "./gameFlowSaga";
import userSaga from "./userSaga";

export default function* rootSaga() {
  yield all([wordFetchSaga(), gameWatcher(), userSaga()]);
}

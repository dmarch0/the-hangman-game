import { all } from "redux-saga/effects";

import wordFetchSaga from "./wordFetch";
import gameWatcher from "./gameFlowSaga";
import userSaga from "./userSaga";

function* helloSaga() {
  console.log("hello saga");
}

export default function* rootSaga() {
  yield all([helloSaga(), wordFetchSaga(), gameWatcher(), userSaga()]);
}

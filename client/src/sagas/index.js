import { all } from "redux-saga/effects";

import wordFetchSaga from "./wordFetch";
import gameWatcher from "./gameFlowSaga";

function* helloSaga() {
  console.log("hello saga");
}

export default function* rootSaga() {
  yield all([helloSaga(), wordFetchSaga(), gameWatcher()]);
}

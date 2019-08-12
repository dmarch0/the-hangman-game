import { all } from "redux-saga/effects";

import gameSaga from "./gameSaga";

function* helloSaga() {
  console.log("hello saga");
}

export default function* rootSaga() {
  yield all([helloSaga(), gameSaga()]);
}

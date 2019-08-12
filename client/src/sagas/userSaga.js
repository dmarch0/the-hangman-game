import { put, takeEvery, call } from "redux-saga/effects";

import { USER_FETCH, USER_SET, USER_ERROR } from "../actions/types";
import axios from "../config/axios";

function* userWatcher() {
  yield takeEvery(USER_FETCH, userWorker);
}

function* userWorker(action) {
  try {
    const response = yield call(axios.post, "/api/users", {
      name: action.payload.name,
      won: action.payload.won
    });
    const token = response.data.token;
    yield call([localStorage, "setItem"], "user", token);
    yield put({ type: USER_SET, payload: token });
  } catch (err) {
    yield put({ type: USER_ERROR, payload: err.response.data.error });
  }
}

export default userWatcher;

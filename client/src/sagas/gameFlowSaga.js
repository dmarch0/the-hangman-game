import { put, takeEvery, cancel, call } from "redux-saga/effects";

import {
  TRY_LETTER,
  TRY_SUCCESS,
  TRY_ERROR,
  GAME_LOST,
  GAME_WON
} from "../actions/types";
import axios from "../config/axios";

function* gameWatcher() {
  yield takeEvery(TRY_LETTER, gameWorker);
}

function* gameWorker(action) {
  const { letter, token, status } = action.payload;

  try {
    const response = yield call(axios.post, "/api/try", {
      letter,
      token,
      user: status
    });
    console.log(response.data);
    if (response.data.error === "User not found") {
      yield call([localStorage, "removeItem"], "user");
      window.location.reload();
    } else if (response.data.status === "in progress") {
      yield put({ type: TRY_SUCCESS, payload: response.data });
    } else if (response.data.status === "won") {
      yield put({ type: GAME_WON });
    } else if (response.data.status === "lost") {
      yield put({ type: GAME_LOST });
    }
  } catch (err) {
    console.log(err.response.data);
  }
}

export default gameWatcher;
